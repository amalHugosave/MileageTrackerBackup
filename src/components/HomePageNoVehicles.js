import React from 'react'
import { StyleSheet, View ,Text } from 'react-native'
import AddVehicle from './AddVehicle'
const HomePageNoVehicles = ({handlePress}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>Track your miles towards a prosperous financial journey!</Text> 
        <View style={styles.addVehicleContainer}>
          <AddVehicle handlePress={handlePress}  />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    welcome : {
        fontSize : 17,
        textAlign : 'center',
        marginBottom : 80,
        paddingHorizontal : 20
    },bottom : {
        alignItems : 'center',
        // marginTop : 20
    },addVehicleContainer : {
      paddingHorizontal : 50
    }
    
})

export default HomePageNoVehicles