
import React from 'react'
import { Platform } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Login,
  register,
  forgotPassword,
  VarificationCode,
  SetPassword
} from '../screens/index'

const Stack = createNativeStackNavigator();

export default function AuthStack() {

  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={Platform.OS == 'ios' ? { headerShown: true,animation: 'none' } : { headerShown: false,animation: 'none' }}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='register' component={register} />
      <Stack.Screen name='forgotPassword' component={forgotPassword} />
      <Stack.Screen name='VarificationCode' component={VarificationCode} />
      <Stack.Screen name='SetPassword' component={SetPassword} />
    </Stack.Navigator>
  );
}


