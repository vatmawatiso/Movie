import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from '../Containers/Home';
import Film from '../Containers/Film';
import DetailFilm from '../Containers/DetailFilm';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Film: {
      screen: Film,
    },
    DetailFilm: {
      screen: DetailFilm,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
