import React, { useEffect, useState, Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  SectionList,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from '@react-native-material/core';
import { Button, Divider} from "@react-native-material/core";
import ButtonComponent from '../../components/ButtonComponent';
import image from "../../components/Pictures/recepie.jpg"


function RecepieScreen({ navigation: { navigate }, route }) {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [initialElements, setInitialElements] = useState([]);
  const [retrieve, setRetrieve] = useState(true);


  useEffect(() => {
    const retrieveData = async () => {
      try {
        const valueString = await AsyncStorage.getItem('@storage_Key');
        const value = JSON.parse(valueString);
        console.log('retrieve: ', valueString);
        value === null ? setInitialElements([]) : setInitialElements(value);
      } catch (error) {
        console.log(error);
      }
    }
    if (retrieve)
      retrieveData();
    setRetrieve(false);
  }, [retrieve])

  const saveData = async (id, username, comment) => {
    try {
      console.log('username: ', username)
      const newObj = {
        id: uuid.v4(),
        recepieid: id,
        username: username,
        comment: comment
      }
      console.log('55: ', newObj)
      console.log('56: ', initialElements)
      const jsonValue = JSON.stringify([...initialElements, newObj]);
      console.log(jsonValue)
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      setInitialElements(JSON.parse(jsonValue));
      console.log('yes');
    } catch (e) {
      onsole.log('Can not save value');
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      console.log('Get data: ', jsonValue);
      setInitialElements(JSON.parse(jsonValue));
    } catch (e) {
      console.log("Can't read data");
    }
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      const emptyArray = [];
      setInitialElements(emptyArray);
    } catch (e) {

    }
  }

  const deleteComment = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }catch (e) {

    }
  }



  const { id, category, name, ingredients, directions } = route.params;
  const [shouldShow, setShouldShow] = useState(true);
  return (
    <>
      <SafeAreaView style={styles.background}>
        <ScrollView style={styles.container}>
          <View style={{alignSelf:'center', padding: 15,}}>
          <Text
          style={styles.title}>
            {name}</Text>
            </View>
          <SafeAreaView>
            <Image
              style={styles.photo}
              source={image}>
            </Image>
            
          </SafeAreaView>

          <Text
          style={styles.ingredients}
          >Ingredients:</Text>
          <SafeAreaView>
            <FlatList
              data={ingredients}
              renderItem={({ item }) => (
                <>
                <Text style={{fontFamily: 'Arial',fontSize: "15px"}}>{item}</Text>
                <Divider style={{ marginTop: 5 }} />
                </>
              )} />
          </SafeAreaView>

          <Text style={styles.ingredients}>Directions:</Text>
          <Text style={{fontFamily: 'Arial',fontSize: "15px"}}>{directions}</Text>

          <Text style={styles.ingredients}>Comments:</Text>

          <FlatList
            data={initialElements}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item.comment}</Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.id} />

<SafeAreaView>
             <Button
          title="Write a comment"
          onPress={() => setShouldShow(!shouldShow)}
        />
        {/*Here we will return the view when state is true 
        and will return false if state is false*/}
        {shouldShow ?
        (
          <>
          <TextInput
          style={styles.input}
          placeholder='Enter Username'
          defaultValue={username}
          onChangeText={(value) => setUsername(value)} />
          <TextInput
            style={styles.input}
            placeholder="Insert Comment here"
            defaultValue={comment}
            onChangeText={(value) => setComment(value)} />
            <ButtonComponent title="Save Data" event={() => saveData(id, username, comment)} /><ButtonComponent title="Read data" event={() => getData()} /><Button
            title="Clear async storage"
            style={{ alignSelf: 'center', marginTop: 10 }}
            onPress={() => clearAll()} />
            </>
        ) : null}
</SafeAreaView>
           



            


      
          
        </ScrollView>
      </SafeAreaView>
    </>

  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    //borderWidth: 1,
    padding: 10,
  },
  container: {
  },
  photo: {
    width: 600,
    height: 400,
  },
  background:
  {
    backgroundColor: '#f6f6f7'
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: "25px",
    alignContent: 'center',
    fontWeight: 'bold',
  },
  ingredients: {
    fontFamily: 'Georgia',
    fontSize: "25px",
    alignContent: 'center',
    fontWeight: 'bold',
  },
});

export default RecepieScreen;