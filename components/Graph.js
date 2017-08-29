import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, Alert, Text, Dimensions} from 'react-native';
import * as firebase from "firebase";
const {height, width} = Dimensions.get('window')
import { StockLine } from 'react-native-pathjs-charts'

console.ignoredYellowBox = ['Remote debugger'];
console.ignoredYellowBox = ['Setting a timer' ];

class Graph extends Component {

  constructor(props) {
    super(props);
    this.state = {
        data: [[]],
        dataGathered: false
    }
    this.getData()
  }

  getData(){
    let data = [[]]
    todaysDate = new Date
    firebase.database()
        .ref("entries/" + (todaysDate.getMonth() + 1) + "-" + todaysDate.getDate() + "-" + todaysDate.getFullYear() + "/" + this.props.index + "/" + this.props.dataType)
        .on("value", (snapshot) => {
            if (snapshot.val() == null) {
                console.log("NO DATAFOUND!!!")
            }
            if (snapshot.val() != null) {
                console.log(snapshot.val()+"jwehufoiwqbrfqw")
                for(i = 0; i < data[0].length; i++){
                    if (data[0][i].x == 5){
                        data[0].splice(i,1)
                    }
                }
                data[0].push({"x": 5, "y": parseFloat(snapshot.val())})
            }
        })
    firebase.database()
        .ref("entries/" + (todaysDate.getMonth() + 1) + "-" + (todaysDate.getDate()-1) + "-" + todaysDate.getFullYear() + "/" + this.props.index + "/" + this.props.dataType)
        .on("value", (snapshot) => {
            if (snapshot.val() == null) {
                console.log("NO DATAFOUND!!!")
            }
            if (snapshot.val() != null) {
                console.log(snapshot.val()+"jwehufoiwqbrfqw")
                for(i = 0; i < data[0].length; i++){
                    if (data[0][i].x == 4){
                        data[0].splice(i,1)
                    }
                }
                data[0].push({"x": 4, "y": parseFloat(snapshot.val())})
            }
        })
        firebase.database()
        .ref("entries/" + (todaysDate.getMonth() + 1) + "-" + (todaysDate.getDate()-2) + "-" + todaysDate.getFullYear() + "/" + this.props.index + "/" + this.props.dataType)
        .on("value", (snapshot) => {
            if (snapshot.val() == null) {
                console.log("NO DATAFOUND!!!")
            }
            if (snapshot.val() != null) {
                console.log(snapshot.val()+"jwehufoiwqbrfqw")
                for(i = 0; i < data[0].length; i++){
                    if (data[0][i].x == 3){
                        data[0].splice(i,1)
                    }
                }
                data[0].push({"x": 3, "y": parseFloat(snapshot.val())})
            }
        })
        firebase.database()
        .ref("entries/" + (todaysDate.getMonth() + 1) + "-" + (todaysDate.getDate()-3) + "-" + todaysDate.getFullYear() + "/" + this.props.index + "/" + this.props.dataType)
        .on("value", (snapshot) => {
            if (snapshot.val() == null) {
                console.log("NO DATAFOUND!!!")
            }
            if (snapshot.val() != null) {
                console.log(snapshot.val()+"jwehufoiwqbrfqw")
                for(i = 0; i < data[0].length; i++){
                    if (data[0][i].x == 2){
                        data[0].splice(i,1)
                    }
                }
                data[0].push({"x": 2, "y": parseFloat(snapshot.val())})
            }
        })
        firebase.database()
        .ref("entries/" + (todaysDate.getMonth() + 1) + "-" + (todaysDate.getDate()-4) + "-" + todaysDate.getFullYear() + "/" + this.props.index + "/" + this.props.dataType)
        .on("value", (snapshot) => {
            if (snapshot.val() == null) {
                console.log("NO DATAFOUND!!!")
            }
            if (snapshot.val() != null) {
                console.log(snapshot.val()+"jwehufoiwqbrfqw")
                for(i = 0; i < data[0].length; i++){
                    if (data[0][i].x == 1){
                        data[0].splice(i,1)
                    }
                }
                data[0].push({"x": 1, "y": parseFloat(snapshot.val())})
            }
            this.setState({data: data})
            this.setState({dataGathered: true})
        })
  }

  render() {
    console.log(this.state.data)
    let regions = [{
      //label: 'Bad',
      from: this.props.rangeBottom,
      to: this.props.rangeBottomWarning,
      fill: '#c0392b',
    }, {
      //label: 'Good',
      from: this.props.rangeBottomWarning,
      to: this.props.rangeTopWarning,
      fill: '#27ae60',
    }, {
        //label: 'Bad',
        from: this.props.rangeTopWarning,
        to: this.props.rangeTop,
        fill: '#c0392b',
      }]

    let regionStyling = {
      labelOffset: {
        top: 5,
      },
      fillOpacity: 0.5
    }

    let options = {
      width: width*0.5,
      height: width*0.5,
      color: '#2c3e50',
      opacity: 1,
      showAreas: false,
      strokeWidth: 3,
      margin: {
        top: 20,
        left: 40,
        bottom: 25,
        right: 40,
      },
      min: 0,
      max: 5,
      axisX: {
        gridColor: '#2c3e50',
        tickColor: '#2c3e50',
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: true,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          fill: '#2c3e50'
        },
        tickValues: [
            {value:'5'},
            {value:'4'},
            {value:'3'},
            {value:'2'},
            {value:'1'},
          ]
      },
      min: 20,
      max: 27,
      axisY: {
        gridColor: '#2c3e50',
        tickColor: '#2c3e50',
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: true,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          fill: '#2c3e50'
        }
      }
    }
    if (this.state.dataGathered == true && this.state.data[0].length > 1){
        return (
        <View>
            <Text style={styles.title}>{this.props.title}</Text>
            <View style={styles.container}>
                <StockLine data={this.state.data} options={options} regions={regions} regionStyling={regionStyling} xKey='x' yKey='y'/>
            </View>
        </View>
        )
    }
    else{
        return (
            <View>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={styles.emptyGraph}>
                    <Text style={{paddingBottom: 40}}>{"Not enough data acquired."}</Text>
                </View>
            </View>
            ) 
    }
  }
}

const styles = StyleSheet.create({
    container: {
        height: width*0.5+45,
        width: width*0.5+80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        marginBottom: 40,
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '800',
    },
    emptyGraph: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        width: width*0.5+80,
        height: width*0.5+45,
        marginBottom: 40,
    }
});

export default Graph;
