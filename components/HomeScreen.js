import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function HomeScreen({ navigation, children }) {
  const currentUser = useContext(AuthContext);
  console.log("Homescreen currentUser: ", currentUser);

  // const userFromContext = useContext(AuthContext);
  // console.log("Homescreen userFromContext: ", userFromContext);
  // console.log(
  //   "Homescreen userFromContext.currentUser: ",
  //   userFromContext.currentUser
  // );
  // console.log("Homescreen auth.currentUser: ", auth.currentUser);

  // const [user, setUser] = useState(null);
  // console.log("ln18: Homescreen user: ", user);

  // useEffect(() => {
  //   setUser(userFromContext.currentUser);
  //   console.log("Homescreen user set in 1st useEffect: ", user);
  // }, [userFromContext]);

  // useEffect(() => {
  //   //children.setCurrentUser(currentUser);
  //   console.log("Homescreen user set in 2nd useEffect: ", currentUser);
  // }, []);

  // // rerender on navigation to this screen
  // const didBlurSubscription = navigation.addListener("focus", () => {
  //   setUser(userFromContext.currentUser);
  //   console.log("Homescreen user set in Listener: ", user);
  // });
  // // Remove the listener when you are done
  // //didBlurSubscription.remove();
  // console.log("ln33. Homescreen user: ", user);

  return (
    <View style={styles.appContainer}>
      <StatusBar style="dark" />
      <Text style={styles.titleStrike}>meander</Text>
      <Text style={styles.title}>"pavilion"</Text>
      <Text>Explore the world around you</Text>
      {!!currentUser && <Text>currentUser: {currentUser.email}</Text>}
      <View style={styles.button}>
        <Button
          title="Conversations"
          onPress={() => navigation.navigate("Conversations")}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Add New Conversation"
          onPress={() => navigation.navigate("NewConversation")}
        />
      </View>
      <View style={styles.button}>
        <Button title="Forum Pages" onPress={() => navigation.navigate("Lists")} />
      </View>
      <View style={styles.button}>
        <Button title="Setup" onPress={() => navigation.navigate("Setup")} />
      </View>
      <View style={styles.button}>
        <Button
          title="Profile (mine)"
          onPress={() =>
            navigation.navigate("ProfilePage", {
              profileInfo: {firstName: "first", lastName: "last", home: "home", abroad: "abroad", year: "year", country: "country", city: "city"},
              isMyProfile: true,
              inChat: false
            })
          }
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Profile (someone else's)"
          onPress={() =>
            navigation.navigate("ProfilePage", {
              profileInfo: {firstName: "first", lastName: "last", home: "home", abroad: "abroad", year: "year", country: "country", city: "city"},
              isMyProfile: false,
              inChat: false
            })
          }
        />
      </View>
      <View style={styles.button}>
        <Button
          title="FirebaseTest"
          onPress={() => navigation.navigate("FirebaseTest")}
        />
      </View>
      <View style={styles.button}>
        <Button title="Sign In" onPress={() => navigation.navigate("SignIn")} />
      </View>
      <View style={styles.button}>
        <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
      </View>
      <View style={styles.button}>
        <Button
          title="Sign Out"
          onPress={() => {
            signOut(auth);
            console.log("signed out user: ", auth.currentUser);
            navigation.navigate("SignIn");
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Console Log User"
          onPress={() =>
            console.log("Homescreen auth.currentUser : ", auth.currentUser)
          }
        />
      </View>
      {children}
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0063FB",
  },
  titleStrike: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0063FB",
    textDecorationLine: "line-through",
  },
  button: {
    marginTop: 15,
  },
});
