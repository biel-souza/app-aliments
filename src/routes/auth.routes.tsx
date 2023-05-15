import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import ForgotPasswordCode from '../pages/ForgotPasswordCode';
import ForgotPasswordMail from '../pages/ForgotPasswordMail';
import ForgotPassword from '../pages/ForgotPassword';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';

export type RootAuthListType = {
  SignIn: undefined;
  ForgotPasswordMail: undefined;
  ForgotPasswordCode: undefined;
  ForgotPassword: { code: string };
  Register: undefined;
};

const AuthStack = createNativeStackNavigator();

const AuthRoutes = () => (
  <NavigationContainer>
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} options={{ title: '', headerShown: false }} />
      <AuthStack.Screen name="Register" component={Register} options={{ title: '', headerShown: false }} />
      <AuthStack.Screen
        name="ForgotPasswordMail"
        component={ForgotPasswordMail}
        options={{ title: '', headerShown: false }}
      />
      <AuthStack.Screen
        name="ForgotPasswordCode"
        component={ForgotPasswordCode}
        options={{ title: '', headerShown: false }}
      />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: '', headerShown: false }} />
    </AuthStack.Navigator>
  </NavigationContainer>
);

export default AuthRoutes;
