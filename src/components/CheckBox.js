import React, { useState } from 'react'
import { StyleSheet, Pressable ,Text} from 'react-native'


const CheckBox = ({setChecked}) => {

    const [marked , setmarked] = useState(false);
    const handlePress = ()=>{
        // console.log(marked);
        setmarked((val)=>!val)
        setChecked((val)=>!val)
    }

    
  return (
    <Pressable onPress={handlePress} style={[styles.container ,marked && styles.checked ]}>
        <Text style={styles.text}>✓</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container : {
        padding : 0,
        borderColor : 'black',
        borderWidth : 2,
        borderRadius : 3,
        marginRight: 5,
    },checked : {
        backgroundColor : 'orange',
        borderColor : 'orange'
    },text : {
        color : 'white',
    }
})

export default CheckBox