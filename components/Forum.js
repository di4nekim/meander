import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
  } from "react-native";
import { Spacer } from 'react-native-flex-layout';
import BottomToolbar from "./Toolbar";

import ForumItem from "./ForumItem";

function Forum({ route }) {
  const { info, tag } = route.params;

  const genericComments = [
      {
        id: "1",
        name: "John Doe",
        time: "2 hr",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        likes: 13,
        commentCount: 15,
        comments: [],
      },
      {
        id: "2",
        name: "Jane Smith",
        time: "48 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: `Sed ut perspiciatis unde omnis iste natus error sit volup tatem accusa ntium dolorem que laud antium, to
Nemo enim ipsam volup tatem quia voluptas sit aspe rnatur aut odit aut fugit, sed quia conseq uuntur ma
Neque porro quis quam est, qui do lorem ipsum quia dolor sit amet, cons ectetur, adip isci velit, sed qu.
Ut enim ad minima ven iam, quis nostrum exerci tationem ullam corporis suscipit labo riosam, nisi ut al.
Quis autem vel eum iure repre henderit qui in ea voluptate velit esse quam nihil molestiae consequatu`,
        likes: 22,
        comments: [],
      },
      {
        id: "3",
        name: "Casey Lor",
        time: "36 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma...",
        likes: 9,
        comments: [],
      },
      {
        id: "4",
        name: "John Doe",
        time: "2 hr",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        likes: 13,
        comments: [],
      },
      {
        id: "5",
        name: "Jane Smith",
        time: "48 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to Nemo enim ipsam voluptatem ",
        likes: 22,
        comments: [],
      },
      {
        id: "6",
        name: "Jane Smith",
        time: "48 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to Nemo enim ipsam voluptatem ",
        likes: 22,
        comments: [],
      },
      {
        id: "7",
        name: "Jane Smith",
        time: "48 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to Nemo enim ipsam voluptatem ",
        likes: 22,
        comments: [],
      },
      {
        id: "8",
        name: "Jane Smith",
        time: "48 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to Nemo enim ipsam voluptatem ",
        likes: 22,
        comments: [],
      },
    ];

    const [posts, setPosts] = useState([
      {
        id: "1",
        name: "John Doe",
        time: "2 hr",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        likes: 13,
        commentCount: 15,
        comments: genericComments,
      },
      {
        id: "2",
        name: "Jane Smith",
        time: "48 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: `Sed ut perspiciatis unde omnis iste natus error sit volup tatem accusa ntium dolorem que laud antium, to
Nemo enim ipsam volup tatem quia voluptas sit aspe rnatur aut odit aut fugit, sed quia conseq uuntur ma
Neque porro quis quam est, qui do lorem ipsum quia dolor sit amet, cons ectetur, adip isci velit, sed qu.
Ut enim ad minima ven iam, quis nostrum exerci tationem ullam corporis suscipit labo riosam, nisi ut al.
Quis autem vel eum iure repre henderit qui in ea voluptate velit esse quam nihil molestiae consequatu`,
        likes: 22,
        comments: genericComments,
      },
      {
        id: "3",
        name: "Casey Lor",
        time: "36 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma...",
        likes: 9,
        comments: genericComments,
      },
      {
        id: "4",
        name: "John Doe",
        time: "2 hr",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        likes: 13,
        comments: genericComments,
      },
      {
        id: "5",
        name: "Jane Smith",
        time: "48 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to Nemo enim ipsam voluptatem ",
        likes: 22,
        comments: genericComments,
      },
    ]);

    const renderItem = ({ item, index }) => {
      return (
        <View>
          {index === 0 ? (
            <View style={styles.container}>
              <InfoBar info={info} tag={tag} />
              <CommentBubble />
              <ForumItem post={item} />
            </View>
          ) : (
            <ForumItem post={item} />
          )}
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Salzburg, AUT</Text>
        </View>
        <View style={styles.postsContainer}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 75 }}
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <BottomToolbar isOverlay={true} />
      </View>
    );
  }

const CommentBubble = () => {
    return(
      <View style={styles.itemContainer}>
        <TextInput
          style={styles.commentBubble}
          placeholder="Type your comment here..."
          placeholderTextColor="rgba(0, 99, 251, 0.5)"
        />
      </View>
    );
}

const InfoBar = ({ info, tag }) => {
  return (
    <View style={[styles.itemContainer, styles.infoBarContainer]}>
      <View>
      <View style={styles.topLine}>
        <Text style={styles.place}>{info.name}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </View>
      <Text style={styles.address}>{info.address}</Text>
      </View>
      <Spacer/>
      <View style={styles.topLine}>
        <Image
          source={require('../assets/icons/peoplehere.png')}
          style={styles.icon}
        />
        <Text style={styles.bottomLineText}>{info.visits} visits</Text>
      </View>
    </View>
  );
}

export default Forum;

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
    postsContainer: {
      paddingBottom: 100,
    },
    commentBubble: {
      flex: 1,
      marginRight: -15,
      paddingVertical: 8,
      borderRadius: 20,
      paddingHorizontal: 20,
      backgroundColor: "rgba(216, 222, 238, 0.4)",
      color: "#0063FB",
      fontFamily: "RobotoFlex-Regular",
      fontSize: 16,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "start",
      justifyContent: "start",
      paddingVertical: 15,
      paddingRight: 15,
      marginHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0, 28, 49, 0.2)",
    },
    infoBarContainer: {
      flex: 1,
      marginHorizontal: 20,
      paddingVertical: 40,
      alignItems: "center",
    },
    topLine: {
      flexDirection: "row",
      marginHorizontal: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    place: {
      fontSize: 24,
      fontFamily: "RobotoFlex-Medium",
      color: "#02265D",
      marginRight: 10,
    },
    tag: {
      backgroundColor: "rgba(100, 44, 172, 0.1)",
      paddingVertical: 3,
      paddingHorizontal: 7,
      borderRadius: 25,
      marginBottom: 4,
      marginRight: 10,
    },
    tagText: {
      color: "#642CAC",
      fontFamily: "RobotoFlex-Regular",
      fontSize: 12,
    },
    address: {
      fontSize: 12,
      fontFamily: "RobotoFlex-RegularItalic",
      color: "rgba(0, 99, 251, 0.75)",
      marginLeft: 15,
    },
    icon: {
      width: 10,
      height: 20,
    },
    bottomLineText: {
      color: "#0063FB",
      fontSize: 14,
      fontFamily: "RobotoFlex-Regular",
      opacity: 0.75,
      marginLeft: 7,
    },
  });
  