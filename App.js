import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from "expo-font";

// import components
import NewConversation from "./components/NewConversation";
import Chat from "./components/Chat";
import HomeScreen from "./components/HomeScreen";
import Conversations from "./components/Conversations";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import FirebaseTest from "./components/FirebaseTest";
import Forum from "./components/Forum";
import { AuthContextProvider, AuthContext } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ChatContext, ChatContextProvider } from "./context/ChatContext";
import ExpandedPost from "./components/ExpandedPost";
import ExpandedList from "./components/ExpandedList";
import Setup from "./components/Setup";
import ProfilePage from "./components/ProfilePage";
import Lists from "./components/Lists";
import AddList from "./components/AddList";
import BottomToolbar from "./components/Toolbar"

const ForumStack = createStackNavigator();
function ForumStackNavigator() {
  return (
    <ForumStack.Navigator screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: "#F2F5FD",
      },
    }}>
      <ForumStack.Screen name="Lists" component={Lists} />
      <ForumStack.Screen name="AddList" component={AddList} />
      <ForumStack.Screen name="ExpandedList" component={ExpandedList} />
      <ForumStack.Screen name="Forum" component={Forum} />
      <ForumStack.Screen name="ExpandedPost" component={ExpandedPost} />
      <ForumStack.Screen name="ProfilePage" component={ProfilePage} />
    </ForumStack.Navigator>
  );
}

const ConversationsStack = createStackNavigator();
function ConversationsStackNavigator() {
  return (
    <ConversationsStack.Navigator screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: "#F2F5FD",
      },
    }}>
      <ConversationsStack.Screen name="Conversations" component={Conversations} />
      <ConversationsStack.Screen name="NewConversation" component={NewConversation} />
      <ConversationsStack.Screen name="Chat" component={Chat} />
      <ProfileStack.Screen name="ExpandedList" component={ExpandedList} />
      <ProfileStack.Screen name="Forum" component={Forum} />
      <ProfileStack.Screen name="ExpandedPost" component={ExpandedPost} />
    </ConversationsStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: "#F2F5FD",
      },
    }}>
      <ProfileStack.Screen name="ProfilePage" component={ProfilePage} />
      <ProfileStack.Screen name="ExpandedList" component={ExpandedList} />
      <ProfileStack.Screen name="Forum" component={Forum} />
      <ProfileStack.Screen name="ExpandedPost" component={ExpandedPost} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator 
      tabBar={props => <BottomToolbar isOverlay {...props}/>}
      options={{ headerShown: false }}
    >
      <Tab.Screen name="ForumTab" component={ForumStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="ConversationsTab" component={ConversationsStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const MainStack = createStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    "RobotoFlex-Regular": require("./assets/fonts/RobotoFlex-Regular.ttf"),
    "RobotoFlex-RegularItalic": require("./assets/fonts/RobotoFlex-RegularItalic.ttf"),
    "RobotoFlex-Medium": require("./assets/fonts/RobotoFlex-Medium.ttf"),
    "RobotoFlex-MediumItalic": require("./assets/fonts/RobotoFlex-MediumItalic.ttf"),
    "RobotoFlex-SemiBold": require("./assets/fonts/RobotoFlex-SemiBold.ttf"),
    "RobotoFlex-Bold": require("./assets/fonts/RobotoFlex-Bold.ttf"),
  });
  console.log("FontsLoaded: ", fontsLoaded);
  // ^ this randomly doesn't work

  // const currentUser = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState("hello");
  console.log("App currentUser: ", currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser({});
      }

      console.log("AuthContext user: ", user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      <ChatContextProvider>
        <NavigationContainer>
          <MainStack.Navigator screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: "#F2F5FD",
              },
            }}>
            <MainStack.Screen name="SignIn" component={SignIn} />
            <MainStack.Screen name="SignUp" component={SignUp} />
            <MainStack.Screen name="Setup" component={Setup} />
            <MainStack.Screen name="Tabs" component={TabNavigator} />
          </MainStack.Navigator>
        </NavigationContainer>
      </ChatContextProvider>
    </AuthContext.Provider>
  );
}