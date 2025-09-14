import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useContext } from "react";
import { Spacer } from "react-native-flex-layout";
import BottomToolbar from "./Toolbar";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useEffect } from "react";
import { app } from "../firebase";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";

import ConversationItem from "./ConversationItem";

function Conversations({ navigation }) {
  const [conversations, setConversations] = useState([
    {
      id: "1",
      name: "Alex K.",
      description: "This is the first conversation",
      excursion: false,
      unread: true,
    },
    {
      id: "2",
      name: "Swiss Alps Hike",
      description: "This is the second conversation",
      excursion: true,
      unread: false,
    },
    {
      id: "3",
      name: "Cassidy T.",
      description:
        "This is the third conversation asdkjf askdf sasdifhasd oakdfjasf kasdfasdsdikoj alsidfna lfkaj asdliof lasidfa oaisdfnaslkisdf liasdf laidf laisf la flaisodfjaplsidgfjaajsflkf",
      excursion: false,
      unread: false,
    },
    {
      id: "4",
      name: "Spanish Practice",
      description:
        "This is the third conversation asdkjf askdf sasdifhasd oakdfjasf kasdfasdsdikoj alsidfna lfkaj asdliof lasidfa oaisdfnaslkisdf liasdf laidf laisf la flaisodfjaplsidgfjaajsflkf",
      excursion: true,
      unread: true,
    },
    {
      id: "5",
      name: "Jackson P.",
      description: "This is the fifth conversation",
      excursion: false,
      unread: false,
    },
    {
      id: "6",
      name: "Kayaking",
      description: "This is the sixth conversation",
      excursion: true,
      unread: true,
    },
  ]);

  const [chats, setChats] = useState([]);

  const currentUser = useContext(AuthContext);
  const dispatch = useContext(ChatContext);

  console.log("currentUser in Conversation: ", currentUser);
  const db = getFirestore(app);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log("chats in Conversations: ");
  console.log(Object.entries(chats));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversations</Text>
        <Spacer />
        <TouchableOpacity
          style={styles.addButtonView}
          onPress={() => navigation.navigate("NewConversation")}
        >
          <Image
            source={require("../assets/icons/plus.png")}
            style={styles.addButtonImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.conversationsContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 75 }}
          data={Object.entries(chats).sort((a, b) => b[1].date - a[1].date)}
          renderItem={(chat) => {
            return <ConversationItem conversation={chat} />;
          }}
        />
      </View>
      <BottomToolbar isOverlay={true} />
    </View>
  );
}

export default Conversations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "start",
    justifyContent: "start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 40,
    paddingVertical: 20,
    color: "#0063FB",
    fontFamily: "RobotoFlex-Medium",
  },
  pressedAddButton: {
    opacity: 0.5,
  },
  addButtonView: {
    width: 30,
    height: 30,
    borderWidth: 2.5,
    borderColor: "#0063FB",
    borderRadius: 6,
    color: "#0063FB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
  },
  addButtonImage: {
    width: 15,
    height: 15,
  },
  conversationsContainer: {
    paddingBottom: 135,
  },
});
