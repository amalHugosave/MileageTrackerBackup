
import { useState } from 'react'
import { View ,TextInput, Text, StyleSheet} from 'react-native'

const TextWith2Inputs = ({heading , inp1 , inp2,getData , values}) => {
    let st1 = '' , st2 = ''
    if(values){
        st1 = values[0].toString()
        st2 = values[1].toString()
    }
    const [data , setData] = useState([st1 , st2]);

    const handleData= (action , payload)=>{
        if(action == 'inp1'){
            setData([payload , data[1]])
            getData([payload , data[1]]);
        }else{
            setData([data[0] , payload]);
            getData([data[0] ,payload ]);
        }
    }
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>{heading}</Text>
        <View style={styles.inputsContainer}>
            <TextInput value={ data[0]} keyboardType='numeric' onChangeText={(text)=>handleData('inp1' , text)} style={styles.input} placeholder={inp1}/>
            <TextInput value={data[1]} keyboardType='numeric' onChangeText={(text)=>handleData('inp2' , text)} style={styles.input} placeholder={inp2}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container :{
        marginBottom : 20,
        width : 300
    },heading : {
        fontSize : 15,
        color : 'black'
    },input : {
        backgroundColor : 'white',
        width : 144,
        borderRadius : 4,
        padding : 10
    },inputsContainer : {
        flexDirection : 'row',
        marginTop:10,
        justifyContent : 'space-between'

    }
})

export default TextWith2Inputs