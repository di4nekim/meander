import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Spacer } from 'react-native-flex-layout';
import { useNavigation } from "@react-navigation/native";

const BottomToolbar = ({ isOverlay }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, isOverlay && styles.absPos]}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ConversationsTab")}>
        <Image 
            source={require('../assets/icons/messages.png')}
            style={{width: 33, height: 33}}
        />
      </TouchableOpacity>
      <Spacer/>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ForumTab")}>
        <Image 
            source={require('../assets/icons/pavilionlogo.png')}
            style={{width: 20, height: 30}}
        />
      </TouchableOpacity>
      <Spacer/>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProfileTab", {
              profileInfo: ["first", "last", "home", "abroad", "year", "country", "city"],
            })}>
        <Image 
            source={require('../assets/icons/profile.png')}
            style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#0063FB',
    borderTopWidth: 1,
    borderTopColor: '#0063FB',
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#0063FB',
  },
  absPos: {
    position: "absolute",
    bottom: 0,
  },
});

export default BottomToolbar;
