import React, { useState } from 'react'
import { View  ,StyleSheet , Text , Button , Image , Pressable} from 'react-native'
import InputWithText from '../components/InputWithText'
import BackButton from '../components/BackButton'
import CheckBox from '../components/CheckBox'
import LinearGradient from 'react-native-linear-gradient';
import {useRealm , useQuery} from '@realm/react';
import {Users} from '../Database/models/UsersSchema';
import useUserStore from '../state/Users'
// import { useUserStore } from '../state/Users'


const CreateAccounts = ({navigation}) => {
    const {name , nickname , email , setUser} = useUserStore();
    // console.log(getUser);
    // console.log("y" ,useQuery);
    const realm = useRealm();
    // const users = useQuery(Users);
    const [checked , setChecked] = useState(false);
    const [data , setData]  = useState(['' , '' , '']);

    const [error1 , setError1] = useState('');
    const [error2 , setError2] = useState('');

    const [error3 , setError3] = useState('');
    // const setUserState = useUserStore((state) => state.setUser({name : data[0] , nickname : data[1] , email : data[2]}));

    // const setCurUserFalse = async (data) => {
      
    //     console.log('Done.')
    // }

    // const findAndUpdateCurActive = ()=>{
    //     const toUpdate = realm
    //   .objects(Users)
    //   .filtered('active == $0', true);
    // //   console.log('toUpdate' ,toUpdate)
    //   if(toUpdate.length == 1){
    //     realm.write(() => {
    //         toUpdate[0].active = false;
    //         });
    //   }
        
    // }

    // const setUser =  (data)=>{
        // realm.write(() => {
        //     realm.create(Users, {
        //         _id: new BSON.ObjectId(),
        //         name: data[0],
        //         nickname : data[1],
        //         email : data[2],
        //         active : true,
        //         passcode : ''
        //     });
        //   });
    // }

    // const getUser = ()=>{
        
    //     console.log(users);
    // }
        
          

        // console.log(useUserStore);
    const handleSubmit = ()=>{
        // setUserState();
        setUser({name : data[0] , nickname : data[1] , email : data[2]})
        console.log(name , nickname , email);
        // getUser();
        // console.log(user);
        // findAndUpdateCurActive();
        // setUser(data);
        // getUser();
        navigation.navigate('setPasscode')

    }

    const handleInputs =  (index , changedData)=>{
        data[index] = changedData;
        setData(data);
    //     console.log(data);
    }

    const nameCheck = (name) =>{
        const regex = /[0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
        // console.log(!regex.test(name));
        return !regex.test(name);
    }

    function isValidGmail(email) {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const isEmailValid = gmailRegex.test(email);
        if(isEmailValid){
            // console.log("z" , data[2]);
            const existingUser = realm.objects(Users).filtered('email == $0' , data[2]);
            // console.log("y" ,existingUser );
            return existingUser.length === 0;
        }
        return false;
      }

      const handleError = (index ,err)=>{
            if(index == 0)
                setError1(err);
            else if(index == 1)
                setError2(err);
            else
                setError3(err);
            // console.log(error);
      }

  return (
    <LinearGradient style={{flex : 1}}  colors={['#C5E3DC', '#F6F6EC']} >
    <View style={styles.container}>
        <BackButton style={styles.image} navigation={navigation}/>

        {/* <Pressable onPress={()=>navigation.navigate('signUp')}>
            <Image onPress={()=> navigation.navigate('signUp')} style={styles.image} source={require('../rcs/lArrow.png')} />
        </Pressable> */}
        <View style = {styles.top}>
            <Text style={styles.heading}>Create Account</Text>
            <View style={styles.inputscontainer}>
                <InputWithText handleError={handleError} text='Name' required={true} handleInputs={handleInputs} id={0} errorText='you cannot include Symbols or Numbers' validationFun={nameCheck}/>
                <InputWithText handleError={handleError} text='Nickname' required={false} handleInputs={handleInputs} id={1} errorText='you cannot include Symbols or Numbers' validationFun={nameCheck}/>
                <InputWithText handleError={handleError} text='Email Address' required={true} handleInputs={handleInputs} id={2} errorText='Invalid email' validationFun={isValidGmail}/>
            </View>
        </View>
        <View style={styles.bottom}>
            <View style={styles.cBoxContainer}>
                {/* <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                onCheckColor = "orange"
                /> */}
                <CheckBox setChecked={setChecked}/>
                <Text>Tick this box to confirm that you are at least 18 years old and agree to our <Text style={checked && styles.TandC}> Terms & conditions</Text></Text>
            </View>
            <Button onPress={handleSubmit}  style={styles.button} title="Continue" disabled={ !checked || error1 || error2 || error3}/>


        </View>
    </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        // backgroundColor: '#D0EAEA',       
    },inputscontainer : {
        flex : 0.8,
        justifyContent : 'space-around',
    },image :{
        margin : 20
    },
    top :{
        flex : 0.8,
        marginTop :20,
        marginLeft : 20
        // alignItems : 'center'
    },
    heading :{
        fontSize : 30,
        color : 'black',
        
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
    },bottom : {
        backgroundColor : 'white',
        flex : 0.2,
        alignItems : 'center'
    },
    cBoxContainer : {
        marginBottom : 10,
        marginTop : 10,
        padding : 5,
        flexDirection : 'row',
        alignItems : 'center',
        padding : 5,
        
        // backgroundColor : "black"
    },TandC : {
        color : "#B84646"
    },button : {
        paddingLeft: 20 ,
        paddingHorizontal : 20
    }


})

export default CreateAccounts