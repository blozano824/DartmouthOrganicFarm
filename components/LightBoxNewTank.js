import React from 'react';
import { StyleSheet, View, Text, Dimensions, Button, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import * as firebase from "firebase";

class LightBoxNewTank extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      newTankName: null,
    }
  }

    dismissLightBox = () => {
        Navigation.dismissLightBox();
    };

    addTank(){
        let todaysDate = new Date
        firebase.database()
        .ref("entries/"+(testDate.getMonth()+1)+"-"+testDate.getDate()+"-"+testDate.getFullYear()+"/"+this.props.entriesLength)
        .update({
          tankName: this.state.newTankName
        })
        firebase.database()
        .ref("allTanks/"+this.props.entriesLength)
        .update({
          tankName: this.state.newTankName
        })
        this.props.onClose()
    }

    render() {
        return (
            <View style={styles.container}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
                            <Text style={[styles.title,{paddingTop: 5}]}>{'Enter new tank: '}</Text>
                    </View>
                    <View style={{flex: 1}}>
                            <TextInput 
                            style={[{textAlign: 'center', height: 30}, styles.tankName]} 
                            placeholder= "Name" 
                            keyboardType="default"
                            editable={true}
                            autoFocus={true}
                            autoCorrect={false}
                            maxLength={10}
                            onChangeText={(text) => 
                            this.setState({
                                newTankName: text
                            })
                            }
                            />
                    </View>
                <TouchableOpacity
                    style={{ flex: 1}}
                    activeOpacity={0.7}
                    onPress={() => this.addTank()}
                >
                    <View style={[styles.submit]}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1}}
                    activeOpacity={0.7}
                    onPress={() => this.props.onClose()}
                >
                    <View style={[styles.close]}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.35,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 16,
    },
    title: {
        color: '#2c3e50',
        fontSize: 23,
        fontWeight: '700',
        marginBottom: 8,
    },
    tankName: {
        fontSize: 25,
        fontWeight: '700',
        color: '#2c3e50',
    },
    close: {
        backgroundColor: '#c0392b',
        paddingTop:10,
        paddingBottom:10,
        borderRadius: 8,
        alignItems: 'center',
    },
    submit: {
        backgroundColor: '#27ae60',
        paddingTop:10,
        paddingBottom:10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default LightBoxNewTank;
