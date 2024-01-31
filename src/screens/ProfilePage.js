import { useQuery, useRealm } from '@realm/react'
import React, { useEffect, useState } from 'react'
import { View ,Image, StyleSheet,Text ,Button , ScrollView, Pressable } from 'react-native'  
import useUserStore from '../state/Users';
import { Vehicles } from '../Database/models/VehiclesSchema';
import HomePageNoVehicles from '../components/HomePageNoVehicles';
import HomePageWithVehicles from '../components/HomePageWithVehicles';
import LinearGradient from 'react-native-linear-gradient';
const ProfilePage = ({navigation}) => {
    const {name , nickname , id} = useUserStore();
    const [userVehicles , setUserVehicles] = useState([]);
    const AllVehicles = useQuery(Vehicles);
    const realm = useRealm();

    const getUserVehicles = ()=>{
        const curUserVehicles = realm.objects(Vehicles).filtered('userId == $0' , id);
        setUserVehicles(curUserVehicles);
    }
    useEffect(() =>{
        getUserVehicles();
    } ,[AllVehicles])


    const    addVehicles = ()=>{
        navigation.navigate('vehicles',{screen : 'addVehiclesForm'});
    }
    // const navigateToPopUp = ()=>{
    //     navigation.navigate('popUp');
    // }
    

  return (
    <LinearGradient style={{flex : 1}}  colors={['#C5E3DC', '#F6F6EC']} >
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() =>navigation.openDrawer()}>
                    <Image source={require('../rcs/dummyProfile.png')}/>
                </Pressable>
                <Image style={styles.image2} source={require('../rcs/logo2.png')}/>
            </View>
            <View style={styles.medium}>
                <Text style={styles.greeting}>Hi {nickname || name}</Text>
                
            </View>
            {
            userVehicles.length !== 0  ? (
                <HomePageWithVehicles vehiclesData={userVehicles} navigation={navigation}/>
                ) :(
                    <HomePageNoVehicles handlePress={addVehicles}/>


                )
    }
        </ScrollView>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
    container : {
    
        // backgroundColor: '#D0EAEA',  
 
    },
    header : {
        flexDirection : "row",
        marginTop : 30,
        marginLeft : 20
    },image2 : {
        marginLeft : 130
    },greeting : {
        color : "crimson",
        fontSize : 30,

    },medium :{
        alignItems : 'center',
        padding : 20,
        // width : Dimensions.get('window').width
    }
})

export default ProfilePage