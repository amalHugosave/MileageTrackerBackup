import React from 'react'
import { View ,Modal , StyleSheet ,Text, Pressable} from 'react-native'

const ModalContainer = ({modalVisible , modaltext , handleAccept , handleReject}) => {
  return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modaltext}</Text>
            <View style={styles.buttons}>
                <Pressable
                onPress={handleReject}
                style={[styles.button, styles.buttonReject]}
                >
                <Text style={styles.rejectText}>No</Text>
                </Pressable>
                <Pressable
                style={[styles.button, styles.buttonAccept]}
                onPress={handleAccept}
                >
                <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : 'rgba(0,0,0,0.2)', 
    
    },
    modalView: {
      margin: 20,
      width : 350,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      opacity : 1
    },
    button: {
      borderRadius: 4,
      padding: 10,
      elevation: 2,
      width : 130
    },
    buttonReject: {
      backgroundColor: 'white',
      color : 'black',
      borderColor : '#0B3C58',
      borderWidth : 1.5
    },
    buttonAccept: {
      backgroundColor: '#0B3C58',
    },
    textStyle: {
      color: 'white',
      textAlign: 'center',
    },rejectText : {
      textAlign: 'center',
        color : '#0B3C58'
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color : '#0B3C58'
    },
    buttons : {
        flexDirection : 'row',
        justifyContent :'space-around',
        width : 350
    }
  });

export default ModalContainer