import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  FlatList,
  View
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
                  <Button
                    style={styles.button}
                    onPress={() => navigate('RecepieFilteredScreen', item)}
                    title={item.category} />
                  <Divider style={{ marginTop: 5 }} />
                </View>
              )
            }
          }} />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  button: {

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RecepieListScreen;