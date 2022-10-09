import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList
} from 'react-native';

import { recepieData } from "D:/VIKO/5sem/HP/3_Task/AwesomeProject/src/data/data.js"
import { Divider } from "@react-native-material/core";

function RecepieFilteredScreen({ navigation: { navigate }, route }) {
  const {category, name} = route.params;
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={recepieData}
        renderItem={({ item, index }) => {
          if (category === item.category) {
            return (
              <View>
                <Button onPress={() => navigate('RecepieScreen', item)} title={item.name} />
                <Divider style={{ marginTop: 5 }} />
              </View>
            )
          }
        }}
      />
    </SafeAreaView>
  )
}

export default RecepieFilteredScreen;