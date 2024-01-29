import React from 'react'
import { StyleSheet, View ,Text , Button , Image } from 'react-native'
const AddVehicle = ({  handlePress}) => {
  return (
    <View style={styles.container}>
            <Image source={require('../rcs/dummyVehicle.png')} />
            <Text style={styles.vehAdd}>Add vehicles to start tracking its fueling and performance</Text>
            <Button onPress={handlePress} title= "Add Vehicle"/>
    </View>
  )
}

const styles = StyleSheet.create({
    vehAdd : {
        textAlign : 'center',
        fontSize : 15,
        marginTop : 5,
        marginBottom : 5,
        color : '#0B3C58',
        marginTop : 20,
        marginBottom : 10
    },container : {
      alignItems : 'center'
    }
})

export default AddVehicle