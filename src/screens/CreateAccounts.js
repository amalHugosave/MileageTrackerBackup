import React, { useState } from 'react'
import { View  ,StyleSheet , Text , Button , Image , Pressable} from 'react-native'
import InputWithText from '../components/InputWithText'
import BackButton from '../components/BackButton'
import CheckBox from '../components/CheckBox'
import LinearGradient from 'react-native-linear-gradient';
import {useRealm , useQuery} from '@realm/react';
import {Users} from '../Database/models/UsersSchema';
import useUserStore from '../state/Users'
import CommonButton from '../components/Buttons/CommonButton'
// import { useUserStore } from '../state/Users'


const CreateAccounts = ({navigation}) => {
    const {name , nickname , email , setUser} = useUserStore();
    const realm = useRealm();
    const [checked , setChecked] = useState(false);
    const [data , setData]  = useState(['' , '' , '']);
    const [error1 , setError1] = useState(true);
    const [error2 , setError2] = useState('');
    const [error3 , setError3] = useState(true);

    const handleSubmit = ()=>{
        setUser({name : data[0] , nickname : data[1] , email : data[2]})
        navigation.navigate('setPasscode')

    }

    const handleInputs =  (index , changedData)=>{
        data[index] = changedData;
        setData(data);
    }

    const nameCheck = (name) =>{
        const regex = /[0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
        return !regex.test(name);
    }

    function isValidGmail(email) {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const isEmailValid = gmailRegex.test(email);
        if(isEmailValid){
            const existingUser = realm.objects(Users).filtered('email == $0' , data[2]);
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
      }
      console.log(error3 , "error 3")
  return (
    <LinearGradient style={{flex : 1}}  colors={['#C5E3DC', '#F6F6EC']} >
    <View style={styles.container}>
        

        <View style = {styles.top}>
            <BackButton style={styles.image} navigation={navigation}/>
            <Text style={styles.heading}>Create Account</Text>
            <View style={styles.inputscontainer}>
                <InputWithText handleError={handleError} text='Name' required={true} handleInputs={handleInputs} id={0} errorText='you cannot include Symbols or Numbers' validationFun={nameCheck}/>
                <InputWithText handleError={handleError} text='Nickname' required={false} handleInputs={handleInputs} id={1} errorText='you cannot include Symbols or Numbers' validationFun={nameCheck}/>
                <InputWithText handleError={handleError} text='Email Address' required={true} handleInputs={handleInputs} id={2} errorText='Invalid email' validationFun={isValidGmail}/>
            </View>
        </View>
        <View style={styles.bottom}>
            <View style={styles.cBoxContainer}>
                <CheckBox setChecked={setChecked}/>
                <Text>Tick this box to confirm that you are at least 18 years old and agree to our<Text style={checked && styles.TandC}> Terms & conditions</Text></Text>
            </View>
            <CommonButton parentStyles={styles.button} handlePress={handleSubmit} text="Continue" disabled={ !checked || error1 || error3 || error2}/>
            

        </View>
    </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        flexDirection:'column',
        justifyContent : 'space-between'
    },inputscontainer : {
        justifyContent : 'space-around',
        flex :0.9
    },image :{
        marginBottom : 50
    },
    top :{
        marginLeft : 30,
        marginTop : 20,
        // backgroundColor : 'red',
        // flex : 8
        height : "75%"
    },
    heading :{
        fontSize : 22,
        color : '#0B3C58',
        
    },
    bottom : {
        backgroundColor : 'white',
        // flex : 0.2,
        alignItems : 'center',
        paddingHorizontal : 20,
        paddingVertical : 10
    },
    cBoxContainer : {
        marginBottom : 10,
        marginTop : 10,
        flexDirection : 'row',
        alignItems : 'flex-start',
        justifyContent : 'center',
        
        // backgroundColor : "black"
    },TandC : {
        color : "#B84646"
    },button : {
        width : "80%"
    }


})

export default CreateAccounts