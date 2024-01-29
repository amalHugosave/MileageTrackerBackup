import React, { useState } from 'react'
import { StyleSheet, Pressable } from 'react-native'


const CheckBox = ({setChecked}) => {

    const [marked , setmarked] = useState(false);
    const handlePress = ()=>{
        // console.log(marked);
        setmarked((val)=>!val)
        setChecked((val)=>!val)
    }

    
  return (
    <Pressable onPress={handlePress} style={[styles.container ,marked && styles.checked ]}>
        
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container : {
        padding : 5,
        borderColor : 'black',
        borderWidth : 2,
        borderRadius : 3,
        margin : 5
    },checked : {
        backgroundColor : 'orange',
        borderColor : 'orange'
    }
})

export default CheckBox