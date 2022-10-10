import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import { recepieData } from "D:/VIKO/5sem/HP/3_Task/AwesomeProject/src/data/data.js"
import { Divider } from "@react-native-material/core";

function RecepieListScreen({ navigation: { navigate } }) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={recepieData}
          renderItem={({ item }) => {
            if (item.id < 5) {
              return (
                <View>
                  <SafeAreaView>
                    <TouchableOpacity
                      onPress={() => navigate('RecepieFilteredScreen', item)}>
                      <Image
                        style={styles.photo}
                        source={item.image}>
                      </Image>
                      <Text
                        style={styles.text}>
                        {item.category}
                      </Text>
                    </TouchableOpacity>
                    <Divider style={{ marginTop: 5 }} />
                  </SafeAreaView>
                </View>
              )
            }
          }} />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  photo: {
    width: 414,
    height: 200,
    marginTop: "5%"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f7'
  },
  text: {
    marginTop: "-25%",
    backgroundColor: 'white',
    width: 160,
    fontWeight: 'bold',
    fontSize: "35px",
    fontFamily: 'AppleSDGothicNeo-Bold',
  },
});

export default RecepieListScreen;