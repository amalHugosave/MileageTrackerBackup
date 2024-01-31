import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, Text } from 'react-native'
const LogoutButton = ({pressHandle}) => {
  // console.log(presshandle)
  return (
    <TouchableOpacity style={styles.container} onPress={pressHandle}>
        <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
text :{
        color : 'white',
        textAlign : 'center'
    },
    container :{
      backgroundColor :'#F93333',
      padding : 15,
      borderRadius : 8
    }
})

export default LogoutButton