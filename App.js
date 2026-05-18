import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import SaleScreen from './src/screens/SaleScreen';
import StockScreen from './src/screens/StockScreen';
import MenuScreen from './src/screens/MenuScreen'; // à créer
import { migrate } from './src/database/migrations';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => { migrate(); }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Sale" component={SaleScreen} />
        <Stack.Screen name="Stock" component={StockScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
