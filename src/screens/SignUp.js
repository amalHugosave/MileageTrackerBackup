import React from 'react'
import { StyleSheet, View , Text , Image , Button} from 'react-native'
import SVGImg from '../rcs/signupFooter.svg';
const SignUp = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../rcs/logo.png')} />
            <Text style={styles.text1}>Mileage Tracker</Text>
            <Text style={styles.text2}>Create an Account to get Started</Text>
            <Button title='Sign Up' style={styles.button} onPress={()=>navigation.navigate('createAccount')}/>
        </View>
        <View>
            <Image source={require('../rcs/signupFooter.png')}/>
        </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: '#D0EAEA',
        
    },
    header :{
        marginTop : 50,
        justifyContent : 'center',
        alignItems : 'center',
        flex : 1
    },
    button : {
        width : 20,
        backgroundColor : '#0B3C58',
        color : 'white',
        marginTop : 30
    },
    text1 :{
        color : '#FF4E4E',
        fontSize : 20
    },
    text2 :{
        marginTop : 20,
        fontSize : 20
    }

})

export default SignUp