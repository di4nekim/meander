import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
} from "react-native";
import ForumItem from "./ForumItem";
import BottomToolbar from "./Toolbar";

function ExpandedPost({ route }) {
  const { post } = route.params;

  const renderItem = ({ item, index }) => {
    return (
      <View>
        { (index === 0) ?
            <View style={styles.container}>
              <MainPost post={item} />
              <CommentBubble/>
            </View>
          : <ForumItem post={item}/>
        }
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Salzburg, AUT</Text>
      </View>
      <View style={styles.commentsContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 75 }}
          data={[post, ...post.comments]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <BottomToolbar isOverlay={true} />
    </View>
  );
}

const CommentBubble = () => {
  return(
    <View style={styles.commentBubbleContainer}>
      <TextInput
        style={styles.commentBubble}
        placeholder="Type your comment here..."
        placeholderTextColor="rgba(0, 99, 251, 0.5)"
      />
    </View>
  );
}

function MainPost({ post }) {
  return (
      <View style={styles.postContainer}>
        <View style={styles.profileImageBig}/>
        <View style={styles.postContents}>
          <View style={styles.topLine}>
            <Text style={styles.name}>{post.name}</Text>
          </View>
          <Text style={styles.description}>{post.description}</Text>
          <View style={styles.bottomLine}>
            <Text style={styles.bottomLineText}>{post.timeAbs}  •  {post.likes} likes</Text>
          </View>
        </View>
      </View>
  );
}


export default ExpandedPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#0063FB",
  },
  title: {
    fontSize: 28,
    paddingVertical: 10,
    color: "white",
    fontFamily: "RobotoFlex-Medium",
  },
  commentBubble: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: "rgba(216, 222, 238, 0.4)",
    color: "#0063FB",
    fontFamily: "RobotoFlex-Regular",
    fontSize: 16,
  },
  commentBubbleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 28, 49, 0.2)",
  },
  commentsContainer: {
    paddingBottom: 102,
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "start",
    paddingVertical: 15,
    paddingRight: 15,
    marginLeft: 40,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 28, 49, 0.2)",
  },
  profileImage: {
    marginTop: 5,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "rgba(0, 28, 49, 0.2)",
  },
  profileImageBig: {
    marginTop: 5,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "rgba(0, 28, 49, 0.2)",
  },
  postContents: {
    paddingLeft: 15,
    paddingRight: 50,
    paddingTop: 7,
  },
  postContentsExtraPadding: {
    paddingLeft: 15,
    paddingRight: 80,
    paddingTop: 7,
  },
  topLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    marginBottom: 7,
  },
  name: {
    fontSize: 16,
    color: "#0063FB",
    fontFamily: "RobotoFlex-MediumItalic",
  },
  time: {
    fontSize: 12,
    color: "rgba(0, 99, 251, 0.75)",
    fontFamily: "RobotoFlex-Regular",
  },
  postTitle: {
    fontSize: 20,
    fontFamily: "RobotoFlex-Medium",
    color: "#02265D",
    marginRight: 5,
  },
  tag: {
    backgroundColor: "rgba(100, 44, 172, 0.1)",
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 25,
  },
  tagText: {
    color: "#642CAC",
    fontFamily: "RobotoFlex-Regular",
    fontSize: 12,
  },
  location: {
    fontSize: 12,
    fontFamily: "RobotoFlex-RegularItalic",
    color: "rgba(0, 99, 251, 0.75)",
  },
  description: {
    fontSize: 16,
    color: "#02265D",
    fontFamily: "RobotoFlex-Regular",
  },
  pressedItem: {
    opacity: 0.5,
  },
  icon: {
    width: 10,
    height: 18,
  },
  bottomLineText: {
    color: "#0063FB",
    fontSize: 14,
    fontFamily: "RobotoFlex-Regular",
    opacity: 0.75,
    marginTop: 7,
  },
});