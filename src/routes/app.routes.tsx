import { NativeStackHeaderProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Purchases from '../pages/Purchases';
import Header from '../components/Header';
import Account from '../pages/Account';

export type RootAppListType = {
  Purchases: undefined;
  Account: undefined;
};

const AppStack = createNativeStackNavigator();

const AppRoutes = () => {
  const renderHeader = (props: NativeStackHeaderProps) => {
    const { navigation } = props;
    return <Header navigation={navigation} />;
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" backgroundColor="white" />
      <AppStack.Navigator
        screenOptions={{
          header: renderHeader,
        }}
      >
        <AppStack.Screen name="Purchases" component={Purchases} options={{ title: '' }} />
        <AppStack.Screen name="Account" component={Account} options={{ title: '' }} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
