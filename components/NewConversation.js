import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import { Spacer } from "react-native-flex-layout";
import BottomToolbar from "./Toolbar";
//firebase
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore/lite";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const NewConversation = ({ navigation }) => {
  //set input name state
  const [name, setName] = useState("");
  //set user state for clicked user
  const [user, setUser] = useState(null);
  //set state for users found in query
  const [users, setUsers] = useState([]);
  //set state for error
  const [err, setErr] = useState(false);

  const currentUser = useContext(AuthContext);
  console.log("currentUser: ", currentUser);

  /*
   * The following code was testing
   ****************************************************************
   */

  const suggestions = [
    "Anthony Duan",
    "Gordon Grandbouche",
    "Diane Kim",
    "Alec Liberman",
    "Will Moles",
  ];

  const onChangeText = (text) => setName(text);

  // const handleEnter = (e) => {
  //   console.log("e: ", e);
  //   if (e.nativeEvent.key === "Enter") {
  //     handleSearch();
  //   }
  // };

  const handleSuggestionPress = (suggestion) => {
    setName(suggestion);
  };

  const filterSuggestions = () => {
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(name.toLowerCase())
    );
  };

  /*
   * The above code was testing
   ****************************************************************
   */

  const { dispatch } = useContext(ChatContext);
  const onPress = async (user) => {
    //check if group already exists, if not, create group

    //get clicked user and set user state
    //setUser((user, foundUser) => foundUser);
    console.log("in onPress: currentUser: ", currentUser);
    //console.log("in onPress: foundUser: ", foundUser);
    console.log("in onPress: user: ", user);

    //determine combined ID
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedID));

      if (!response.exists()) {
        //create new doc in chats collection
        await setDoc(doc(db, "chats", combinedID), { messages: [] });

        //create userChats
        //for current user:
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
        //for other user:
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
      }
    } catch (e) {
      console.log("Error creating chat: ", e);
    }
    setName("");
    setUsers([]);
    //dispatch to change user in chat context

    dispatch({ type: "CHANGE_USER", payload: user });

    //navigate to chat screen
    navigation.navigate("Chat", { isDM: true, name: user.displayName });
  };

  //handle the search for a user
  //**** ADD STRING PARSING TO DISPLAY PARTIAL MATCHES ******//
  const handleSearch = async (e) => {
    setName(e);
    try {
      //write ref to users collection
      const usersRef = collection(db, "users");
      //console.log("usersRef: ", usersRef);
      //query users collection for user with displayName === name
      const q = query(usersRef, where("displayName", "==", e));
      //console.log("q: ", q);
      //get the query snapshot
      const querySnapshot = await getDocs(q);
      //console.log("querySnapshot: ", querySnapshot);
      //iterate through the query snapshot and add each user to the users array
      var foundUsers = [];
      querySnapshot.forEach((doc) => {
        // console.log("doc.data(): ", doc.data());
        // console.log("doc.data().displayName: ", doc.data().displayName);
        // console.log("doc.data().email: ", doc.data().email);
        // console.log("doc.data().uid: ", doc.data().uid);

        const thisUser = doc.data();
        // console.log("thisUser: ", thisUser);
        foundUsers = [...foundUsers, thisUser];
        console.log("foundUsers: ", foundUsers);
      });
      setUsers(foundUsers);

      console.log("users: ", users);
    } catch (e) {
      console.log("Error searching for user: ", e);
      setErr(true);
    }
  };

  const renderSuggestions = () => {
    // const filteredSuggestions = filterSuggestions();
    if (users.length === 0) {
      return;
    }
    return users.map((user) => (
      <TouchableOpacity
        style={styles.dropdownOption}
        key={user.uid}
        onPress={() => {
          onPress(user);
        }}
      >
        <Text style={styles.dropdownOptionText}>
          {user.displayName} + {user.email}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>New Chat</Text>
      {/* <Text>currentUser: {!!currentUser && currentUser.email}</Text> */}
      {/* <Text>users: {users.length != 0 && users[0].email} </Text> */}
      {/* <Text>user: {user && user.email}</Text> */}
      <View style={styles.topBar} onClick={""}>
        <Text style={styles.to} onClick={""}>
          To:
        </Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Enter a name"
          onChangeText={handleSearch}
        />
      </View>

      <Spacer />
      {/* <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Open New Chat</Text>
        <Spacer />
        <Image
          source={require("../assets/icons/forward.png")}
          style={styles.image}
        />
      </TouchableOpacity> */}
      <BottomToolbar />
      <View style={styles.dropdown}>{renderSuggestions()}</View>
    </View>
  );
};

export default NewConversation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  headerText: {
    color: "#0063FB",
    fontFamily: "RobotoFlex-Medium",
    fontSize: 40,
    padding: 20,
    marginLeft: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  to: {
    marginLeft: 20,
    marginBottom: 7,
    marginRight: 10,
    color: "rgba(0, 99, 251, 0.6)",
    fontFamily: "RobotoFlex-Regular",
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 20,
    backgroundColor: "rgba(216, 222, 238, 0.4)",
    borderRadius: 25,
    marginBottom: 10,
    borderWidth: 0,
    fontFamily: "RobotoFlex-Regular",
    fontSize: 16,
  },
  dropdown: {
    position: "absolute",
    top: 135,
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
  dropdownOption: {
    backgroundColor: "#D8DEEE",
    borderRadius: 20,
    marginVertical: 7,
  },
  dropdownOptionText: {
    padding: 10,
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: "RobotoFlex-Regular",
  },
  button: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 25,
    paddingVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "RobotoFlex-Bold",
    color: "#0063FB",
  },
  image: {
    width: 23,
    height: 23,
  },
});