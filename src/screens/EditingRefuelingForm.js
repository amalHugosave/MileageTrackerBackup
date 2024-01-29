import React from 'react'
import { View ,Text ,StyleSheet ,TextInput ,Button , Pressable} from 'react-native'
import HeaderWithBackbutton from '../components/HeaderWithBackbutton'
import TextWith2Inputs from '../components/TextWith2Inputs';
import RNPickerSelect from 'react-native-picker-select';
import { Vehicles } from '../Database/models/VehiclesSchema';
import useUserStore from '../state/Users';
import useVehicleStore from '../state/Vehicles';
import { useQuery, useRealm } from '@realm/react'
import{ useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { Refueling } from '../Database/models/RefuelingSchema';
import { BSON } from 'realm';
const RefuelingForm = ({navigation , route}) => {
    const realm = useRealm();
    const {id} = useUserStore();
    const {vehId} = useVehicleStore();
    const {info} = route.params
    const [data , setData] = useState({  odometerStart :info.odometerStart , odometerEnd : info.odometerEnd , fuelConsumed : info.fuelConsumed , price : info.price});
    const [date , setDate] = useState(info.date)
    const [open, setOpen] = useState(false);
    // console.log(info);


    const handleData = (type , payload)=>{
        if(type == 'date'){
            setDate(payload);
        }
    }


    const navigateToRefueling = ()=>{
        navigation.navigate('refuelingInfo');
    }

    const getOdometerData = (value)=>{
        setData((curdata)=> {
            return {...curdata , odometerStart : parseInt(value[0])}
        });
        setData((curdata)=> {
            return {...curdata , odometerEnd : parseInt(value[1])}
        });
    }

    const getFuelData = (value)=>{
        setData((curdate)=>{
            return {...curdate , fuelConsumed : parseFloat(value[0])}
        });
        setData((curdate)=>{
            return {...curdate , price : parseFloat(value[1])}
        });
    }

    const handleSubmit = ()=>{
        const toUpdate = realm.objects(Refueling).filtered('_id == $0' , info._id)[0];
        realm.write(()=>{
            toUpdate.date = date,
            toUpdate.odometerStart = data.odometerStart
            toUpdate.odometerEnd = data.odometerEnd
            toUpdate.price = data.price
            toUpdate.fuelConsumed = data.fuelConsumed
            toUpdate.curdata = new Date();
        })

        navigation.navigate('refuelingInfo');
    }


  return (
    <View style={styles.container}>
        <View style={styles.top}>
            <HeaderWithBackbutton handlePress={navigateToRefueling}/>
            <Text style={styles.heading}>Edit Refuelling Record</Text>
        </View>
        

        <View style={styles.middle}>
            <Pressable onPress={()=>setOpen(true)} style={styles.input}>
                <Text>{date ? moment(date).format('DD/MM/YYYY') : 'Refueling Date'}</Text>
            </Pressable>
            <DatePicker
                modal
                open={open}
                date={data.date || new Date}
                mode='date'
                onConfirm={(date) => {
                    setOpen(false)
                    handleData('date' , date);
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <TextWith2Inputs values={[data.odometerStart , data.odometerEnd]} getData={getOdometerData} heading = "Odometer" inp1='Start reading'  inp2 ='End reading'/>
            <TextWith2Inputs values={[data.fuelConsumed , data.price]} getData={getFuelData} heading = "Fuel" inp1='Consumed (in L)'  inp2 ='Price (in S$)'/>

            {/* <InputWithText /> */}

        </View>

        <View style={styles.bottom}>
            <Button onPress={()=>navigation.goBack()} title="Cancel" />
            <Button onPress={handleSubmit} disabled={!date || !data.odometerStart || !data.odometerEnd || !data.price || !data.fuelConsumed || data.odometerStart >= data.odometerEnd} color="#0B3C58" title="Edit" />

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center'
    },top:{
        flex : 0.2
    },
    heading : {
        textAlign:'center',
        fontSize : 22,
        color : 'black'
    },middle :{
        alignItems : 'center',
        flex : 0.75
    },input : {
        width : 300,
        backgroundColor: 'white',
        padding : 10,
        borderRadius : 4,
        marginVertical : 25
    },
    bottom :{
        // flex : 0.1,
        position : 'absolute',
        bottom : 40,
        backgroundColor : 'yellow',
        flexDirection : 'row',
        alignItems : 'cneter',
        // left : 0
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        // marginLeft : 40,
        marginTop : 20,
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
      backgroundColor : 'white',
      width : 300,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        // marginLeft : 40,
        marginTop : 20,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black',
      backgroundColor : 'white',
      width : 300,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

export default RefuelingForm