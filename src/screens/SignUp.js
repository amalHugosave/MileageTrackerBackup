import React from 'react'
import { StyleSheet, View , Text , Image , Button} from 'react-native'
import SVGImg from '../rcs/signupFooter.svg';
import LinearGradient from 'react-native-linear-gradient';
import CommonButton from '../components/Buttons/CommonButton';
const SignUp = ({navigation}) => {
  return (
    <LinearGradient style={{flex : 1}}  colors={['#C5E3DC', '#F6F6EC']} >
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../rcs/logo.png')} />
            <Text style={styles.text1}>Mileage Tracker</Text>
            <Text style={styles.text2}>Create an Account to get Started</Text>
            <CommonButton parentStyles={styles.button} text="Sign Up" handlePress={()=>navigation.navigate('createAccount')}/>
        </View>
        <Text style={styles.bot}>
        Track your miles towards a prosperous financial journey!
        </Text>
        <View>
            <Image source={require('../rcs/signupFooter.png')}/>
        </View>
    </View>
    </LinearGradient>
    
  )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        // backgroundColor: '#D0EAEA',
        
    },
    header :{
        marginTop : 50,
        justifyContent : 'center',
        alignItems : 'center',
        flex : 1
    },
    button : {
        width : '70%',
        marginTop : 30
    },
    text1 :{
        color : '#FF4E4E',
        fontSize : 20
    },
    text2 :{
        marginTop : 20,
        fontSize : 20
    },bot :{
        position : 'absolute',
        fontSize : 22,
        bottom : 50,
        zIndex : 1,
        color : '#0B3C58',
        textAlign : 'center',
        padding : 10,
        width : '100%'
    }

})

export default SignUp