import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import PasscodeEntry from '../components/PasscodeEntry1'
import { StyleSheet , Text} from 'react-native'
import { useState } from 'react'
import useUserStore from '../state/Users'
import { useNavigation } from '@react-navigation/native'
import { useRealm } from '@realm/react'
import { Users } from '../Database/models/UsersSchema'
import useVehicleArrayStore from '../state/VehiclesArray'
import { Vehicles } from '../Database/models/VehiclesSchema'
const CheckPassCode = ({user}) => {
    // console.log(route , "route")
    // const [actualUser , setUserState] = useState(route ?user : route.params.user);
    
    const realm = useRealm();
    const navigation = useNavigation();
    const {setUser}  = useUserStore();
    const [data , setData] = useState("");
    const {addVehicle} = useVehicleArrayStore();
    useEffect(()=>{
        submit();
    }, [data]);

    

    const validate = ()=>{
        console.log(data)
        console.log(user.passcode)
        for(let i = 0;i<4;i++){
            if(data[i] !== user.passcode[i])
                return false;
        }
        return true;
    }

    const submit = ()=>{
        if(data.length == 4 && validate()){
            realm.write(()=>{
                const toUpdate = realm.objects(Users).filtered("_id == $0" ,user._id);
                toUpdate[0].active = true;
            })
            setUser({name : user.name , id : user._id , nickname : user.nickname , passcode : user.passcode , email : user.email});
            const vehicles = realm.objects(Vehicles).filtered('userId = $0', id);
            addVehicle(vehicles)
            navigation.navigate('tabNavigation');
        }
    }

    const getData = (curData)=>{
        setData(curData);
    }
    // console.log(actualUser, " user")
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