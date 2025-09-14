import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext(null);

export const ChatContextProvider = ({ children }) => {
  const currentUser = useContext(AuthContext);
  console.log("currentUser in ChatContextProvider: ", currentUser);
  console.log("currentUser.uid in ChatContextProvider: ", currentUser.uid);
  const INITIAL_STATE = {
    chatId: null,
    user: {},
  };

  const chatReducer = (state, action) => {
    console.log("action in chatReducer: ", action);
    switch (action.type) {
      case "CHANGE_USER":
        return {
          ...state,
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
