import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import ProfilePage from '../screens/ProfilePage';
import UserPopUp from '../components/UserPopUp';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <></>
    // <Drawer.Navigator>
        // {/* <Drawer.Screen name ="profile" component={ProfilePage} />
        // <Drawer.Screen name ="popUp" component={UserPopUp} /> */}
    // </Drawer.Navigator>
  )
}

export default DrawerNavigator