import React from 'react';
import {
  SafeAreaView,
  Text,
  Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increaseValue, decreaseValue } from './valueManagement';

function FirstTabScreen() {
    const dispatch = useDispatch();
    const counter_value = useSelector((state) => state.value);
    const increaseButtonAction = () => {
      dispatch(increaseValue());
    }
    const decreaseButtonAction = () => {
      dispatch(decreaseValue());
    }

    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
           <Text>It is the first tab screen</Text>
           <Text>Value is: {counter_value.value}</Text>
           <Button title="Increase" onPress={increaseButtonAction}/>
           <Button title="Decrease" onPress={decreaseButtonAction}/>
       </SafeAreaView>
    )
}

export default FirstTabScreen;