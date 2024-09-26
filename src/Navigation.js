import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DropOffScreen from './fetchDropOffLocations';
import TrackingScreen from './TrackGift';
import CameraView from './Camera';
import ShakeScreen from './ScreenShake';
import RandomFetchScreen from './randomFetch';
import BudgetScreen from './BugdetPicker';
import SignUp from './SignUp';
import Home from './Home';
const Stack = createNativeStackNavigator();



const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen
          name="LogIn"
          component={SignUp}
          options={{title: 'SignUp', headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerTitleAlign: 'center',
            headerShown: false,
            headerBackVisible: false,
          }}
        />
          <Stack.Screen
          name="DropPage"
          component={DropOffScreen}
          options={{title: null}}
        />
        <Stack.Screen
          name="TrackPage"
          component={TrackingScreen}
          options={{title:null}}
        />
        <Stack.Screen
          name="CameraPage"
          component={CameraView}
          options={{title: null}}
        />
        <Stack.Screen
          name="ShakePage"
          component={ShakeScreen}
          options={{title: null}}
        />
        <Stack.Screen
          name="RandomFetchPage"
          component={RandomFetchScreen}
          options={{title: null}}

        />
        <Stack.Screen
          name="BudgetPage"
          component={BudgetScreen}
          options={{title: null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
