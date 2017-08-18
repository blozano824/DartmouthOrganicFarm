import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './CardEntry.style';
import { Navigation } from 'react-native-navigation';

export default class SliderEntry extends Component {

    static propTypes = {
        tankName: PropTypes.string,
        // waterQuality: PropTypes.string,
        // fishFed: PropTypes.string,
        dissolvedOxygen: PropTypes.number,
        temperature: PropTypes.number,
        pH: PropTypes.number,
        food: PropTypes.number,
        TAN: PropTypes.number,
        NH3: PropTypes.number,
        NO2: PropTypes.number,
        NaHCO3: PropTypes.number,
        NaCl: PropTypes.number,
        waterChange: PropTypes.number,
    };


    showLightBoxTankOptions = () => {
        Navigation.showLightBox({
            screen: "FishStats.FishTanks.LightBoxTankOptions",
            passProps: {
                databaseLength: this.props.databaseLength,
                index: this.props.index,
                tankName: this.props.tankName,
                initials: this.props.initials,
                fishFed: this.props.fishFed,
                dissolvedOxygen: this.props.dissolvedOxygen,
                temperature: this.props.temperature,
                pH: this.props.pH,
                TAN:this.props.TAN,
                NH3: this.props.NH3,
                NO2: this.props.NO2,
                NaHCO3: this.props.NaHCO3,
                NaCl: this.props.NaCl,
                waterChange: this.props.waterChange,
                food: this.props.food,
                notes: this.props.notes,
                onClose: this.dismissLightBox
            },
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }
        });
    };

    dismissLightBox = () => {
        Navigation.dismissLightBox();
    };

    waterQualityStatus (dissolvedOxygen,temperature,pH) {
        let waterQuality = ''
        if (dissolvedOxygen != null && temperature != null && pH != null){
            waterQuality = 'COMPLETE'
            return (
                <Text style={[styles.subtext, styles.complete]}>       {waterQuality}</Text>
            );
        }
        else{
            waterQuality = 'INCOMPLETE'
            return (
                <Text style={[styles.subtext, styles.incomplete]}>    {waterQuality}</Text>
            );
        }
    };

    fishFedStatus (food) {
        let fishFed = ''
        if (food != null){
            fishFed = 'COMPLETE'
            return (
                <Text style={[styles.subtext, styles.complete]}>                  {fishFed}</Text>
            );
        }
        else{
            fishFed = 'INCOMPLETE'
            return (
                <Text style={[styles.subtext, styles.incomplete]}>              {fishFed}</Text>
            );
        }
    };

    getDissolvedOxygen (dissolvedOxygen) {
        if (dissolvedOxygen != null){
            return (
                <Text style={[styles.subtext, styles.subsubtext, styles.complete]}>                           {dissolvedOxygen+" mg/L"}</Text>
            );
        }
        else{
            return (
                <Text style={[styles.subtext, styles.subsubtext, styles.incomplete]}>                           Not Done</Text>
            );
        }
    };

    getTemperature (temperature) {
        if (temperature != null){
            return (
                <Text style={[styles.subtext, styles.subsubtext, styles.complete]}>                      {temperature+" °C"}</Text>
            );
        }
        else{
            return (
                <Text style={[styles.subtext, styles.subsubtext, styles.incomplete]}>                      Not Done</Text>
            );
        }
    };

    getpH (pH) {
        if (pH != null){
            return (
                <Text style={[styles.subtext, styles.subsubtext, styles.complete]}>                            {pH}</Text>
            );
        }
        else{
            return (
                <Text style={[styles.subtext, styles.subsubtext, styles.incomplete]}>                           Not Done</Text>
            );
        }
    };
    
    getFood (food) {
        if (food!= null){
            return (
                <Text style={[styles.subtext, styles.subsubtext, styles.complete]}>                  {food+" grams"}</Text>
            );
        }
        else{
            return (
                <Text style={[styles.subtext, styles.subsubtext, styles.incomplete]}>                 Not Done</Text>
            );
        }
    };

    render () {
        const { tankName, initials, fishFed, dissolvedOxygen, temperature, pH, TAN, NH3, NO2, NaHCO3, NaCl, waterChange, food, even, index} = this.props;

        return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.slideInnerContainer}
              //onPress={() => { alert(`You've clicked '${title}'`); }}
              onPress={this.showLightBoxTankOptions}
              >
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    
                    <Image source={require('../../img/fish.gif')} style={styles.image}/>

                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    
                    <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={1}>{tankName.toUpperCase()}</Text>
                    <Text numberOfLines={1}><Text style={[styles.subtitle, even ? styles.subtitleEven : {}]}>{ 'Water Quality: '}</Text>{this.waterQualityStatus(dissolvedOxygen,temperature,pH)}</Text>
                    <Text numberOfLines={1}><Text style={[styles.subtitle, even ? styles.subtitleEven : {}, styles.subsubtitle]}>{ '           DO: '}</Text>{this.getDissolvedOxygen(dissolvedOxygen)}</Text>
                    <Text numberOfLines={1}><Text style={[styles.subtitle, even ? styles.subtitleEven : {}, styles.subsubtitle]}>{ '           Temp: '}</Text>{this.getTemperature(temperature)}</Text>
                    <Text numberOfLines={1}><Text style={[styles.subtitle, even ? styles.subtitleEven : {}, styles.subsubtitle]}>{ '           pH: '}</Text>{this.getpH(pH)}</Text>
                    <Text numberOfLines={1}><Text style={[styles.subtitle, even ? styles.subtitleEven : {}]}>{ 'Fish Fed: '}</Text>{this.fishFedStatus(food)}</Text>
                    <Text numberOfLines={1}><Text style={[styles.subtitle, even ? styles.subtitleEven : {}, styles.subsubtitle]}>{ '           Amount: '}</Text>{this.getFood(food)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
