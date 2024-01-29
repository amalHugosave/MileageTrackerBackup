import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import SignUp from '../screens/SignUp';
import CreateAccounts from '../screens/CreateAccounts';
import SetPasscode from '../screens/SetPasscode';
import ProfilePage from '../screens/ProfilePage';
import TabNavigation from './TabNavigation';
import Login from '../screens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


// import { View } from 'react-native';

const Stack = createNativeStackNavigator();
const StackNavigationOnboarding = () => {
    // const users = useQuery(Users);
    // console.log(users)
  return (
    <NavigationContainer>
        <Stack.Navigator>
   
    
            {/* <Stack.Screen name="splash" component={Splash} options={{headerShown : false}}/> */}
            <Stack.Screen name="signUp" component={SignUp} options={{headerShown : false}} />
            <Stack.Screen name="createAccount" component={CreateAccounts} options={{headerShown : false}} />
            <Stack.Screen name="setPasscode" component={SetPasscode} options={{headerShown : false}} />
            <Stack.Screen name="tabNavigation" component={TabNavigation} options={{headerShown : false}} />
    
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default StackNavigationOnboarding