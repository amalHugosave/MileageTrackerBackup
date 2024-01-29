import React, { useState } from 'react'
import { View  ,StyleSheet, TextInput , Text} from 'react-native'

const InputWithText = ({text,required , handleInputs , id, errorText , validationFun , handleError}) => {
    const [error , setError] = useState(false);
    const onChangeInput = (text)=>{
        handleInputs(id , text);
        if(required && !text){
            errorText = 'text cannot be empty';
            setError(true);
            handleError(id ,true);
            return;
        }
        setError(!validationFun(text));
        // console.log("y" ,error, !validationFun(text));
        handleError(id ,!validationFun(text));
    }
  return (
    <View style ={styles.container}>
        <Text style={styles.InputText}>{text} {required && <Text style={styles.star}>*</Text>}</Text>
        <TextInput style={styles.input} onChangeText={onChangeInput}/>
        {error && <Text style={styles.error}>{errorText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    container :{
        marginLeft : 30,
    },
    input :{
        height: 40,
        margin: 4,
        borderWidth: 1,
        padding: 10,
        backgroundColor : 'white',
        borderRadius : 10,
        borderColor : 'white',
        width : 300
    },InputText :{
        color : 'black',
        fontSize : 15,
    },star :{
        color : 'crimson'
    },error :{
        color : 'crimson',
        marginTop : 5
    }

})

export default InputWithText