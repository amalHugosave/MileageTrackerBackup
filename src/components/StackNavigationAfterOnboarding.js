import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import TabNavigation from './TabNavigation';
import Login from '../screens/Login';
import CreateAccounts from '../screens/CreateAccounts';
import SetPasscode from '../screens/SetPasscode';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const StackNavigationAfterOnboarding = () => {
    
  return (
    <NavigationContainer>
        <Stack.Navigator>
   
    
            {/* <Stack.Screen name="splash" component={Splash} options={{headerShown : false}}/> */}
            <Stack.Screen name="login" component={Login} options={{headerShown : false}} />
            <Stack.Screen name="createAccount" component={CreateAccounts} options={{headerShown : false}} />
            <Stack.Screen name="setPasscode" component={SetPasscode} options={{headerShown : false}} />
            <Stack.Screen name="tabNavigation" component={TabNavigation} options={{headerShown : false}} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default StackNavigationAfterOnboarding