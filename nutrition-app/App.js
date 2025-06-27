import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import FoodSearchScreen from './src/screens/FoodSearchScreen';
import BarcodeScannerScreen from './src/screens/BarcodeScannerScreen';
import NutritionOptimizer from './src/screens/NutritionOptimizer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FoodSearch" component={FoodSearchScreen} />
        <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
        <Stack.Screen name="NutritionOptimizer" component={NutritionOptimizer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}