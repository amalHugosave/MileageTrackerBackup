import React, { useRef, useState } from 'react'
import { View  , StyleSheet, TextInput, Text  } from 'react-native'
import PasscodeIput from './PasscodeInput';

const passcode = ['' , '' ,'' ,''];
const PasscodeEntry = ({getData,heading , subtitle ,isfocused, handleFullFill}) => {
// console.log(getData);



  return (
    <View style={styles.container} >
            <Text style={styles.passHeading}>{heading} <Text style = {styles.star}>*</Text></Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                <PasscodeIput  isfocused={isfocused} getData={getData} handleFullFill={handleFullFill}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        marginBottom : 15
    },
 passHeading : {
        fontSize : 20,
        color : '#0B3C58',
        marginBottom : 5
    },star :{
        color : 'crimson'
    },input : {
        backgroundColor : 'white',
        flex : 1,
        padding : 10,
        alignItems : 'center',
        margin : 10,
        textAlign : 'center',
        borderRadius : 5
    },inputContainer : {
        flexDirection : 'row',
        justifyContent : 'space-around'
    },subtitle : {
        marginBottom : 10,
        color : '#6D8A9B'
    }
})

export default PasscodeEntry