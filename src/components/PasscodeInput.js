import React from 'react'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {StyleSheet , View} from 'react-native'
export default class PasscodeInput extends React.Component {
    state = {
        code: '',
        password: '',
      };

    pinInput  = React.createRef()
    // _checkCode = (code) => {
    //     if (code != '1234') {
    //       this.pinInput.current.shake()
    //         .then(() => this.setState({ code: '' }));
    //     }
    //   }
  render(){
    const {code , password} = this.state
    // console.log(this.)
    return (
        <View style={styles.container}>
        <SmoothPinCodeInput password
        autoFocus={this.props.isfocused}
        maskDelay={1000}
        mask="X"
        textStyle={{
            fontSize: 24,
            color: 'black',
            // fontWeight : 'bold'
          }}
            cellStyle={{
            backgroundColor  : "white",
            borderRadius : 5,
            marginRight : 10,
            marginLeft : 10,
            
            // padding : 30
        }}
        //     containerStyle={{
        //         // // alignItems : 'space-center'
        //         // justifyContent : 'space-around'
        //     }}
            ref={this.pinInput}
            value={code}
            onTextChange={code => {
              this.setState({ code })
              this.props.getData(code);
            }}
            onFulfill={(data)=>{
              {this.props.handleFullFill && this.props.handleFullFill(this)};
            }}
            onBackspace={() => console.log('No more back.')}
        />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        alignItems : 'center'
    },
    cellStyle : {
        backgroundColor : "white",
        borderRadius : 5,
        marginRight : 20 ,
        padding : 30
    },containerStyle : {
        
    },textStyle :{
        color : 'black'
    }
})