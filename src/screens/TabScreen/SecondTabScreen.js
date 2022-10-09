import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button
} from 'react-native';
import { Recepies } from "D:/VIKO/5sem/HP/3_Task/AwesomeProject/src/data/data.js"

const carsData = [
    {
        "id": 1,
        "make": "BMW",
        "model": "M3",
        "price": "80000"
    },
    {
        "id": 2,
        "make": "MERSEDES BENZ",
        "model": "C350",
        "price": "50000"
    },

]


// const Button = ({ item, onPress}) => (
//     <TouchableOpacity 
//         style={styles.button} 
//         keyExtractor={item.id}
//         onPress={onPress}
//     >
//         <Text>{item.make}</Text>
//     </TouchableOpacity>
// )

function SecondTabScreen({navigation: { navigate }}) {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>It is the second tab screen</Text>
            {/* <FlatList
                data={Recepies}
                renderItem={({item}) => (
                    // <Button onPress={() => navigate('RecepieScreen', item)} title={item.category}/>
                    <Button title={item.category}/>
                )}
            /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
    },
})

export default SecondTabScreen;