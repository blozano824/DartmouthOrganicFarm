import {Platform, Dimensions} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from './screens';

const {height, width} = Dimensions.get('window')

// screen related book keeping
registerScreens();
registerScreenVisibilityListener();

const tabs = [{
    label: 'Tanks',
    screen: 'FishStats.FishTanks',
    icon: require('./img/list.png'),
    title: 'Fish Tanks',
  }, 
  // {
  //   label: 'Actions',
  //   screen: 'example.Actions',
  //   icon: require('../img/swap.png'),
  //   title: 'Navigation Actions',
  // }
  ];

// if (Platform.OS === 'android') {
//   tabs.push({
//     label: 'Transitions',
//     screen: 'example.Transitions',
//     icon: require('../img/transform.png'),
//     title: 'Navigation Transitions',
//   });
// }

// this will start our app
Navigation.startTabBasedApp({
  tabs,
  animationType: 'fade',
  tabsStyle: {
    tabBarBackgroundColor: '#27ae60',
    tabBarButtonColor: '#ffffff',
    tabBarLabelColor: '#ffffff',
    tabBarSelectedButtonColor: '#2c3e50',
     tabBarSelectedLabelColor: '#2c3e50',
    tabFontFamily: 'BioRhyme-Bold',
  },
  drawer: {
    left: {
      screen: 'example.Types.Drawer'
    },
    style: { // ( iOS only )
      drawerShadow: false, 
      leftDrawerWidth: 75,
    },
    type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
    animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
                                        // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
  }
});
