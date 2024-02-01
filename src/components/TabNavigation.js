import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilePage from '../screens/ProfilePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native';
import { Image } from 'react-native-svg';
import AddVehiclesForm from '../screens/AddVehiclesForm';
import Vehicles from '../screens/VehiclesInfo';
import VehiclesNav from '../navigators/VehiclesNav';
import RefuelingNav from '../navigators/RefuelingNav';
import PerformancePage from '../screens/PerformancePage';
import DrawerNavigator from '../navigators/DrawerNavigator';
import { Home  ,Calendar , Filter , Zap} from "react-native-feather";
const Tab = createBottomTabNavigator();
const feather = require('feather-icons');


  const getTabBarIcon = (routeName, focused) => {
    let color='white' , color2 = 'white';
  
    switch (routeName) {
      case 'Home':
        color = focused ? '#0B3C58' : 'white'
        color2 = !focused ? '#0B3C58' : '#DDDDDD'
        return <Home stroke={color2} strokeWidth={1} fill={color} width={24} height={24}/>
        break;
      case 'Refueling':
        color = focused ? '#0B3C58' : 'white';
        color2 = !focused ? '#0B3C58' : '#DDDDDD'
        return <Filter stroke='#0B3C58' strokeWidth={1} fill={color} width={24} height={24}/>
        break;
      case 'Performance':
        color = focused ? '#0B3C58' : 'white';
        color2 = !focused ? '#0B3C58' : '#DDDDDD'
        return <Calendar stroke={color2} strokeWidth={1} fill={color} width={24} height={24}/>
        break;
      case 'Vehicles':
        color = focused ? '#0B3C58' : 'white';
        color2 = !focused ? '#0B3C58' : '#DDDDDD'
        return <Zap stroke='#0B3C58' strokeWidth={1} fill={color} width={24} height={24}/>
        break;
  
      default:
        break;
    }
}

const TabNavigation = () => {
  return (
         <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
          tabBarLabel: ({ focused }) => {
            return <Text style={{fontSize: 11, fontWeight: focused ? 'bold' : 'normal' , color: focused ? '#0B3C58' : '#58798C'}}>{route.name}</Text>
          }
          // tabBarLabelStyle: ({ focused }) => ({
          //   color: '#58798C', // Change color based on focus
          //   fontSize: 11, // Change font size based on focus
          //   fontWeight: focused ? 'bold' : 'normal', // Change font weight based on focus
          // })
        })}>
            <Tab.Screen  name="Home" component={DrawerNavigator}  options={{headerShown : false}}/>
            <Tab.Screen name="Refueling" component={RefuelingNav} options={{headerShown : false,}}/>
            <Tab.Screen name="Performance" component={PerformancePage} options={{headerShown : false}}/>
            <Tab.Screen name="Vehicles" component={VehiclesNav } options={{headerShown : false }}/>
            
         </Tab.Navigator>
  )
}

export default TabNavigation