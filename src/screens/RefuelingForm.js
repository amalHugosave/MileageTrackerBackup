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
import DoubleButton from '../components/Buttons/DoubleButton';
const RefuelingForm = ({navigation }) => {
    const realm = useRealm();
    const {id} = useUserStore();
    const {vehId} = useVehicleStore();
    const [userVehicles , setUserVehicles] = useState([]);
    const AllVehicles = useQuery(Vehicles);
    const [data , setData] = useState({vehId ,  odometerStart :null , odometerEnd : null , fuelConsumed : null , price : null});
    const [date , setDate] = useState('')
    const [open, setOpen] = useState(false);
    const refuelingData = useQuery(Refueling);
    
    useEffect(()=>{
        getUserVehicles();
    },[vehId , AllVehicles]);

    const getUserVehicles = ()=>{
        const curVehiclesOfUser = realm.objects(Vehicles).filtered('userId == $0' , id);
        let arr = [];
        curVehiclesOfUser.map((veh)=>{
            arr.push({label : veh.name , value : veh._id});
            if(veh._id.equals(vehId)){
                arr[arr.length - 1] = arr[0];
                arr[0] = {label : veh.name , value : veh._id};
            }
            
        })
        setUserVehicles(arr);
    }

    const handleData = (type , payload)=>{
        if(type === 'vehicle'){
            setData({...data , vehId : payload});
        }else if(type == 'date'){
            console.log(typeof(payload))
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
        console.log(parseInt(value[0]));
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
        realm.write(()=>{
            realm.create(Refueling , {
                _id : new BSON.ObjectId(),
                ...data ,
                date,
                userId : id,
                curDate : new Date()
            })
        })

        navigation.navigate('refuelingInfo')
    }

    console.log(refuelingData);
    // console.log(date);


  return (
    <View style={styles.container}>
        <View style={styles.top}>
            <HeaderWithBackbutton handlePress={navigateToRefueling}/>
            <Text style={styles.heading}>Add Refuelling Record</Text>
        </View>
        

        <View style={styles.middle}>
            <RNPickerSelect
                style={{...pickerSelectStyles}}
                placeholder={{}}
                onValueChange={(value) => {}}
                items={userVehicles}
            />
            
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
            <TextWith2Inputs getData={getOdometerData} heading = "Odometer" inp1='Start reading'  inp2 ='End reading'/>
            <TextWith2Inputs getData={getFuelData} heading = "Fuel" inp1='Consumed (in L)'  inp2 ='Price (in S$)'/>

            {/* <InputWithText /> */}

        </View>

        <View style={styles.bottom}>
            <DoubleButton textHollow ="Cancel" handlehollowPress={()=>navigation.navigate('refuelingInfo')} handleSolidPress={handleSubmit}
              solidDisabled = {!date || !data.odometerStart || !data.odometerEnd || !data.price || !data.fuelConsumed || data.odometerStart >= data.odometerEnd}
            textSolid='Add'
          />
            {/* <Button onPress={()=>navigation.navigate('refuelingInfo')} title="Cancel" />
            <Button onPress={handleSubmit} disabled={!date || !data.odometerStart || !data.odometerEnd || !data.price || !data.fuelConsumed || data.odometerStart >= data.odometerEnd} color="#0B3C58" title="Add" /> */}

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