import React, { useContext, useEffect, useState } from "react";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Composer,
} from "react-native-gifted-chat";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import BottomToolbar from "./Toolbar";
import Profile from "./Profile";
import { Spacer } from "react-native-flex-layout";
import { useNavigation } from "@react-navigation/native";
import { app } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import {
  onSnapshot,
  doc,
  getFirestore,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const { data } = useContext(ChatContext);
  console.log("Chat user: ", data.user);
  console.log("Chat user.displayName: ", data.user.displayName);
  console.log("Chat chatId: ", data.chatId);

  const currentUser = useContext(AuthContext);
  console.log("currentUser in Chat: ", currentUser);

  const name = data.user?.displayName;

  const db = getFirestore(app);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      //try to order correctly
      if (doc.exists()) {
        const sortedMessages = doc
          .data()
          .messages.sort((a, b) => b.createdAt - a.createdAt);
        setMessages(sortedMessages);
        console.log(
          "sortedMessages[0].createdAt: ",
          sortedMessages[0]?.createdAt
        );
      }
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  console.log("messages: ", messages);

  const [chatIsOpen, setChatIsOpen] = useState(true);
  const navigation = useNavigation();

  const openChat = () => {
    setChatIsOpen(true);
  };

  const openProfile = () => {
    setChatIsOpen(false);
  };

  const onSend = async (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    console.log("newMessages: ", newMessages);

    //update firestore
    const newMessage = newMessages[0];
    console.log("newMessage: ", newMessage);
    console.log("newMessage.createdAt: ", newMessage.createdAt);
    console.log("newMessage.createdAt.type(): ", typeof newMessage.createdAt);

    //const chatRef = doc(db, "chats", data.chatId);
    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          _id: newMessage._id,
          text: newMessage.text,
          user: newMessage.user,
          createdAt: newMessage.createdAt,
        }),
      });
    } catch (e) {
      console.log("Error updating messages: ", e);
    }

    //update userChats
    try {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage.text"]: newMessage.text,
        [data.chatId + ".date"]: newMessage.createdAt,
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage.text"]: newMessage.text,
        [data.chatId + ".date"]: newMessage.createdAt,
      });
    } catch (e) {
      console.log("Error updating userChats: ", e);
    }
  };

  const renderBubble = (props) => {
    return (
      <View style={{ flex: 1 }}>
        {props.position === "left" ? (
          <Text style={styles.senderText}>
            {props.currentMessage.user.name}
          </Text>
        ) : (
          <View></View>
        )}
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              marginBottom: 10,
              marginRight: 5,
              padding: 5,
              backgroundColor: "#D8DEEE",
              borderRadius: 20,
            },
            left: {
              marginBottom: 10,
              marginLeft: 5,
              padding: 5,
              backgroundColor: "#0063FB",
              borderRadius: 20,
            },
          }}
          textProps={{
            style: {
              color: props.position === "left" ? "white" : "black",
              fontFamily: "RobotoFlex-Regular",
            },
          }}
        />
      </View>
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbarContainer}
        primaryStyle={styles.inputToolbar}
        renderComposer={(composerProps) => (
          <Composer
            {...composerProps}
            placeholder="Type message here..."
            placeholderTextColor="rgba(0, 99, 251, 0.3)"
            textInputStyle={styles.textInput}
          />
        )}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View
          style={{
            justifyContent: "center",
            height: "100%",
            marginRight: -5,
            marginTop: 8,
          }}
        >
          <Image
            source={require("../assets/icons/send.png")}
            style={styles.toolbarImg}
          />
        </View>
      </Send>
    );
  };

  const renderTime = (props) => {
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icons/back.png")}
            style={{ height: 18, width: 18 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{name}</Text>
        <Spacer />
        <TouchableOpacity>
          <Image
            source={require("../assets/icons/settings.png")}
            style={{ height: 18, width: 18 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={chatIsOpen ? styles.toggledButton : styles.untoggledButton}
          onPress={openChat}
        >
          <Text style={styles.buttonText}>CHAT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={chatIsOpen ? styles.untoggledButton : styles.toggledButton}
          onPress={openProfile}
        >
          <Text style={styles.buttonText}>PROFILE</Text>
        </TouchableOpacity>
      </View>
      {chatIsOpen ? (
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
          }}
          renderAvatar={null}
          renderBubble={renderBubble}
          renderTime={renderTime}
          bottomOffset={50}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Profile
            profileInfo={{firstName: "first", lastName: "last", home: "home", abroad: "abroad", year: "year", country: "country", city: "city"}}
            isMyProfile={false}
            inChat />
        </View>
      )}
      <BottomToolbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  headerText: {
    color: "#0063FB",
    fontFamily: "RobotoFlex-Medium",
    fontSize: 40,
    padding: 20,
  },
  inputToolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    marginHorizontal: 20,
    marginBottom: 10,
    borderTopWidth: 0,
  },
  inputToolbar: {
    alignItems: "center",
    backgroundColor: "rgba(216, 222, 238, 0.4)",
    borderRadius: 25,
    paddingHorizontal: 5,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 8,
    fontSize: 16,
    fontFamily: "RobotoFlex-Regular",
  },
  toolbarImg: {
    width: 23,
    height: 23,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontFamily: "RobotoFlex-Medium",
  },
  toggledButton: {
    marginBottom: 10,
    padding: 5,
    borderBottomWidth: 1,
    marginHorizontal: 45,
  },
  untoggledButton: {
    marginBottom: 10,
    padding: 5,
    borderColor: "#F2F5FD",
    borderBottomWidth: 1,
    marginHorizontal: 45,
  },
  senderText: {
    fontFamily: "RobotoFlex-Regular",
    fontSize: 12,
    marginBottom: 3,
    marginLeft: 15,
    color: "#0063FB",
  },
});

export default Chat;
