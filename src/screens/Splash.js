import React from 'react'
import { View ,Text , StyleSheet , Image} from 'react-native'

const logo = require('../rcs/logo.png')
const Splash = () => {
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