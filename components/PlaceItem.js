import { 
  View, 
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Spacer } from 'react-native-flex-layout';
import { useNavigation } from "@react-navigation/native";

function PlaceItem({ place, tag }) {
  const navigation = useNavigation();

  return (
    <Pressable
      android_ripple={{ color: "#eeeeee" }}
      style={({ pressed }) => pressed && styles.pressedItem}
      onPress={() => {
        navigation.navigate("Forum", { info: place, tag: tag });
      }}
    >
      <View style={styles.container}>
        <View style={styles.placeContents}>
            <Text style={styles.name}>{place.name}</Text>
            <Text style={styles.location}>{place.address} | {place.distance}</Text>
            <View style={styles.bottomLine}>
                <Image
                    source={require("../assets/icons/peoplehere.png")}
                    style={styles.icon}
                />
                <Text style={styles.bottomLineText}>  {place.visits} visits  •  {place.comments} comments</Text>
            </View>
        </View>
        <Spacer/>
        <Image
            source={require("../assets/icons/goto.png")}
            style={{width: 30, height: 30, marginRight: 20}}
        />
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    paddingVertical: 12,
    paddingRight: 15,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 28, 49, 0.2)",
  },
  placeContents: {
    paddingLeft: 15,
    paddingTop: 5,
  },
  name: {
    fontSize: 20,
    color: "#02265D",
    fontFamily: "RobotoFlex-Medium",
  },
  location: {
    fontSize: 12,
    color: "#02265D",
    opacity: 0.75,
    fontFamily: "RobotoFlex-RegularItalic",
    marginBottom: 10,
  },
  pressedItem: {
    opacity: 0.5,
  },
  bottomLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    marginTop: 5,
  },
  icon: {
    width: 8,
    height: 16,
  },
  bottomLineText: {
    color: "#0063FB",
    fontSize: 13,
    fontFamily: "RobotoFlex-Regular",
    opacity: 0.75,
  },
  goButton: {
    padding: 8,
    backgroundColor: "#0063FB",
    borderRadius: 5,
  },
});
