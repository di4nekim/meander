import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { Spacer } from 'react-native-flex-layout';
import WheelPicker from 'react-native-wheely';
import BottomToolbar from "./Toolbar";
import ForumItem from "./ForumItem";
import ListItem from "./ListItem";

function Profile({ profileInfo, isMyProfile, inChat }) {
    // const { profileInfo, isMyProfile, inChat } = route.params;
    const combinedName = profileInfo.firstName + " " + profileInfo.lastName;

    const [name, setName] = useState(combinedName);
    const [schoolHome, setSchoolHome] = useState(profileInfo.home);
    const [schoolAbroad, setSchoolAbroad] = useState(profileInfo.abroad);
    const [year, setYear] = useState(profileInfo.year);
    const [country, setCountry] = useState(profileInfo.country);
    const [city, setCity] = useState(profileInfo.city);
    const [username, setUsername] = useState("username");
    const [bio, setBio] = useState(`Duis aute irure dolor in reprehenderit 
in voluptate velit duis aute irure dolor in reprehe`);

    const [modalVisible, setModalVisible] = useState(false);

    const [newName, setNewName] = useState(name);
    const [newUsername, setNewUsername] = useState(username);
    const [newSchoolHome, setNewSchoolHome] = useState(schoolHome);
    const [newSchoolAbroad, setNewSchoolAbroad] = useState(schoolAbroad);
    const [newYear, setNewYear] = useState(year);
    const [newBio, setNewBio] = useState(bio);

    const openEditModal = () => {
      setNewName(name);
      setNewUsername(username);
      setNewSchoolHome(schoolHome);
      setNewSchoolAbroad(schoolAbroad);
      setNewYear(year);
      setNewBio(bio);
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
    };

    const saveChanges = () => {
      setName(newName);
      setUsername(newUsername);
      setSchoolHome(newSchoolHome);
      setSchoolAbroad(newSchoolAbroad);
      setYear(newYear);
      setBio(newBio);
      closeModal();
    };

    const [aboutToggled, setAboutToggled] = useState(true);
    const [commentsToggled, setCommentsToggled] = useState(false);
    const [bookmarksToggled, setBookmarksToggled] = useState(false);

    const toggleAbout = () => {
      setAboutToggled(true);
      setCommentsToggled(false);
      setBookmarksToggled(false);
    };

    const toggleComments = () => {
      setAboutToggled(false);
      setCommentsToggled(true);
      setBookmarksToggled(false);
    };

    const toggleBookmarks = () => {
      setAboutToggled(false);
      setCommentsToggled(false);
      setBookmarksToggled(true);
    };

    const comments = [
      {
        id: "1",
        name: "John Doe",
        time: "2 hr",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        location: "Place 1",
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
        location: "Place 2",
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
        location: "Place 3",
        description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma...",
        likes: 9,
        comments: [],
      },
      {
        id: "4",
        name: "John Doe",
        time: "2 hr",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        location: "Place 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        likes: 13,
        comments: [],
      },
      {
        id: "5",
        name: "Jane Smith",
        time: "48 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        location: "Place 5",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to Nemo enim ipsam voluptatem ",
        likes: 22,
        comments: [],
      },
      {
        id: "6",
        name: "Jane Smith",
        time: "48 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        location: "Place 6",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to Nemo enim ipsam voluptatem ",
        likes: 22,
        comments: [],
      },
      {
        id: "7",
        name: "Jane Smith",
        time: "48 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        location: "Place 7",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to Nemo enim ipsam voluptatem ",
        likes: 22,
        comments: [],
      },
      {
        id: "8",
        name: "Jane Smith",
        time: "48 min",
        timeAbs: "06:42 AM  •  Feb 11, 2014",
        location: "Place 8",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to Nemo enim ipsam voluptatem ",
        likes: 22,
        comments: [],
      },
    ];

    const bookmarks = [
      {
        title: "Best Italian Restaurants",
        tags: ["Food Recs"],
        description: "Duis aute irure dolor in reprehenderit in voluptate velit duis aute irure dolor in reprehenderit in voluptate velit......",
      },
      {
          title: "Public Transportation",
          tags: ["Tips"],
          description: "Duis aute irure dolor in reprehenderit in voluptate velit duis aute irure dolor in reprehenderit in voluptate velit......",
      },
      {
        title: "Cheap Eats!",
        tags: ["Food Recs", "Destinations", "Night Life"],
        description: "Duis aute irure dolor in reprehenderit in voluptate velit duis aute irure dolor in reprehenderit in voluptate velit......",
      },
      {
          title: "Tips 2",
          tags: ["Tips"],
          description: "Duis aute irure dolor in reprehenderit in voluptate velit duis aute irure dolor in reprehenderit in voluptate velit......",
      },
      {
          title: "Late Night Snacks",
          tags: ["Food Recs"],
          description: "Description",
      },
      {
          title: "Destinations 1",
          tags: ["Destinations"],
          description: "Duis aute irure dolor in reprehenderit in voluptate velit duis aute irure dolor in reprehenderit in voluptate velit......",
      },
    ];

    const countriesData = [
      { country: 'USA', cities: ['New York', 'Los Angeles', 'Chicago'] },
      { country: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal'] },
      { country: 'UK', cities: ['London', 'Manchester', 'Birmingham'] },
      // Add more countries and cities as needed
    ];

    const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
    const [selectedCityIndex, setSelectedCityIndex] = useState(0);
    const [filteredCities, setFilteredCities] = useState(countriesData[0].cities);

    const handleCountryChange = (index) => {
      setSelectedCountryIndex(index);
      setCountry(countriesData[index].country);
      setFilteredCities(countriesData[index].cities);
    };
  
    const handleCityChange = (index) => {
      setSelectedCityIndex(index);
      setCity(countriesData[selectedCountryIndex].cities[index]);
    };

    const renderComment = ({ item, index }) => {
      return <ForumItem post={item} onProfile />;
    };

    const renderBookmark = ({ item, index }) => {
      return <ListItem list={item}/>;
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, inChat && {paddingTop: 30}]}>
            {!inChat &&
            <TouchableOpacity style={styles.options}>
              <Image
                source={require("../assets/icons/misc.png")}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
            }
            <View style={styles.nameAndPic}>
                <View style={styles.profileImage} />
                <View>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.username}>@{username}</Text>
                  { isMyProfile ?
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.topButton}
                        onPress={openEditModal}
                    >
                      <Text style={styles.topButtonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.topButton}
                    >
                      <Text style={styles.topButtonText}>Follow</Text>
                    </TouchableOpacity>
                    { !inChat &&
                    <TouchableOpacity
                        style={[styles.topButton, {paddingHorizontal: 8}]}
                    >
                      <Image
                        source={require("../assets/icons/chat.png")}
                        style={{width: 20, height: 20}}
                      />
                    </TouchableOpacity>
                    }
                  </View>
                  }
                </View>
            </View>
            </View>
            <View style={styles.tabSelection}>
              <TouchableOpacity
                style={[styles.tab, aboutToggled && { borderColor: "#F5F5F5" }]}
                onPress={toggleAbout}
              >
                <Text style={styles.tabText}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, commentsToggled && { borderColor: "#F5F5F5" }]}
                onPress={toggleComments}
              >
                <Text style={styles.tabText}>Comments</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, bookmarksToggled && { borderColor: "#F5F5F5" }]}
                onPress={toggleBookmarks}
              >
                <Text style={styles.tabText}>Bookmarks</Text>
              </TouchableOpacity>
            </View>
            { aboutToggled &&
            <View style={styles.aboutPage}>
              { isMyProfile ?
              <View style={styles.locationPicker}>
                <Image
                  source={require("../assets/icons/locationdark.png")}
                  style={{width: 24, height: 24, marginRight: 20}}
                />
                <WheelPicker
                  containerStyle={{width: 120, marginHorizontal: 10}}
                  selectedIndicatorStyle={{backgroundColor: "rgba(0, 99, 251, 0.1)"}}
                  itemTextStyle={{ fontSize: 16, color: "#0063FB", fontFamily: "RobotoFlex-Regular" }}
                  itemHeight={24}
                  selectedIndex={selectedCountryIndex}
                  options={countriesData.map(item => item.country)}
                  onChange={(index) => handleCountryChange(index)}
                />
                <WheelPicker
                  key={selectedCountryIndex}
                  containerStyle={{width: 120, marginHorizontal: 10}}
                  selectedIndicatorStyle={{backgroundColor: "rgba(0, 99, 251, 0.1)"}}
                  itemTextStyle={{ fontSize: 16, color: "#0063FB", fontFamily: "RobotoFlex-Regular" }}
                  itemHeight={24}
                  selectedIndex={selectedCityIndex}
                  options={filteredCities}
                  onChange={(index) => handleCityChange(index)}
                />
              </View> :
              <View style={[styles.locationPicker, {paddingVertical: 0}]}>
              <Image
                source={require("../assets/icons/locationdark.png")}
                style={{width: 24, height: 24, marginRight: 20}}
              />
              <View style={styles.locationBubble}>
                <Text style={{fontSize: 16, color: "#0063FB", fontFamily: "RobotoFlex-Regular"}}>{country}</Text>
              </View>
              <View style={styles.locationBubble}>
                <Text style={{fontSize: 16, color: "#0063FB", fontFamily: "RobotoFlex-Regular"}}>{city}</Text>
              </View>
              </View>}
              <View style={styles.profileInfo}>
                <Text style={styles.bio}>{bio}</Text>
                <View style={styles.infoRow}>
                  <Text style={[styles.otherInfo, { fontFamily: "RobotoFlex-Medium" }]}>University (Home):</Text>
                  <Text style={styles.otherInfo}>{schoolHome}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.otherInfo, { fontFamily: "RobotoFlex-Medium" }]}>University (Abroad):</Text>
                  <Text style={styles.otherInfo}>{schoolAbroad}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.otherInfo, { fontFamily: "RobotoFlex-Medium" }]}>Year:</Text>
                  <Text style={styles.otherInfo}>{year}</Text>
                </View>
              </View>
            </View>
          }
          { commentsToggled && 
            <View style={[styles.listsContainer, inChat && {paddingBottom: 150}]}>
            <FlatList
              contentContainerStyle={{ paddingBottom: 75 }}
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          }
          { bookmarksToggled && 
            <View style={[styles.listsContainer, inChat && {paddingBottom: 150}]}>
            <FlatList
              contentContainerStyle={{ paddingBottom: 75 }}
              data={bookmarks}
              renderItem={renderBookmark}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          }
          {!inChat && <BottomToolbar isOverlay={true}/>}
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.topBar}>
                    <TouchableOpacity onPress={closeModal}>
                      <Image
                        source={require("../assets/icons/close.png")}
                        style={{width: 45, height: 45}}
                      />
                    </TouchableOpacity>
                    <Spacer/>
                    <Text style={styles.editHeader}>Edit Profile</Text>
                    <Spacer/>
                    <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.innerModalContent}>
                  <TouchableOpacity>
                    <View style={styles.editableProfileImage} />
                  </TouchableOpacity>
                  <EditInfo
                    specifier={"Name"}
                    value={newName}
                    onChange={setNewName}
                  />
                  <EditInfo
                    specifier={"Username"}
                    value={newUsername}
                    onChange={setNewUsername}
                    noCapitalization
                  />
                  <EditInfo
                    specifier={"University (Home)"}
                    value={newSchoolHome}
                    onChange={setNewSchoolHome}
                  />
                  <EditInfo
                    specifier={"University (Abroad)"}
                    value={newSchoolAbroad}
                    onChange={setNewSchoolAbroad}
                  />
                  <EditInfo
                    specifier={"Year"}
                    value={newYear}
                    onChange={setNewYear}
                    noCapitalization
                  />
                  <EditInfo
                    specifier={"Bio"}
                    value={newBio}
                    onChange={setNewBio}
                    multiline
                  />
                  </View>
                </View>
              </View>
            </Modal>
        </View>
    );
}

const EditInfo = ({ specifier, value, onChange, multiline, noCapitalization }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.infoRow}>
        <Text style={styles.modalSpecifier}>{specifier}  </Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          style={styles.inputText}
          multiline={multiline}
          autoCapitalize={noCapitalization && 'none'}
        />
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 40,
    backgroundColor: "#F2F5FD",
  },
  title: {
    fontSize: 28,
    paddingVertical: 10,
    color: "white",
    fontFamily: "RobotoFlex-Medium",
  },
  nameAndPic: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 32,
    color: "#02265D",
    fontFamily: "RobotoFlex-Medium",
  },
  username: {
    fontSize: 16,
    color: "rgba(2, 38, 93, 0.75)",
    fontFamily: "RobotoFlex-Medium",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 30,
    backgroundColor: "rgba(0, 28, 49, 0.2)",
  },
  editableProfileImage: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    backgroundColor: "#D9D9D9",
    marginTop: 15,
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  topButton: {
    backgroundColor: "rgba(0, 99, 251, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 20,
  },
  topButtonText: {
    fontSize: 15,
    color: "#0063FB",
    fontFamily: "RobotoFlex-Medium",
  },
  tabSelection: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#0063FB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
    color: "#F5F5F5",
    fontFamily: "RobotoFlex-Medium",
  },
  options: {
    position: "absolute",
    right: 20,
    top: 60,
  },
  aboutPage: {
    width: "100%",
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
  locationBubble: {
    marginVertical: 50,
    width: 120,
    marginHorizontal: 10,
    backgroundColor: "rgba(0, 99, 251, 0.1)",
    borderRadius: 7,
    paddingVertical: 3,
    alignItems: "center",
  },
  profileInfo: {
    marginHorizontal: 15,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  bio: {
    fontSize: 16,
    color: "#0063FB",
    fontFamily: "RobotoFlex-Regular",
    marginBottom: 16,
  },
  otherInfo: {
    fontSize: 16,
    color: "#02265D",
    fontFamily: "RobotoFlex-Regular",
    marginRight: 8,
    marginBottom: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#0063FB",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: "92%",
    alignItems: "center",
  },
  innerModalContent: {
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: "rgba(242, 245, 253, 0.2)",
    padding: 5,
    marginBottom: 10,
    width: "100%",
  },
  inputText: {
    fontSize: 16,
    fontFamily: "RobotoFlex-Medium",
    color: "white",
    width: "70%",
  },
  saveButton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  cancelButton: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  modalSpecifier: {
    fontSize: 16,
    fontFamily: "RobotoFlex-Regular",
    color: "white",
    marginRight: 5,
    opacity: 0.5,
  },
  topBar: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "rgba(242, 245, 253, 0.1)",
    paddingBottom: 15,
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  editHeader: {
    fontSize: 24,
    fontFamily: "RobotoFlex-Medium",
    color: "white",
    marginLeft: 42,
  },
  saveButton: {
    backgroundColor: "rgba(242, 245, 253, 0.8)",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: "RobotoFlex-Medium",
    color: "#0063FB",
  },
  listsContainer: {
    paddingBottom: 288,
    marginHorizontal: -1,
    // width: "100%",
},
});