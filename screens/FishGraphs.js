import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, Alert, Text, Dimensions, RefreshControl, Easing} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Carousel from 'react-native-snap-carousel';
import * as firebase from "firebase";
const {height, width} = Dimensions.get('window')
import { SmoothLine } from 'react-native-pathjs-charts'
import Graph from '../components/Graph.js'

console.ignoredYellowBox = ['Remote debugger'];
console.ignoredYellowBox = ['Setting a timer' ];

class FishGraphs extends Component {

  static navigatorStyle = {
    navBarButtonColor: '#ffffff',
    navBarTextColor: '#ffffff',
    navigationBarColor: '#27ae60',
    navBarBackgroundColor: '#27ae60',
    statusBarColor: '#27ae60',
    tabFontFamily: 'BioRhyme-Bold',
    navBarTextFontSize: 22,
  };

  static navigatorButtons = {
    leftButtons: [
      {
        //title: '+', // for a textual button, provide the button title (label)
        icon: require('../img/navicon_menus.png'), // for icon button, provide the local image asset name
        id: 'warnings', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        //testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
        disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
        disableIconTint: false, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
        //showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        //buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
        //buttonFontSize: 40, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        //buttonFontWeight: '900', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
        refreshing: false,
        databaseLength: 0,
        graphs: null,
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      const parts = event.link.split('/');
      if (parts[0] === 'tab1') {
        this.props.navigator.push({
          screen: parts[1]
        });
      }
    }
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'warnings') { // this is the same id field from the static navigatorButtons definition
        this.toggleDrawer()
      }
    }
  }

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true
    });
  };

    getDatabase(){
        firebase.database()
        .ref("allTanks")
        .on("value", (snapshot) => {
            this.setState({
                allTanks: snapshot.val()
            })
            generatedGraphs = this.makeGraphs()
            this.setState({graphs: generatedGraphs})
        })
    }

    makeGraphs(){
        let graphs = []
        for (let index = 0; index < this.state.allTanks.length; index++){
            tankName = this.state.allTanks[index].tankName
            graphs.push(
                <View key= {index} >
                    <View style={styles.outerContainer}>
                        <View>
                            <Text style={styles.tankName}>{this.state.allTanks[index].tankName}</Text>
                        </View>
                        <Carousel
                        animationOptions={{duration: 600, easing: Easing.elastic(1) }}
                        carouselVerticalPadding={0}
                        enableMomentum={true}
                        sliderWidth={width}
                        itemWidth={width*0.5+80}
                        firstItem={0}
                        inactiveSlideScale={0.9}
                        inactiveSlideOpacity={0.6}
                        showsHorizontalScrollIndicator={false}
                        snapOnAndroid={true}
                        removeClippedSubviews={true}
                        vertical={false}
                        decelerationRate={0.991}
                        swipeThreshold={45}
                        >
                                <Graph title={'Temperature'} index={index} dataType={"temperature"} rangeBottom={20} rangeBottomWarning={22} rangeTopWarning={25} rangeTop={27}/>
                                <Graph title={'Dissolved Oxygen'} index={index} dataType={"dissolvedOxygen"} rangeBottom={20} rangeBottomWarning={22} rangeTopWarning={25} rangeTop={27}/>
                                <Graph title={'pH'} index={index} dataType={"pH"} rangeBottom={20} rangeBottomWarning={22} rangeTopWarning={25} rangeTop={27}/>
                        </Carousel>
                    </View>
                    <View style={{paddingTop: 4, paddingBottom: 4, backgroundColor:'#bdc3c7'}}></View>
                </View>
            )
        }
        this.setState({refreshing: false});
        return graphs
    }

    componentWillMount(){
        this.getDatabase()
    }
    _onRefresh() {
        this.setState({refreshing: true});
        this.getDatabase()
    }

  render() {
    return (
        <ScrollView showsVerticalScrollIndicator={false}         
            refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
            }
            >
            <View style={{paddingTop: 4, paddingBottom: 4, backgroundColor:'#bdc3c7'}}></View>
            {this.state.graphs}
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    outerContainer:{
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    row: {
        height: 48,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    tankName: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '800',
    }
});

export default FishGraphs;
