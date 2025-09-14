import React from 'react';
import { View } from "react-native";
import Profile from "./Profile";

function ProfilePage({ route }) {
    const { 
        profileInfo = {firstName: "first", lastName: "last", home: "home", abroad: "abroad", year: "year", country: "country", city: "city"},
        isMyProfile = true,
        inChat = false 
    } = route.params || {};
    return (
        <View style={{flex: 1}}>
            <Profile profileInfo={profileInfo} isMyProfile={isMyProfile} inChat={inChat} />
        </View>
    );
}

export default ProfilePage;