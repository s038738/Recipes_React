import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { Button } from "@react-native-material/core";
import image from "../../components/Pictures/home.jpg"

function HomeScreen({ navigation: { navigate } }) {
  return (
    <>
      <SafeAreaView>
        <Image
          style={styles.photo}
          source={image}>
        </Image>
        <Text
          style={styles.text}>
          Food & Recipes
        </Text>
      </SafeAreaView>

      <SafeAreaView
        style={styles.container}>
        <Text
          style={styles.text2}>
          Your go-to recipes for delicious appetizers, salads and sides, easy dinners, desserts and refreshing cocktails — plus, cooking how-tos and taste tests from the GH Test Kitchen.
        </Text>
        <Button
          style={styles.button}
          title="Find recipes you might like"
          onPress={() => navigate('RecepieListScreen')} />
      </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  photo: {
    width: 600,
    height: 400,
  },
  text: {
    marginTop: "-22.5%",
    backgroundColor: 'white',
    width: 156,
    fontWeight: 'bold',
    fontSize: "40px",
    fontFamily: 'Gill Sans'
  },
  text2:
  {
    marginTop: "-30%",
    marginLeft: 10,
    fontFamily: 'Charter',
    fontSize: "20px"
  },
  container:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f7'
  },
  button:
  {
    marginTop: "10%"
  }
});

export default HomeScreen;