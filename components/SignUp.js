import React from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform
} from "react-native";
//Firebase
import { collection, getDocs, setDoc, doc, createUserWithEmailAndPassword, auth, db } from "../firebase";

const SignUp = ({ navigation }) => {
  //input state for the user name
  const [username, setUsername] = useState("");
  //handle the input change
  const handleUsernameChange = (username) => {
    setUsername(username);
  };
  //input state for the user name
  const [email, setEmail] = useState("");
  //handle the input change
  const handleEmailChange = (email) => {
    setEmail(email);
  };

  //input state for the user id
  const [password, setPassword] = useState("");
  //handle the input change
  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  //user state
  const [user, setUser] = useState(null);

  //handle the sign in with email and password
  async function handleSignUp(email, password) {
    console.log("signing up with email and password");

    try {
      //create new user with email and password
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //add user to database
      await addUser(db, email, response.user.uid);

      //catch errors
    } catch (e) {
      console.error("Error signing in with google: ", e);
    }
  }

  async function addUser(
    db,
    email = "defaultEmail@example.com",
    id = "defaultId"
  ) {
    try {
      //create a new document with the passed name as the ID
      await setDoc(doc(db, "users", id), {
        displayName: username,
        uid: id,
        email: email,
      });
      //update userChats collection in firestore
      await setDoc(doc(db, "userChats", id), {});
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <View style={{flex: 1, alignItems: "center"}}>
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/meandertext.png')}
        style={{width: 320, height: 80, marginRight: 10}}
      />
      <View style={styles.addUser}>
        <TextInput
          style={styles.input}
          placeholder="Display Name"
          placeholderTextColor="rgba(0, 99, 251, 0.5)"
          onChangeText={(newText) => {
            handleUsernameChange(newText);
          }}
          defaultValue={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(0, 99, 251, 0.5)"
          autoCapitalize="none"
          onChangeText={(newText) => {
            handleEmailChange(newText);
          }}
          defaultValue={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(0, 99, 251, 0.5)"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={(newText) => {
            handlePasswordChange(newText);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            handleSignUp(email, password);
            navigation.navigate("Setup");
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              SIGN UP
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {user && <Text>user: {user.email}</Text>}
    </View>
    </KeyboardAvoidingView>
    <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.bottomButton}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#0063FB",
    fontFamily: "RobotoFlex-MediumItalic",
    fontSize: 64,
  },
  addUser: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  input: {
    width: 270,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: "rgba(0, 99, 251, 0.75)",
    paddingHorizontal: 5,
    paddingVertical: 5,
    color: "#0063FB",
    fontFamily: "RobotoFlex-Regular",
    fontSize: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0063fb",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 40,
    width: 270,
    height: 50,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 0,
    fontSize: 16,
    fontFamily: "RobotoFlex-Bold",
  },
  bottomSection: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomText: {
    fontSize: 14,
    fontFamily: "RobotoFlex-Regular",
    color: "#0063FB",
    marginRight: 15,
  },
  bottomButton: {
    fontSize: 14,
    fontFamily: "RobotoFlex-Bold",
    color: "#0063FB",
  },
});

export default SignUp;
