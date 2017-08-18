import React from 'react';
import { StyleSheet, View, Text, Dimensions, Button, Image, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import * as firebase from "firebase";

class LightBoxTankOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            databaseLength: this.props.databaseLength,
        }
    }

    dismissLightBox = () => {
        Navigation.dismissLightBox();
    };

    alertme(){
        Alert.alert(
        'Are you sure you want to erase this tank?',
        '',
        [
        {text: 'Remove', onPress: () => this.removeTank(), style: 'destructive'},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        //{text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
        )
    }

    removeTank(){
        console.log('Remove pressed')

        todaysDate = new Date;
        firebase.database()
        .ref("entries/"+(testDate.getMonth()+1)+"-"+testDate.getDate()+"-"+testDate.getFullYear()+"/"+this.props.index+"/")
        .remove()

        firebase.database()
        .ref("allTanks/"+(this.props.index))
        .remove()

        let currentTank = this.state.index
        let databaseLength = this.state.databaseLength
        for (let i = currentTank; i < databaseLength-1; i++){
            firebase.database()
            .ref("allTanks/"+(i+1))
            .once("value", (snapshot) => this.fixTankIndex(snapshot,i))
            firebase.database()
            .ref("entries/"+(testDate.getMonth()+1)+"-"+testDate.getDate()+"-"+testDate.getFullYear()+"/"+(i+1))
            .once("value", (snapshot) => this.fixEntryIndex(snapshot,i))
        }
        this.dismissLightBox()
    }

    fixTankIndex(snapshot, index){
        let nextElement = snapshot.toJSON()
        console.log(JSON.stringify(snapshot.toJSON()))
        firebase.database()
        .ref("allTanks/"+index)
        .set(
            nextElement
        ) 
        firebase.database()
        .ref("allTanks/"+(index+1))
        .remove() 
    }

    fixEntryIndex(snapshot, index){
        let nextElement = snapshot.toJSON()
        console.log(JSON.stringify(snapshot.toJSON()))
        firebase.database()
        .ref("entries/"+(testDate.getMonth()+1)+"-"+testDate.getDate()+"-"+testDate.getFullYear()+"/"+index)
        .set(
            nextElement
        ) 
        firebase.database()
        .ref("entries/"+(testDate.getMonth()+1)+"-"+testDate.getDate()+"-"+testDate.getFullYear()+"/"+(index+1))
        .remove() 
    }

    changeValue(text, dataType){
        if (text != "") {
            console.log("CHanging dissovled Oxygen to: "+text)
            testDate = new Date
            if ((dataType == "notes") || (dataType == "initials")){
                firebase.database()
                .ref("entries/"+(testDate.getMonth()+1)+"-"+testDate.getDate()+"-"+testDate.getFullYear()+"/"+this.props.index+"/")
                .update({
                [dataType]: text
                })
            }
            else{
                firebase.database()
                .ref("entries/"+(testDate.getMonth()+1)+"-"+testDate.getDate()+"-"+testDate.getFullYear()+"/"+this.props.index+"/")
                .update({
                [dataType]: parseFloat(text)
                })
            }
        }
        else{
            testDate = new Date
            firebase.database()
            .ref("entries/"+(testDate.getMonth()+1)+"-"+testDate.getDate()+"-"+testDate.getFullYear()+"/"+this.props.index+"/")
            .update({
            [dataType]: null
            })
        }
    }

    valueInput(value, dataType){
        let keyboard = "numeric"
        if (dataType == "notes"){
            keyboard = "default"
        }
        if (dataType == "initials"){
            keyboard = "default"
        }
        if (value == undefined){
            return <TextInput 
            style={[{height: 18, width: 70, textAlign: 'right'}, styles.subtext]} 
            placeholder= "Enter" 
            placeholderTextColor={"#bdc3c7"}
            keyboardType={keyboard}
            keyboardAppearance="dark"
            returnKeyType="done"
            autoCapitalize="characters"
            autoCorrect={false}
            editable={true}
            onChangeText={(text) => this.changeValue(text, dataType)}
            />
        }
        else{
            return <TextInput 
            style={[{height: 18, width: 70, textAlign: 'right'}, styles.subtext]} 
            placeholder= "Enter" 
            placeholderTextColor={"#bdc3c7"}
            keyboardType={keyboard}
            keyboardAppearance="dark"
            returnKeyType="done"
            autoCapitalize="characters"
            defaultValue={""+value} 
            autoCorrect={false}
            editable={true}
            onChangeText={(text) => this.changeValue(text, dataType)}
            />
        }
    }

    notesInput(value, dataType){
        let keyboard = "numeric"
        if (dataType == "notes"){
            keyboard = "default"
        }
        if (value == undefined){
            return <TextInput 
            style={[{flexDirection: 'column', flex: 1, textAlign: 'right', alignContent: "flex-start", paddingTop: 0}, styles.subtext, {color: '#2c3e50'}]} 
            placeholder= "Enter" 
            placeholderTextColor={"#bdc3c7"}
            keyboardType={keyboard}
            keyboardAppearance="dark"
            autoCorrect={false}
            multiline={true}
            editable={true}
            onChangeText={(text) => this.changeValue(text, dataType)}
            />
        }
        else{
            return <TextInput
            style={[{flexDirection: 'column', flex: 1, textAlign: 'right', alignContent: "flex-start", paddingTop: 0}, styles.subtext, {color: '#2c3e50'}]} 
            placeholder= "Enter" 
            placeholderTextColor={"#bdc3c7"}
            keyboardType={keyboard}
            keyboardAppearance="dark"
            defaultValue={""+value} 
            autoCorrect={false}
            multiline={true}
            editable={true}
            onChangeText={(text) => this.changeValue(text, dataType)}
            />
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.outercontainer}>
                <TouchableWithoutFeedback style={styles.fill} onPress={this.dismissLightBox}>
                    <View style={styles.fill} />
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={{ flex: 6 }}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View>
                                <Text style={[styles.title,{paddingTop: 5}]}>{'Tank: ' + this.props.tankName}</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => this.alertme()}
                            >
                                <View style={styles.eliminate}>
                                    <Image style={{tintColor: 'white'}} source={require('../img/delete.png')}></Image>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.subcategory}>{'Logger Info'}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.subtitle}>{'      Initials: '}</Text>
                            <View>
                                {this.valueInput(this.props.initials, "initials")}
                            </View>
                        </View>
                        <Text style={styles.subcategory}>{'Daily Water Quality'}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.subtitle}>{'      DO: '}</Text>
                            <View>
                                {this.valueInput(this.props.dissolvedOxygen,"dissolvedOxygen")}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.subtitle}>{'      Temperature: '}</Text>
                            <View>
                                {this.valueInput(this.props.temperature, "temperature")}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.subtitle}>{'      pH: '}</Text>
                            <View>
                                {this.valueInput(this.props.pH, "pH")}
                            </View>
                        </View>
                        <Text style={styles.subcategory}>{'Weekly Water Quality'}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.subtitle}>{'      TAN: '}</Text>
                            <View>
                                {this.valueInput(this.props.TAN, "TAN")}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.subtitle}>{'      NH3: '}</Text>
                            <View>
                                {this.valueInput(this.props.NH3, "NH3")}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.subtitle}>{'      NO2: '}</Text>
                            <View>
                                {this.valueInput(this.props.NO2, "NO2")}
                            </View>
                        </View>
                        <Text style={styles.subcategory}>{'Responses'}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.subtitle}>{'      NaHCO3: '}</Text>
                            <View>
                                {this.valueInput(this.props.NaHCO3, "NaHCO3")}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.subtitle}>{'      NaCl: '}</Text>
                            <View>
                                {this.valueInput(this.props.NaCl, "NaCl")}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.subtitle}>{'      Water Change: '}</Text>
                            <View>
                                {this.valueInput(this.props.waterChange, "waterChange")}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.subtitle}>{'      Food: '}</Text>
                            <View>
                                {this.valueInput(this.props.food, "food")}
                            </View>
                        </View>
                        <Text style={styles.subcategory}>{'Notes'}</Text>
                        {this.notesInput(this.props.notes, "notes")}
                        </ScrollView>
                    </View>
                    {/* <TouchableOpacity
                        style={{ flex: 1, paddingBottom: 0}}
                        activeOpacity={0.7}
                        onPress={() => this.props.onClose()}
                    >
                        <View style={[styles.close]}>
                            <Text style={styles.buttonText}>Close</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    outercontainer: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fill: {    
            ...StyleSheet.absoluteFillObject,
    },
    container: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.6,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 16,
    },
    title: {
        color: '#2c3e50',
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 5,
    },
    subcategory: {
        fontSize: 18,
        fontWeight: '800',
        color: '#27ae60',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
    },
    subtext: {
        fontSize: 18,
        fontWeight: '700',
        color: '#27ae60',
    },
    eliminate: {
        backgroundColor: '#c0392b',
        padding:5,
        borderRadius: 8,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#e31837',
        paddingHorizontal:10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    close: {
        backgroundColor: '#2c3e50',
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

export default LightBoxTankOptions;
