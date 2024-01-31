import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import PasscodeEntry from '../components/PasscodeEntry1'
import { StyleSheet , Text} from 'react-native'
import { useState } from 'react'
import useUserStore from '../state/Users'
import { useNavigation } from '@react-navigation/native'
const CheckPassCode = ({user}) => {
    const navigation = useNavigation();
    const {setUser}  = useUserStore();
    const [data , setData] = useState("");
    useEffect(()=>{
        submit();
    }, [data]);


    const validate = ()=>{
        for(let i = 0;i<4;i++){
            if(data[i] !== user.passcode[i])
                return false;
        }
        return true;
    }

    const submit = ()=>{
        if(data.length == 4 && validate()){
            setUser({name : user.name , id : user._id , nickname : user.nickname , passcode : user.passcode , email : user.email});
            navigation.navigate('tabNavigation');
        }
    }

    const getData = (curData)=>{
        setData(curData);
    }
    // console.log(user)
  return (
    <LinearGradient style={{flex : 1}}  colors={['#C5E3DC', '#F6F6EC']} >
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Welcome back!</Text>
            <PasscodeEntry getData={getData} heading="Enter your 4-Digit Passcode" isfocused={true} subtitle="Just checking it's really you!"/>
        </SafeAreaView>
    </LinearGradient>
  )
}


const styles = StyleSheet.create({
    heading : {
        fontSize : 22,
        marginTop : 100,
        fontWeight : 'bold',
        marginBottom : 20,
        color : '#0B3C58'
    },container : {
        padding : 15
    }
})

export default CheckPassCode