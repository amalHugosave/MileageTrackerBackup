import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'

const CommonButton = ({text , handlePress ,disabled , parentStyles}) => {
    console.log(disabled);
  return (
    <TouchableOpacity style={[disabled ? styles.containerIsDisabled :styles.containerNotDisabled , styles.container , parentStyles]} onPress={disabled ? ()=>{} : handlePress}>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container :{
        paddingVertical : 16,
        paddingHorizontal : 20,
        borderRadius : 8
        
    },
    containerNotDisabled : {
        backgroundColor : '#0B3C58',
    },containerIsDisabled :{
        backgroundColor : '#B0B0B0'
    },text :{
        color :'white',
        textAlign : 'center',
        fontWeight: 'bold'
    }
})

export default CommonButton