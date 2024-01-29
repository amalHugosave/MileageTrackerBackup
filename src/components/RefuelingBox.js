import React from 'react'
import { StyleSheet, View ,Text ,ScrollView, Dimensions} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import RefuelingCard from './RefuelingCard';
const RefuelingBox = ({data , navigation}) => {
    const today = moment();
  return (
    <View style={styles.container}>
        <View>
            <RNPickerSelect
                style={{...pickerSelectStyles}}
                placeholder={{}}
                onValueChange={(value) => {handleSelectChange(value)}}
                items={{label : 'Last 30 Days'}}
            />
            <Text style={styles.heading}>{data.length} Records | {today.subtract(30 , 'days').format('DD/MMM/YY')} - Today</Text>
        </View>

        <ScrollView style={styles.refuelingDataBox}>
            {
                data.map((el , index)=>
                    <RefuelingCard key={index} data={el} navigation={navigation}/>
                )
            }
        </ScrollView>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        width : Dimensions.get('window').width,
        paddingHorizontal : 30
    },heading :{
        textAlign : 'center'
    },refuelingDataBox : {
        marginTop : 30
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginLeft : 82,
        marginVertical : 10,

      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
      backgroundColor : 'white',
      width : 175,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginLeft : 82,
       marginVertical : 10,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black',
      backgroundColor : 'white',
      width : 175,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

export default RefuelingBox