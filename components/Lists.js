import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Animated,
} from "react-native";
import WheelPicker from 'react-native-wheely';
import BottomToolbar from "./Toolbar";

//import firebase
import { app } from "../firebase";
import { getFirestore, doc, getDocs, collection, onSnapshot } from "firebase/firestore";

import ListItem from "./ListItem";
import { useNavigation } from "@react-navigation/native";

const Lists = () => {
  const navigation = useNavigation();
  const [headerExpanded, setHeaderExpanded] = useState(false);
  const headerHeight = useState(new Animated.Value(113))[0];
  const [headerReplacementOpacity] = useState(new Animated.Value(0));
  const [buttonOpacity] = useState(new Animated.Value(1));
  const [buttonTop] = useState(new Animated.Value(0));
  const [buttonRight] = useState(new Animated.Value(0));

  const expandHeader = () => {
    Animated.parallel([
      Animated.timing(headerReplacementOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(headerHeight, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
      }),
      Animated.timing(buttonTop, {
        toValue: -30,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonRight, {
        toValue: 70,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
    setHeaderExpanded(true);
  };

  const collapseHeader = () => {
    Animated.parallel([
      Animated.timing(headerReplacementOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(headerHeight, {
        toValue: 113,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(buttonTop, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonRight, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
    setHeaderExpanded(false);
  };

  const handleHeaderPress = () => {
    if (headerExpanded) {
      collapseHeader();
    } else {
      expandHeader();
    }
  };

  //dummy data:
  const data = [
    {
      title: "Best Italian Restaurants",
      tag: "Food Recs",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit duis aute irure dolor in reprehenderit in voluptate velit......",
    },
    {
      title: "Public Transportation",
      tag: "Tips",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit duis aute irure dolor in reprehenderit in voluptate velit......",
    },
    {
      title: "Cheap Eats!",
      tag: "Food Recs",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit duis aute irure dolor in reprehenderit in voluptate velit......",
    },
    {
      title: "Tips 2",
      tag: "Tips",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit duis aute irure dolor in reprehenderit in voluptate velit......",
    },
    {
      title: "Late Night Snacks",
      tag: "Food Recs",
      description: "Description",
    },
    {
      title: "Destinations 1",
      tag: "Destinations",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit duis aute irure dolor in reprehenderit in voluptate velit......",
    },
    {
      title: "Destinations 2",
      tag: "Destinations",
      description: "Description",
    },
    {
      title: "Destinations 3",
      tag: "Destinations",
      description: "Description",
    },
    {
      title: "Destinations 4",
      tag: "Destinations",
      description: "Description",
    },
    {
      title: "Hidden Gems 1",
      tag: "Hidden Gems",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit duis aute irure dolor in reprehenderit in voluptate velit......",
    },
    {
      title: "Hidden Gems 2",
      tag: "Hidden Gems",
      description: "Description",
    },
    {
      title: "Hidden Gems 3",
      tag: "Hidden Gems",
      description: "Description",
    },
    {
      title: "Hidden Gems 4",
      tag: "Hidden Gems",
      description: "Description",
    },
    {
      title: "Hidden Gems 5",
      tag: "Hidden Gems",
      description: "Description",
    },
    {
      title: "Night Life",
      tag: "Night Life",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit duis aute irure dolor in reprehenderit in voluptate velit......",
    },
  ];

  const sortedTags = [...new Set(data.map((item) => item.tag))];
  sortedTags.sort((a, b) => (a === "Tips" ? -1 : b === "Tips" ? 1 : 0));

  // State to store selected tags
  const [selectedTags, setSelectedTags] = useState([]);
  // Function to toggle selected tags
  const toggleTag = (tag) => {
    if (tag === "Tips") {
      if (selectedTags.includes("Tips")) {
        setSelectedTags([]);
      } else {
        setSelectedTags(["Tips"]);
      }
    } else if (tag === "Alerts") {
      if (selectedTags.includes("Alerts")) {
        setSelectedTags([]);
      } else {
        setSelectedTags(["Alerts"]);
      }
    } else {
      if (selectedTags.includes("Tips")) {
        setSelectedTags([tag]);
      } else {
        setSelectedTags(
          selectedTags.includes(tag)
            ? selectedTags.filter((item) => item !== tag)
            : [...selectedTags, tag]
        );
      }
    }
  };
  // Function to check if a tag is selected
  const isTagSelected = (tag) => {
    return selectedTags.includes(tag);
  };

  /***** fetch and prepare lists from firestore database **********/

  //test id:
  const cityID = "cityID"; //get cityID from a city context? maybe from auth context?
  //set initial state of lists
  const [lists, setLists] = useState([]);
  //set initial state of tags
  const [tags, setTags] = useState([]);
  //fetch lists from firestore
  const db = getFirestore(app);
  //   const cityReference = "cities/" + cityID + "/lists";
  //   console.log("cityRef: ", cityReference);
  useEffect(() => {
  const unsub = onSnapshot(collection(db, "cities", cityID, "lists"), (snapshot) => {
    const tempLists = [];
    const tempTags = new Set();

    snapshot.forEach((doc) => {
      tempLists.push(doc.data());
      doc.data().tags?.forEach((tag) => {
        tempTags.add(tag);
      });
    });

    const sortedTags = Array.from(tempTags).sort((a, b) => {
      if (a === "Alerts") return -1;
      if (b === "Alerts") return 1;
      if (a === "Tips") return -1;
      if (b === "Tips") return 1;
      return 0;
  });

    setLists(tempLists);
    setTags(sortedTags);
  });

  return () => unsub();
  }, [db, cityID]);
  // Filter data based on selected tags
  const filteredData =
  selectedTags.length > 0
    ? lists.filter((item) =>
        item.tags.some((tag) => selectedTags.includes(tag))
      )
    : lists;

  const isTagDisabled = (tag) => {
    return (selectedTags.includes("Alerts") && tag !== "Alerts") || (selectedTags.includes("Tips") && tag !== "Tips");
  };

  const renderItem = ({ item, index }) => {
    const hasNextItem = index < filteredData.length - 1;
    const nextItem = hasNextItem ? filteredData[index + 1] : null;
    const hasAlertsTag = nextItem && nextItem.tags.includes("Alerts");
    const isFirst = (index === 0);

    return <ListItem list={item} alertNext={hasAlertsTag} isFirst={isFirst} key={index}/>;
  };

  const countriesData = [
    { country: 'USA', cities: ['New York', 'Los Angeles', 'Chicago'] },
    { country: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal'] },
    { country: 'UK', cities: ['London', 'Manchester', 'Birmingham'] },
    // Add more countries and cities as needed
  ];

  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [filteredCities, setFilteredCities] = useState(countriesData[0].cities);

  const [country, setCountry] = useState(countriesData[0].country);
  const [city, setCity] = useState(countriesData[0].cities[0]);

  const handleCountryChange = (index) => {
    setSelectedCountryIndex(index);
    setCountry(countriesData[index].country);
    setFilteredCities(countriesData[index].cities);
    setSelectedCityIndex(0);
    setCity(countriesData[index].cities[0]);
  };

  const handleCityChange = (index) => {
    setSelectedCityIndex(index);
    setCity(countriesData[selectedCountryIndex].cities[index]);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight}]}>
        <Pressable disabled={headerExpanded} onPress={handleHeaderPress}>
          <View style={{flexDirection: "row", marginLeft: 20, alignItems: "center"}}>
            <Text style={styles.title}>{city}, {country}</Text>
            <Image
              source={require("../assets/icons/openpicker.png")}
              style={{width: 10, height: 20, marginLeft: 10, marginBottom: 6}}
            />
          </View>
        </Pressable>
      </Animated.View>
      <Animated.View
        style={[styles.headerReplacement, { height: headerHeight, opacity: headerReplacementOpacity }]}
      >
        <Pressable disabled={headerExpanded} onPress={handleHeaderPress}>
          <View style={styles.locationPicker}>
                <WheelPicker
                  containerStyle={{width: 120, marginHorizontal: 10}}
                  selectedIndicatorStyle={{backgroundColor: "rgba(255, 255, 255, 0.1)"}}
                  itemTextStyle={{ fontSize: 16, color: "white", fontFamily: "RobotoFlex-Regular" }}
                  itemHeight={24}
                  selectedIndex={selectedCountryIndex}
                  options={countriesData.map(item => item.country)}
                  onChange={(index) => handleCountryChange(index)}
                />
                <WheelPicker
                  key={selectedCountryIndex}
                  containerStyle={{width: 120, marginHorizontal: 10}}
                  selectedIndicatorStyle={{backgroundColor: "rgba(255, 255, 255, 0.1)"}}
                  itemTextStyle={{ fontSize: 16, color: "white", fontFamily: "RobotoFlex-Regular" }}
                  itemHeight={24}
                  selectedIndex={selectedCityIndex}
                  options={filteredCities}
                  onChange={(index) => handleCityChange(index)}
                />
                <TouchableOpacity onPress={handleHeaderPress}>
                  <Image
                    source={require("../assets/icons/swipedown.png")}
                    style={{width: 27, height: 27, marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </View>
        </Pressable>
      </Animated.View>
      <Animated.View style={{opacity: buttonOpacity}}>
        <TouchableOpacity
          style={[styles.addButtonView, {position: "absolute", top: -43, right: -180, transform: [{ translateY: buttonTop }, { translateX: buttonRight }]}]}
          onPress={() => navigation.navigate("AddList", { tags: sortedTags })}
          disabled={headerExpanded}
        >
          <Image
            source={require("../assets/icons/whiteplus.png")}
            style={styles.addButtonImage}
          />
        </TouchableOpacity>
      </Animated.View>
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
          {tags.map((tag, index) => (
            <View
              style={{ flexDirection: "row", alignItems: "center",  }}
              key={index}
            >
              <TouchableOpacity
                style={[
                  styles.barTag,
                  isTagSelected(tag) && styles.selectedTag,
                  isTagDisabled(tag) && styles.disabledTag,
                  index === 0 && { marginLeft: 5 },
                ]}
                onPress={() => toggleTag(tag)}
                disabled={isTagDisabled(tag)}
              >
                <Text style={[styles.tagBarText, isTagDisabled(tag) && styles.disabledTagText]}>{tag}</Text>
              </TouchableOpacity>
              {isTagSelected(tag) && (
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
      <View style={styles.listsContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 175 }}
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <BottomToolbar isOverlay={true}/>
    </View>
  );
};

export default Lists;

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
  headerReplacement: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#0063FB",
  },
  locationPicker: {
    flexDirection: "row",
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 99, 251, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  listsContainer: {
    paddingBottom: 164,
    marginHorizontal: -1,
    width: "100%",
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
  allTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
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
  addButtonView: {
    width: 30,
    height: 30,
    borderWidth: 2.5,
    borderColor: "white",
    borderRadius: 6,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
  },
  addButtonImage: {
    width: 15,
    height: 15,
  },
});