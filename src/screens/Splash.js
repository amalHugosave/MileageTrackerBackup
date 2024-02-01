import React, { useEffect } from 'react'
import { View ,Text , StyleSheet , Image} from 'react-native'
// import { useEffect } from 'react'
const logo = require('../rcs/logo.png')
const Splash = ({navigation}) => {

  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('signUp');
    } , 2000)
  } , [])
  return (
    <View style={styles.container}>
        <Image source={logo} />    
    </View>
  )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor:'#F55858',
        justifyContent: 'center',
        alignItems : 'center'
    }
})

export default Splash