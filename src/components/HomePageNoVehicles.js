import React from 'react'
import { StyleSheet, View ,Text } from 'react-native'
import AddVehicle from './AddVehicle'
const HomePageNoVehicles = ({handlePress}) => {
  return (
    <View>
        <Text style={styles.welcome}>Track your miles towards a prosperous financial journey!</Text>    
        <AddVehicle handlePress={handlePress}  />
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
    }
})

export default HomePageNoVehicles