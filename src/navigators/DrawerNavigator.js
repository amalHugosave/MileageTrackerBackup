import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import ProfilePage from '../screens/ProfilePage';
import UserPopUp from '../components/UserPopUp';
import { useWindowDimensions } from 'react-native';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: isLargeScreen ? null : { width: '85%' }
      }}
      drawerContent={(props) => <UserPopUp {...props}/>}
    >
      <Drawer.Screen name="profile" component={ProfilePage} options={{headerShown : false}}/>
      {/* <Drawer.Screen name="popUp" component={UserPopUp} options={{headerShown : false }}/> */}
    </Drawer.Navigator>
  )
}

export default DrawerNavigator