import { 
  View, 
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity 
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

function ForumItem({ post, onProfile }) {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <Pressable
      android_ripple={{ color: "#eeeeee" }}
      style={({ pressed }) => pressed && styles.pressedItem}
      onPress={() => {
        if (route.name === "ExpandedPost") {
          navigation.replace("ExpandedPost", { post: post });
        } else {
          navigation.navigate("ExpandedPost", { post: post });
        }
      }}
    >
      <View style={[styles.container, {paddingTop: 8, paddingBottom: 12}]}>
        <View style={styles.innerContainer}>
        <View style={styles.profileImage}/>
        <View style={styles.postContents}>
          { !onProfile ?
          <View style={styles.topLine}>
            <Text style={styles.name}>{post.name}</Text>
            <Text style={styles.time}>  •  {post.time}</Text>
          </View>
          :
          <View style={styles.topLine}>
            <Text style={styles.location}>{post.location}</Text>
            <Text style={styles.bottomLineText}>{post.timeAbs}</Text>
          </View>
          }
          <View style={{width: 265, marginRight: 10}}>
            <Text
              numberOfLines={onProfile ? 2 : 3}
              ellipsizeMode="tail"
              style={styles.description}
            >
              {post.description}
            </Text>
          </View>
        </View>
        </View>
        <View style={styles.voting}>
          <TouchableOpacity>
            <Image 
              source={require('../assets/icons/arrowup.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.likeCount}>{post.likes}</Text>
          <TouchableOpacity>
            <Image 
              source={require('../assets/icons/arrowdown.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

export default ForumItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    paddingVertical: 12,
    paddingRight: 15,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 28, 49, 0.2)",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "start",
    marginRight: 10,
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
    paddingTop: 7,
  },
  topLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    color: "#0063FB",
    fontFamily: "RobotoFlex-MediumItalic",
  },
  time: {
    fontSize: 14,
    color: "rgba(2, 38, 93, 0.6)",
    marginRight: 10,
    fontFamily: "RobotoFlex-Medium",
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
  description: {
    fontSize: 15,
    color: "#02265D",
    fontFamily: "RobotoFlex-Regular",
    marginRight: 10,
  },
  pressedItem: {
    opacity: 0.5,
  },
  bottomLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    marginTop: 5,
  },
  icon: {
    width: 10,
    height: 15,
  },
  bottomLineText: {
    color: "#0063FB",
    fontSize: 14,
    fontFamily: "RobotoFlex-Regular",
    opacity: 0.75,
    marginLeft: 7,
  },
  voting: {
    position: "absolute",
    right: 10,
    alignItems: "center",
  },
  likeCount: {
    fontSize: 12,
    color: "#02265D",
    fontFamily: "RobotoFlex-Regular",
    marginVertical: 2,
  },
  location: {
    fontSize: 16,
    color: "#02265D",
    fontFamily: "RobotoFlex-Medium",
    marginRight: 3,
  },
});
