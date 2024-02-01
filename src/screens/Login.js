import React from 'react'
import { View ,Image , Text, StyleSheet, Pressable } from 'react-native'
import {useRealm , useQuery} from '@realm/react';
import {Users} from '../Database/models/UsersSchema'
import UserCard from '../components/UserCard';
import useUserStore from '../state/Users';
import LinearGradient from 'react-native-linear-gradient';
import { Vehicles } from '../Database/models/VehiclesSchema';
import useVehicleArrayStore from '../state/VehiclesArray';
// import { useQuery } from '@realm/react';

const sampleUser = require('../rcs/sampleUser.png');
const addUser = require('../rcs/AddUser.png');
const Login = ({navigation}) => {
    const realm = useRealm();
    const users = useQuery(Users);
    const {setUser} = useUserStore()
    const {addVehicle} = useVehicleArrayStore();

    const goToHomePage = (data)=>{
        if(data.passcode)
            navigation.navigate('checkPasscodeContainer' ,{user :data})
        else{
            setUser({name : data.name , id : data._id , nickname : data.nickname , passcode : data.passcode , email : data.email});
            realm.write(()=>{
                toUpdate = realm.objects(Users).filtered('_id == $0' , data._id)[0];
                toUpdate.active = true;
            })
            navigation.navigate('tabNavigation');
            
            const vehicles = realm.objects(Vehicles).filtered('userId == $0' , data._id);
            addVehicle(vehicles);
        }
    }

    const goToCreateAccount = (data)=>{
        navigation.navigate('createAccount');  
    }
  return (
    <LinearGradient style={{flex : 1}}  colors={['#C5E3DC', '#F6F6EC']} >
        <View style={styles.container}>
            <View style={styles.top}>
                <Image source={require('../rcs/logo.png')} />
                <Text style={styles.heading}>Mileage Tracker</Text>
            </View >
                <View style={styles.bottom}>
                    <Text style={styles.bottomHeading}>Who are you?</Text>

                    <View style={styles.userContainer}>
                        {
                            users.map((user , index)=>(<UserCard key={index} image ={sampleUser} data={user} handlePress={goToHomePage} />))
                        }
                            <UserCard image={addUser} data={{name : 'Add User'}} handlePress={goToCreateAccount}/>  

                    </View>
                </View>
            <View>

            </View>
        </View>
        </LinearGradient>
  )
}


const styles = StyleSheet.create({
    container : {
        // backgroundColor :  '#D0EAEA',
        flex : 1
    },top : {
        marginTop : 25,
        alignItems : 'center',
        flex : 0.6
    },heading : {
        fontSize : 30,
        color : '#FF4E4E',
        paddingTop : 15
    },bottom : {
        flex : 0.3,
        alignItems : 'center'
    },bottomHeading : {
        textAlign : 'center',
        fontSize : 24
    },userContainer : {
        width : 280,
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'space-evenly',
        marginTop : 20
        // backgroundColor : 'yellow'
    }
})


export default Login