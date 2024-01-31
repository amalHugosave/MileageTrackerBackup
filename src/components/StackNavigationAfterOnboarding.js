import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import TabNavigation from './TabNavigation';
import Login from '../screens/Login';
import CreateAccounts from '../screens/CreateAccounts';
import SetPasscode from '../screens/SetPasscode';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useRealm } from '@realm/react';
import { Users } from '../Database/models/UsersSchema';
import CheckPassCode from '../screens/CheckPassCode';

const Stack = createNativeStackNavigator();

const StackNavigationAfterOnboarding = () => {

  const realm = useRealm();
  const [activeUser , setActiveUser] = useState(null);

  useEffect(()=>{
    getActiveUser();
  } , [])

  const getActiveUser = ()=>{
    const activeUserCheck = realm.objects(Users).filtered('active == $0' , true);
    console.log(activeUserCheck);
    if(activeUserCheck.length > 0)
      setActiveUser(activeUserCheck[0]);
    else
      setActiveUser({});
  }
  console.log(activeUser)
  // if(activeUser){
  return (
    <NavigationContainer>
        {
          activeUser &&
          <Stack.Navigator initialRouteName={activeUser._id ? "checkPasscode" : "login"} >
              {/* <Stack.Screen name="splash" component={Splash} options={{headerShown : false}}/> */}
              <Stack.Screen name="login" component={Login} options={{headerShown : false}} />
              <Stack.Screen name="checkPasscode"  options={{headerShown : false}} >{()=><CheckPassCode user={activeUser}/>}</Stack.Screen> 
              
              <Stack.Screen name="createAccount" component={CreateAccounts} options={{headerShown : false}} />
              <Stack.Screen name="setPasscode" component={SetPasscode} options={{headerShown : false}} />
              <Stack.Screen name="tabNavigation" component={TabNavigation} options={{headerShown : false}} />
              

          </Stack.Navigator>
        }
      </NavigationContainer>
  )
  // }
}

export default StackNavigationAfterOnboarding