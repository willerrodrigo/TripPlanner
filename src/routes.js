import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from '~/pages/HomeScreen';
import TripsScreen from '~/pages/TripsScreen';
import TripScreen from '~/pages/TripScreen';
import AddTripScreen from '~/pages/AddTripScreen';
import AddPointScreen from '~/pages/AddPointScreen';

const Routes = createAppContainer(
  createStackNavigator({
    HomeScreen,
    TripsScreen,
    TripScreen,
    AddTripScreen,
    AddPointScreen,
  },
  { initialRouteName: 'HomeScreen', mode: 'modal' }),
);

export default Routes;
