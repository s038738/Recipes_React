import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/StackScreen/HomeScreen';
import RecepieListScreen from './src/screens/StackScreen/RecepieListScreen';
import RecepieFilteredScreen from './src/screens/StackScreen/RecepieFilteredScreen';
import RecepieScreen from './src/screens/StackScreen/RecepieScreen';
import FirstTabScreen from './src/screens/TabScreen/FirstTabScreen';
import SecondTabScreen from './src/screens/TabScreen/SecondTabScreen';
import { store } from './src/store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabHome() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="firstTabPage" component={FirstTabScreen}/>
      <Tab.Screen name="secondTabPage" component={SecondTabScreen}/>
    </Tab.Navigator>
  )
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName={HomeScreen}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="TabStackScreen" component={TabHome} />
        <Stack.Screen name="RecepieScreen" component={RecepieScreen} />
        <Stack.Screen name = "RecepieFilteredScreen" component={RecepieFilteredScreen} options={{ title: 'Quick & Easy Recipes' }}/>
        <Stack.Screen name = "RecepieListScreen" component={RecepieListScreen} options={{ title: 'Food & Recipes' }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}
export default App;

