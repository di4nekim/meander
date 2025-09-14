import React from "react";
import { useState, useEffect } from "react";
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
import { signInWithEmailAndPassword, auth } from "../firebase";
import DemoInfo from "./DemoInfo";

const SignIn = ({ navigation, children }) => {
  //input state for the user name
  const [email, setInput] = useState("");
  //handle the input change
  const handleInputChange = (text) => {
    setInput(text);
  };

  //input state for the user id
  const [password, setId] = useState("");
  //handle the input change
  const handleIdChange = (id) => {
    setId(id);
  };

  //user state
  const [user, setUser] = useState(null);

  //set Error state
  const [error, setError] = useState(false);

  //demo info state
  const [showDemoInfo, setShowDemoInfo] = useState(false);

  useEffect(() => {
    // Show demo info on first load
    const timer = setTimeout(() => {
      setShowDemoInfo(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  //handle the sign in with email and password
  async function handleSignIn(email, password) {
    console.log("signing in with email and password");

    try {
      //sign in with email and password
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("SignIn user: ", user);
          setUser(user);

          //navigate to the homescreen or Conversations
          navigation.navigate("Tabs");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode: ", errorCode);
          console.log("errorMessage: ", errorMessage);

          //do not navigate, or navigate back to the sign in page (this page)
          setError(true);
        });

      //catch errors
    } catch (e) {
      console.error("Error signing in: ", e);
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
          autoCapitalize="none"
          placeholderTextColor="rgba(0, 99, 251, 0.5)"
          placeholder="Email"
          onChangeText={(newText) => {
            handleInputChange(newText);
          }}
          defaultValue={email}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
          placeholderTextColor="rgba(0, 99, 251, 0.5)"
          placeholder="Password"
          onChangeText={(newText) => {
            handleIdChange(newText);
          }}
        />
        {/* dont include the folling line */}
        <TouchableOpacity
          onPress={() => {
            handleSignIn(email, password);
            //navigation.navigate("Home");
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </View>
        </TouchableOpacity>
      </View>
      {user && <Text>user: {user.email}</Text>}
      {error && <Text>Invalid email or password</Text>}
    </View>
    </KeyboardAvoidingView>
    <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => {navigation.navigate("SignUp")}}>
          <Text style={styles.bottomButton}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      {showDemoInfo && (
        <DemoInfo onDismiss={() => setShowDemoInfo(false)} />
      )}
    </View>
  );
};

// const GoogleSignInButton = ({ onPress }) => {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <View style={styles.button}>
//         <Image
//           source={require("../assets/icons/google.png")}
//           style={{ height: 23, width: 23 }}
//         />
//         <Text style={styles.buttonText}>Sign in with Google</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

export default SignIn;
