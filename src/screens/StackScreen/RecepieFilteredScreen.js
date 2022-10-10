import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';

import { recepieData } from "D:/VIKO/5sem/HP/3_Task/AwesomeProject/src/data/data.js"
import { Divider } from "@react-native-material/core";

function RecepieFilteredScreen({ navigation: { navigate }, route }) {
  const { category, name, image } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f6f6f7'}}>
      <FlatList
        data={recepieData}
        renderItem={({ item, index }) => {
          if (category === item.category) {
            return (
              <View>


                <TouchableOpacity
                  onPress={() => navigate('RecepieScreen', item)}
                >
                  <Image
                    style={styles.photo}
                    source={item.image}>
                  </Image>

                  <SafeAreaView style={styles.container}>
                    <Text style={styles.text2}> </Text>
                    <Text style={styles.text}>{item.name}</Text>

                    
                    
                    </SafeAreaView>


                  <Divider style={{ marginTop: 5 }} />


                </TouchableOpacity>



              </View>
            )
          }
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  photo: {
    width: 414,
    height: 200,
    marginTop: "2%"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginTop: "-8%",
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: "20px",
    fontFamily: 'AppleSDGothicNeo-Bold',
  },
  text2: {
    marginTop:"-10%",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 20,
    width: 414,
    borderWidth: 2,

  },
});

export default RecepieFilteredScreen;