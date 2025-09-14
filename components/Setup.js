import React, { useState, useRef } from 'react';
import { 
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import WheelPicker from 'react-native-wheely';

const { width, height } = Dimensions.get('window');

const Dot = ({ active }) => {
  const dotSize = useRef(new Animated.Value(active ? 10 : 5)).current;
  const marginTop = useRef(new Animated.Value(active ? 0 : 2.5)).current;

  Animated.spring(dotSize, {
    toValue: active ? 10 : 5,
    useNativeDriver: false,
  }).start();

  Animated.spring(marginTop, {
    toValue: active ? 0 : 2.5,
    useNativeDriver: false,
  }).start();

  const dotStyle = {
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize.interpolate({
      inputRange: [5, 10],
      outputRange: [2.5, 5],
    }),
    opacity: dotSize.interpolate({
      inputRange: [5, 10],
      outputRange: [0.5, 1],
    }),
    marginTop: marginTop,
    marginHorizontal: 2.5,
    backgroundColor: "#0063FB",
  };

  return <Animated.View style={dotStyle} />;
};

const Setup = () => {
  const navigation = useNavigation();

  const [currentPage, setCurrentPage] = useState(1);
  const scrollViewRef = useRef(null);
  const totalPages = 7;

  const handleNextPage = () => {
    setCurrentPage(current => current < totalPages ? current + 1 : current);
  };

  const handlePreviousPage = () => {
    setCurrentPage(current => current > 1 ? current - 1 : current);
  };

  const handleScroll = (event) => {
    const { x } = event.nativeEvent.contentOffset;
    const currentPageIndex = Math.round(x / width) + 1;
    setCurrentPage(currentPageIndex);
  };

  const handleScrollUp = () => {
    if (currentPage > 1) {
      scrollViewRef.current.scrollTo({ y: (currentPage - 2) * height });
    }
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [schoolHome, setSchoolHome] = useState('');
  const [schoolAbroad, setSchoolAbroad] = useState('');
  const [year, setYear] = useState('first year');

  const countriesData = [
    { country: 'USA', cities: ['New York', 'Los Angeles', 'Chicago'] },
    { country: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal'] },
    { country: 'UK', cities: ['London', 'Manchester', 'Birmingham'] },
    // Add more countries and cities as needed
  ];

  const years = ['first year', 'second year', 'third year', 'fourth year'];

  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);

  const [countryInputText, setCountryInputText] = useState(countriesData[0].country);
  const [cityInputText, setCityInputText] = useState(countriesData[0].cities[0]);
  const [filteredCities, setFilteredCities] = useState(countriesData[0].cities);

  const [results, setResults] = useState([firstName, lastName, schoolHome, schoolAbroad, year, countryInputText, cityInputText]);

  const handleFirstNameChange = (text) => {
    setFirstName(text);
    setResults([text, lastName, schoolHome, schoolAbroad, year, countryInputText, cityInputText]);
  };

  const handleLastNameChange = (text) => {
    setLastName(text);
    setResults([firstName, text, schoolHome, schoolAbroad, year, countryInputText, cityInputText]);
  };

  const handleSchoolHomeChange = (text) => {
    setSchoolHome(text);
    setResults([firstName, lastName, text, schoolAbroad, year, countryInputText, cityInputText]);
  };

  const handleSchoolAbroadChange = (text) => {
    setSchoolAbroad(text);
    setResults([firstName, lastName, schoolHome, text, year, countryInputText, cityInputText]);
  };

  const handleYearChange = (index) => {
    setSelectedYearIndex(index);
    setYear(years[index]);
    setResults([firstName, lastName, schoolHome, schoolAbroad, years[index], countryInputText, cityInputText]);
  };

  const handleCountryChange = (index) => {
    setSelectedCountryIndex(index);
    setCountryInputText(countriesData[index].country);
    setFilteredCities(countriesData[index].cities);
    setResults([firstName, lastName, schoolHome, schoolAbroad, year, countriesData[index].country, cityInputText]);
  };

  const handleCityChange = (index) => {
    setSelectedCityIndex(index);
    setCityInputText(countriesData[selectedCountryIndex].cities[index]);
    setResults([firstName, lastName, schoolHome, schoolAbroad, year, countryInputText, countriesData[selectedCountryIndex].cities[index]]);
  };

  const allFilled = (
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    schoolHome.trim().length > 0
);

  return (
    <View style={styles.container}>
      <ScrollView
        //ref={scrollViewRef}
        //contentContainerStyle={{ height: height * totalPages }}
        contentContainerStyle={{flexGrow: 1, alignItems: "center"}}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        horizontal
      >
        <View style={styles.page}>
          <Text style={styles.intro}>Before we get to the fun part, let's set up your profile.</Text>
          <View style={styles.bottomSection}>
            <Text style={styles.bottomText}>SWIPE RIGHT TO CONTINUE FORM</Text>
            <Image 
                source={require("../assets/icons/forward.png")}
                style={styles.formIcon}
            />
          </View>
        </View>
        <View style={[styles.page, styles.questionContainer]}>
          <Text style={styles.indicatorText}>Required</Text>
          <Text style={styles.questionTitle}>[1] Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, {width: width / 2 - 100}]}
              placeholder="First"
              placeholderTextColor="rgba(0, 99, 251, 0.5)"
              value={firstName}
              onChangeText={handleFirstNameChange}
            />
            <Text style={styles.separator}>/</Text>
            <TextInput
              style={[styles.input, {width: width / 2 - 100}]}
              placeholder="Last"
              placeholderTextColor="rgba(0, 99, 251, 0.5)"
              value={lastName}
              onChangeText={handleLastNameChange}
            />
          </View>
        </View>
        <GenericTextInput 
          title="[2] University (Home)"
          value={schoolHome}
          onChange={handleSchoolHomeChange}
        />
        <GenericTextInput 
          title="[3] University (Abroad)"
          optional
          value={schoolAbroad}
          onChange={handleSchoolAbroadChange}
        />
        <View style={[styles.page, styles.questionContainer]}>
          <View style={{marginTop: 80}}></View>
          <Text style={styles.indicatorText}>Required</Text>
          <Text style={[styles.questionTitle, {marginBottom: 0}]}>[4] Year</Text>
          <WheelPicker
            containerStyle={{width: width - 140}}
            selectedIndicatorStyle={{backgroundColor: "rgba(0, 99, 251, 0.1)"}}
            itemTextStyle={{ fontSize: 16, color: "#0063FB", fontFamily: "RobotoFlex-Regular" }}
            itemHeight={30}
            selectedIndex={selectedYearIndex}
            options={years}
            onChange={(index) => handleYearChange(index)}
          />
        </View>
        <View style={[styles.page, styles.questionContainer]}>
          <View style={{marginTop: 80}}></View>
          <Text style={styles.indicatorText}>Required</Text>
          <Text style={[styles.questionTitle, {marginBottom: 0}]}>[5] Country</Text>
          <WheelPicker
            containerStyle={{width: width - 140}}
            selectedIndicatorStyle={{backgroundColor: "rgba(0, 99, 251, 0.1)"}}
            itemTextStyle={{ fontSize: 16, color: "#0063FB", fontFamily: "RobotoFlex-Regular" }}
            itemHeight={30}
            selectedIndex={selectedCountryIndex}
            options={countriesData.map(item => item.country)}
            onChange={(index) => handleCountryChange(index)}
          />
        </View>
        <View style={styles.pageVertical}>
        <View style={[styles.pageHorizontal, styles.questionContainer]}>
          <View style={{marginTop: 80}}></View>
          <Text style={styles.indicatorText}>Required</Text>
          <Text style={[styles.questionTitle, {marginBottom: 0}]}>[6] City</Text>
          <WheelPicker
            key={selectedCountryIndex}
            containerStyle={{width: width - 140}}
            selectedIndicatorStyle={{backgroundColor: "rgba(0, 99, 251, 0.1)"}}
            itemTextStyle={{ fontSize: 16, color: "#0063FB", fontFamily: "RobotoFlex-Regular" }}
            itemHeight={30}
            selectedIndex={selectedCityIndex}
            options={filteredCities}
            onChange={(index) => handleCityChange(index)}
          />
        </View>
        <TouchableOpacity
          disabled={!allFilled}
          onPress={() => navigation.navigate("Tabs")}
          style={[styles.button, allFilled ? styles.enabled : styles.disabled]}
        >
          <Text style={allFilled ? styles.enabledText : styles.disabledText}>
            {allFilled ? "Submit" : "Enter all required information to submit"}
          </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
      {currentPage > 1 && (
        <View style={styles.dotContainer}>
          {[...Array(totalPages-1).keys()].map((index) => (
            <Dot key={index} active={index + 2 === currentPage} />
          ))}
        </View>
      )}
    </View>
  );
};

const GenericTextInput = ({ title, optional, value, onChange }) => {
  return (
    <View style={styles.pageVertical}>
      <View style={[styles.pageHorizontal, styles.questionContainer]}>
      <Text style={styles.indicatorText}>{optional ? "Optional" : "Required"}</Text>
      <Text style={styles.questionTitle}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, {width: width - 140}]}
          placeholder="Type your answer here..."
          placeholderTextColor="rgba(0, 99, 251, 0.5)"
          value={value}
          onChangeText={onChange}
          />
        </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageHorizontal: {
    width,
    alignItems: 'center',
  },
  pageVertical: {
    height,
    justifyContent: 'center',
  },
  questionContainer: {
    alignItems: 'start',
    paddingLeft: 70,
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 75,
    justifyContent: 'center',
    alignItems: 'start',
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: "#0063FB",
    borderRadius: 2.5,
    marginHorizontal: 2.5,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  intro: {
    fontSize: 20,
    fontFamily: "RobotoFlex-Medium",
    color: "#0063FB",
    marginHorizontal: 50,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formIcon: {
    width: 15,
    height: 15,
    opacity: 0.4,
  },
  bottomText: {
    fontSize: 12,
    fontFamily: 'RobotoFlex-MediumItalic',
    color: "rgba(0, 99, 251, 0.4)",
    marginRight: 10,
  },
  questionTitle: {
    fontSize: 24,
    fontFamily: "RobotoFlex-Medium",
    color: "#0063FB",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 2,
    borderColor: "rgba(0, 99, 251, 0.75)",
    paddingHorizontal: 5,
    paddingVertical: 5,
    color: "#0063FB",
    fontFamily: "RobotoFlex-Regular",
    fontSize: 16,
  },
  disabledInput: {
    borderBottomWidth: 2,
    borderColor: "rgba(0, 28, 49, 0.4)",
    paddingHorizontal: 5,
    paddingVertical: 5,
    color: "#0063FB",
    fontFamily: "RobotoFlex-Regular",
    fontSize: 16,
  },
  separator: {
    marginHorizontal: 20,
    fontSize: 30,
    fontFamily: "RobotoFlex-Regular",
    color: "#0063FB",
  },
  button: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    height: 50,
    marginVertical: 20,
    marginHorizontal: 50,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enabled: {
    backgroundColor: 'white',
  },
  disabled: {
    marginHorizontal: 0,
    backgroundColor: "transparent",
  },
  enabledText: {
    fontSize: 16,
    fontFamily: 'RobotoFlex-Bold',
    color: '#0063FB',
  },
  disabledText: {
    fontSize: 16,
    fontFamily: 'RobotoFlex-Medium',
    color: "rgba(0, 28, 49, 0.4)",
  },
  indicatorText: {
    fontSize: 11,
    fontFamily: 'RobotoFlex-MediumItalic',
    color: "rgba(0, 99, 251, 0.5)",
  },
});

export default Setup;
