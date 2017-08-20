import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, Alert, Text, Dimensions} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Graph from 'react-native-line-plot';
import * as firebase from "firebase";
const {height, width} = Dimensions.get('window')

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

  render() {
      return (
          <View style={styles.container}>
              <View style={styles.graph}>
                  <Graph
                      graphHeight={(height / 4)}
                      graphWidth={(width * 0.75)}
                      data={[[0, 0], [33, 30], [66, 25], [99, 50]]}
                      graphColorPrimary='#000000'
                      graphColorSecondary='#FF0000'
                      xUnit='foo'
                      yUnit='bar'
                  />
              </View>
              <View style={styles.graph}>
                  <Graph
                      graphHeight={(height / 4)}
                      graphWidth={(width * 0.75)}
                      data={[[0, 0], [33, 40], [66, 25], [99, 50]]}
                      graphColorPrimary='#000000'
                      graphColorSecondary='#FF0000'
                      xUnit='foo'
                      yUnit='bar'
                  />
              </View>
          </View>  
        );
    }
}

const styles = StyleSheet.create({
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
    text: {
        fontSize: 16,
    },
    graph: { 
        position: 'absolute',
        left: 0,
        bottom: 0,
    }
});

export default FishGraphs;
