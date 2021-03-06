import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import FishTanks from './FishTanks.js';
import FishGraphs from './FishGraphs.js';

import Drawer from './Drawer';
import LightBoxTankOptions from '../components/LightBoxTankOptions.js';
import LightBoxNewTank from '../components/LightBoxNewTank.js';

export function registerScreens() {
  Navigation.registerComponent('DartmouthOrganicFarm.FishTanks', () => FishTanks);
  Navigation.registerComponent('DartmouthOrganicFarm.FishGraphs', () => FishGraphs);

  Navigation.registerComponent('DartmouthOrganicFarm.Drawer', () => Drawer);
  Navigation.registerComponent('DartmouthOrganicFarm.FishTanks.LightBoxTankOptions', () => LightBoxTankOptions);
  Navigation.registerComponent('DartmouthOrganicFarm.FishTanks.LightBoxNewTank', () => LightBoxNewTank);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
