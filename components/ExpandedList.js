import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
  } from "react-native";
import BottomToolbar from "./Toolbar";
import ForumItem from "./ForumItem";
import PlaceItem from "./PlaceItem";

const ExpandedList = ({ route }) => {
    const { list } = route.params;
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
    
      const places = [
        {
            id: "1",
            name: "Navi Beach",
            address: "67B Gregorio Grove, Jaskolskiville",
            distance: "15 mi",
            visits: 13,
            comments: 9,
        },
        {
            id: "2",
            name: "Place 2",
            address: "Address 2",
            distance: "15 mi",
            visits: 13,
            comments: 9,
        },
        {
            id: "3",
            name: "Place 3",
            address: "Address 3",
            distance: "15 mi",
            visits: 13,
            comments: 9,
        },
        {
            id: "4",
            name: "Place 4",
            address: "Address 4",
            distance: "15 mi",
            visits: 13,
            comments: 9,
        },
        {
            id: "5",
            name: "Place 5",
            address: "Address 5",
            distance: "15 mi",
            visits: 13,
            comments: 9,
        },
        {
            id: "6",
            name: "Place 6",
            address: "Address 6",
            distance: "15 mi",
            visits: 13,
            comments: 9,
        },
      ];

    const renderItem = ({ item, index }) => {
        return (
          <View>
            {index === 0 ? (
              <View style={styles.container}>
                <View style={{width: "100%"}}>
                <InfoBar info={list}/>
                </View>
                { list.tags.includes("Tips") || list.tags.includes("Alerts") ? <CommentBubble /> : <SearchBar />}
                <View style={{width: "100%"}}>
                { list.tags.includes("Tips") || list.tags.includes("Alerts") ? <ForumItem post={item} /> : <PlaceItem place={item} tag={list.tags[0]}/>}
                </View>
              </View>
            ) : (
              list.tags.includes("Tips") || list.tags.includes("Alerts") ? <ForumItem post={item} /> : <PlaceItem place={item} tag={list.tags[0]}/>
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
                    data={list.tags.includes("Tips") || list.tags.includes("Alerts") ? posts : places}
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
      <View style={styles.itemContainer}>
        <TextInput
          style={styles.commentBubble}
          placeholder="Type your comment here..."
          placeholderTextColor="rgba(0, 99, 251, 0.5)"
        />
      </View>
    );
}

const SearchBar = () => {
    return(
      <View style={[styles.itemContainer, {alignItems: "center"}]}>
        <Image
            source={require("../assets/icons/search.png")}
            style={{width: 24, height: 24, marginRight: 10}}
        />
        <TextInput
          style={styles.commentBubble}
          placeholder="Search and add here..."
          placeholderTextColor="rgba(0, 99, 251, 0.5)"
        />
      </View>
    );
}

const InfoBar = ({ info }) => {
    return (
        <View style={styles.infoBarContainer}>
            <View style={{flexDirection: "row"}}>
                {info.tags.map((tag, index) => (
                  <View style={styles.tag} key={index}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
            </View>
            <Text style={styles.listTitle}>{info.title}</Text>
            <Text style={styles.description}>{info.description}</Text>
        </View>
    );
}

export default ExpandedList;

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
      width: "100%",
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
      paddingHorizontal: 10,
      paddingTop: 20,
      paddingBottom: 15,
      alignItems: "start",
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0, 28, 49, 0.2)",
    },
    tag: {
        backgroundColor: "rgba(0, 99, 251, 0.1)",
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 25,
        marginBottom: 4,
        marginRight: 7,
    },
    tagText: {
        color: "#0063FB",
        fontFamily: "RobotoFlex-Regular",
        fontSize: 12,
    },
    listTitle: {
        color: "#02265D",
        fontFamily: "RobotoFlex-Medium",
        fontSize: 20,
        marginTop: 6,
        marginBottom: 3,
    },
    description: {
        color: "#02265D",
        fontFamily: "RobotoFlex-Regular",
        fontSize: 16,
        marginVertical: 3,
    },
});