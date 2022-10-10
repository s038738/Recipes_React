import React, { useEffect, useState, Component, useCallback } from 'react';
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
import { Button, Divider } from "@react-native-material/core";
import ButtonComponent from '../../components/ButtonComponent';
import { parse as uuidParse } from 'uuid';

function RecepieScreen({ navigation: { navigate }, route }) {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [initialElements, setInitialElements] = useState([]);
  const [deleteElelemnt, setDeleteElement] = useState([])
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

  const deleteComment = async (key, id, username, comment) => {
    try {
      const newObj = {
        id: key,
        recepieid: id,
        username: username,
        comment: comment
      }




      const isNum = (element) => element.id == key;
      console.log(initialElements)

      console.log(initialElements.findIndex(isNum))

      var num = initialElements.findIndex(isNum)

      console.log(initialElements.length)
      console.log(initialElements.slice(num +1 , initialElements.length))
      const newArr = initialElements.slice(num +1, initialElements.length)
      await AsyncStorage.clear();
      const emptyArray = [];
      setInitialElements(emptyArray);
      
      const jsonValue = JSON.stringify([...newArr]);

      console.log(jsonValue)
      await AsyncStorage.setItem('@storage_Key', jsonValue);

      setInitialElements(newArr);

    } catch (e) {
      console.log("Can't read data");
    }
  }

  const { id, category, name, ingredients, directions, image } = route.params;
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShow2, setShouldShow2] = useState(false);
  return (
    <>
      <SafeAreaView style={styles.background}>
        <ScrollView style={styles.container}>
          <View style={{ alignSelf: 'center', padding: 15, }}>
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
            style={styles.ingredients}>
            Ingredients:
          </Text>
          <SafeAreaView>
            <FlatList
              data={ingredients}
              renderItem={({ item }) => (
                <>
                  <Text style={{ fontFamily: 'Arial', fontSize: "15px", marginLeft: "2%" }}>{item}</Text>
                  <Divider style={{ marginTop: 5 }} />
                </>
              )} />
          </SafeAreaView>
          <Text style={styles.ingredients}>Directions:</Text>
          <Text style={{ fontFamily: 'Arial', fontSize: "15px", marginLeft: "2%" }}>{directions}</Text>
          <SafeAreaView>
            <Button
              style={{ alignSelf: 'center', marginTop: 10 }}
              title="Show comments"
              onPress={() => setShouldShow2(!shouldShow2)}
            />
            {/*Here we will return the view when state is true 
        and will return false if state is false*/}
            {shouldShow2 ?
              (
                <>
                  <Text style={styles.ingredients}>Comments:</Text>
                  <View>
                    <FlatList
                      data={initialElements}
                      renderItem={({ item, index }) => {
                        index = item.id
                        if (id == item.recepieid) {
                          return (
                            <>
                              <View style={styles.container2}>
                                <View style={styles.item2}>
                                  <Text
                                    style={{ fontSize: "18px", marginTop: "5%" }}
                                  >{item.comment}</Text>
                                </View>
                                <View style={styles.item2}>
                                  <View>
                                    <ButtonComponent
                                      style={{ width: 100, marginTop: "5%" }}
                                      title='Delete'
                                      event={() => deleteComment(item.id, item.recepieid, item.username, item.comment)}>
                                    </ButtonComponent>
                                    {/* <Text>{index}</Text> */}
                                  </View>
                                </View>
                              </View><Divider style={{ marginTop: 5 }} />
                            </>

                          );
                        }
                      }}
                      keyExtractor={(item) => item.id} />
                  </View>
                  <SafeAreaView>
                    <Button
                      style={{ alignSelf: 'center', marginTop: 10 }}
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
                          <ButtonComponent title="Send Comment" event={() => saveData(id, username, comment)} />
                          <ButtonComponent title="Read data" event={() => getData()} />
                          <Button
                            title="Clear async storage"
                            style={{ alignSelf: 'center', marginTop: 10 }}
                            onPress={() => clearAll()} />
                        </>
                      ) : null}
                  </SafeAreaView>
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
    marginLeft: "2%"
  },
  container2:
  {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  item2:
  {
    width: '50%',
  }
});

export default RecepieScreen;