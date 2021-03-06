import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';
import TCScreen from '../screens/TCScreen';

//directs to LoginScreen
//contains navigation options for Register and ForgotPassword

const Stack = createStackNavigator();

export default function LogOutStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#28A966',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={({title: 'Login'}, {headerLeft: null}, {headerShown: false})}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{title: 'Forgot your password?'}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: 'Register'}}
        />
        <Stack.Screen
          name="TCScreen"
          component={TCScreen}
          options={{title: 'Terms and Conditions'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
