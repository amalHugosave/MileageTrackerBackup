import React from 'react'
import { View ,Image ,Text , Button, StyleSheet } from 'react-native'

const AddRefuelingData = ({handlePress}) => {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../rcs/clouds.png')}/>
        <Text style={styles.text}>it's time to add the refueling data to get more insights</Text>
        <Button color="#0B3C58" title="Add Refueling" onPress={handlePress}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    paddingTop : 30,
    alignItems :'center'
  },image : {
    marginBottom : 20
  },text : {
    fontSize : 20,
    marginHorizontal : 30,
    textAlign : 'center',
    marginBottom : 20
  }
})

export default AddRefuelingData