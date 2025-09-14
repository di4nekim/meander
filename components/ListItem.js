import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { Spacer } from "react-native-flex-layout";
import { useNavigation } from "@react-navigation/native";

const ListItem = ({ list, alertNext, isFirst }) => {
  const navigation = useNavigation();
  const isAlert = list.tags.includes("Alerts");

  const renderTags = () => {
    return (
      <View style={{flexDirection: "column"}}>
        <View style={{flexDirection: "row"}}>
        {(list.tags.length > 2 ? list.tags.slice(0,2) : list.tags).map((tag, index) => (
          <View style={styles.tag} key={index}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        </View>
        {list.tags.length > 2 && (
          <View style={{flexDirection: "row", marginTop: 7}}>
            {list.tags.slice(2).map((tag, index) => (
              <View style={styles.tag} key={index}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressedItem}
      onPress={() => {
        navigation.navigate("ExpandedList", { list: list });
      }}
    >
      <View style={[isAlert ? styles.alertContainer : styles.listItemContainer,
                    alertNext && {borderBottomColor: "white"},
                    (isAlert && alertNext) && {marginBottom: 10},
                    (isAlert && isFirst) && {marginTop: 10}]}>
        <View style={styles.topLine}>
          <Text style={styles.itemTitle}>{list.title}</Text>
          {!isAlert && renderTags()}
          <Spacer />
          {!isAlert && <TouchableOpacity>
            <Image
              source={require("../assets/icons/bookmark.png")}
              style={styles.icon}
            />
          </TouchableOpacity> }
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
          {list.description}
        </Text>
      </View>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  pressedItem: {
    opacity: 0.5,
  },
  listItemContainer: {
    flex: 1,
    alignItems: "start",
    justifyContent: "start",
    paddingVertical: 12,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 28, 49, 0.2)",
  },
  alertContainer: {
    flex: 1,
    alignItems: "start",
    justifyContent: "start",
    paddingVertical: 12,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 99, 251, 0.1)",
    borderRadius: 12,
  },
  topLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  itemTitle: {
    fontFamily: "RobotoFlex-Medium",
    fontSize: 16,
    color: "#02265D",
    marginRight: 10,
  },
  tag: {
    backgroundColor: "rgba(0, 99, 251, 0.1)",
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 25,
    marginRight: 7,
  },
  tagText: {
    color: "#0063FB",
    fontFamily: "RobotoFlex-Regular",
    fontSize: 12,
  },
  icon: {
    width: 20,
    height: 20,
  },
  description: {
    fontSize: 15,
    color: "#02265D",
    fontFamily: "RobotoFlex-Regular",
    paddingRight: 15,
  },
  allTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
});
