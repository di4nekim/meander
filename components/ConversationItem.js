import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

function ConversationItem({ conversation }) {
  const navigation = useNavigation();
  console.log("conversation: ", conversation);
  console.log("conversation.item: ", conversation.item);
  console.log("conversation.item[0]: ", conversation.item[0]);
  console.log("conversation.item[1].userInfo: ", conversation.item[1].userInfo);
  console.log(
    "conversation.item[1].userInfo.displayName: ",
    conversation.item[1].userInfo.displayName
  );

  const currentUser = useContext(AuthContext);
  console.log("currentUser in ConversationItem: ", currentUser);
  const { dispatch } = useContext(ChatContext);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
      navigation.navigate("Chat");
  };

  return (
    <Pressable
      android_ripple={{ color: "#eeeeee" }}
      style={({ pressed }) => pressed && styles.pressedConversationItem}
      onPress={() => handleSelect(conversation.item[1].userInfo)}
    >
      <View style={styles.container}>
        <View style={styles.profileImage} />
        <View style={styles.titleAndDescription}>
          <View style={styles.titleAndExcursion}>
            <Text
              style={[
                styles.title,
                conversation.unread ? styles.unread : styles.read,
              ]}
            >
              {conversation.item[1].userInfo.email}
            </Text>
            {/* {conversation.excursion && (
              <View style={styles.excursion}>
                <Text style={styles.excursionText}>Excursions</Text>
              </View>
            )} */}
          </View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.description}
          >
            {conversation.item[1].lastMessage?.text}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ConversationItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    padding: 15,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 28, 49, 0.2)",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 28, 49, 0.2)",
  },
  titleAndDescription: {
    padding: 20,
    width: "85%",
  },
  titleAndExcursion: {
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "start",
    width: "100%",
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    color: "#0063FB",
    marginRight: 10,
  },
  unread: {
    fontFamily: "RobotoFlex-SemiBold",
  },
  read: {
    fontFamily: "RobotoFlex-Regular",
  },
  excursion: {
    backgroundColor: "rgba(0, 99, 251, 0.1)",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#0063FB",
  },
  excursionText: {
    color: "#0063FB",
    fontFamily: "RobotoFlex-Regular",
    fontSize: 11,
  },
  description: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "RobotoFlex-Regular",
  },
  pressedConversationItem: {
    opacity: 0.5,
  },
});
