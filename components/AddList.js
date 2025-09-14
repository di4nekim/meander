import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Spacer } from 'react-native-flex-layout';
import { useNavigation } from "@react-navigation/native";
import BottomToolbar from "./Toolbar";

import { setDoc, doc } from "firebase/firestore/lite";
import { db } from "../firebase";

const AddList = ({ route }) => {
  const navigation = useNavigation();
  const { tags } = route.params;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const updatedTags = [...tags];
  if (!updatedTags.includes("Alerts")) {
    updatedTags.unshift("Alerts");
  }
  if (!updatedTags.includes("Tips")) {
    updatedTags.unshift("Tips");
  };

  const isTagDisabled = (tag) => {
    return (selectedTags.includes("Alerts") && tag !== "Alerts") || (selectedTags.includes("Tips") && tag !== "Tips");
  };

  const handleTagPress = (tag) => {
    if (tag === "Tips") {
      if (selectedTags.includes("Tips")) {
        setSelectedTags([]);
      } else {
        setSelectedTags(["Tips"]);
      }
    } else if (tag === "Alerts") {
      if (!selectedTags.includes("Tips")) {
        setSelectedTags(selectedTags.includes("Alerts") ? [] : ["Alerts"]);
      }
    } else {
      if (selectedTags.includes("Tips")) {
        setSelectedTags([]);
      } else {
        if (selectedTags.includes(tag)) {
          setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
          if (selectedTags.length < 4) {
            setSelectedTags([...selectedTags, tag]);
          }
        }
      }
    }
  };

  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const cityID = "cityID"; //get cityID from a city
  const uniqueListID = uid(); //generate a unique ID for the list
  const [places, setPlaces] = useState(["placeID", "placeID2"]);

  const addList = async () => {
    try {
      //create a new document with the passed name as the ID
      await setDoc(doc(db, "cities", cityID, "lists", uniqueListID), {
        title: title,
        id: uniqueListID,
        description: description,
        tags: selectedTags,
        places: places,
      });
      //retireve the updated lists from firestore
      //code here
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleCreateList = () => {
    addList();
    navigation.goBack();
  };

  const isCreateButtonEnabled = (
    selectedTags.length > 0 &&
    title.trim() !== "" &&
    description.trim() !== ""
  );

  return (
    <View style={{flex: 1}}>
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
    <View style={styles.container}>
      <View style={[styles.header, {flexDirection: "row"}]}>
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <Image
            source={require("../assets/icons/close.png")}
            style={{width: 45, height: 45, marginLeft: 10}}
          />
        </TouchableOpacity>
        <Spacer />
        <Text style={styles.title}>New List</Text>
        <Spacer />
        <View style={{width: 55, height: 45}} />
      </View>
      <View
        style={[
          styles.tagFilterBar,
          selectedTags.length > 0 && { paddingVertical: 6 },
        ]}
      >
        <Image
          source={require("../assets/icons/filter.png")}
          style={{ width: 25, height: 25, marginLeft: 10, marginRight: 7 }}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagFilterBar}
        >
          {updatedTags.map((tag, index) => (
            <View
              style={{ flexDirection: "row", alignItems: "center" }}
              key={index}
            >
              <TouchableOpacity
                style={[
                  styles.barTag,
                  selectedTags.includes(tag) && styles.selectedTag,
                  isTagDisabled(tag) && styles.disabledTag,
                  index === 0 && { marginLeft: 5 },
                ]}
                onPress={() => handleTagPress(tag)}
                disabled={isTagDisabled(tag)}
              >
                <Text style={[styles.tagBarText, isTagDisabled(tag) && styles.disabledTagText]}>{tag}</Text>
              </TouchableOpacity>
              {selectedTags.includes(tag) && (
                <View style={styles.deselect}>
                  <Image
                    source={require("../assets/icons/x.png")}
                    style={styles.deselectX}
                  />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Title"
      />
      <TextInput
        style={styles.descriptionInput}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Add a brief blurb here..."
        multiline
      />
      <Spacer/>
      { isCreateButtonEnabled &&
      
      <View style={{flexDirection: "row"}}>
        <Spacer/>
        <TouchableOpacity 
            style={styles.button}
            onPress={handleCreateList}
        >
            <Image
                source={require("../assets/icons/forwardwhite.png")}
                style={{height: 15, width: 20}}
            />
        </TouchableOpacity>
      </View>
      }
      
    </View>
    </KeyboardAvoidingView>
    <BottomToolbar/>
    </View>
  );
};

export default AddList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  titleInput: {
    margin: 20,
    fontSize: 36,
    fontFamily: "RobotoFlex-SemiBold",
    color: "#02265D",
  },
  descriptionInput: {
    marginHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "RobotoFlex-Regular",
    color: "#02265D",
  },
  button: {
    backgroundColor: "#0063FB",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    margin: 15,
  },
  tag: {
    backgroundColor: "rgba(0, 99, 251, 0.1)",
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 25,
    marginRight: 10,
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
  tagFilterBar: {
    flexDirection: "row",
    backgroundColor: "#F2F5FD",
    paddingVertical: 7,
    alignItems: "center",
  },
  barTag: {
    backgroundColor: "rgba(0, 99, 251, 0.1)",
    paddingVertical: 7,
    paddingHorizontal: 7,
    marginHorizontal: 3,
    borderRadius: 10,
    marginRight: 10,
  },
  tagBarText: {
    color: "#0063FB",
    fontFamily: "RobotoFlex-Regular",
    fontSize: 16,
  },
  selectedTag: {
    backgroundColor: "rgba(0, 99, 251, 0.2)",
    borderWidth: 1,
    borderColor: "#0063FB",
    marginRight: 8,
  },
  deselect: {
    width: 15,
    height: 15,
    backgroundColor: "#F2F5FD",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
    right: 3,
    top: -6,
    alignItems: "center",
    justifyContent: "center",
  },
  deselectX: {
    width: 10,
    height: 10,
  },
  disabledTag: {
    backgroundColor: "rgba(2, 38, 93, 0.1)",
  },
  disabledTagText: {
    color: "rgba(2, 38, 93, 0.5)",
  },
});
