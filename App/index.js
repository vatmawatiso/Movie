import React from 'react';
import AppNavigator from './Navigations/AppNavigator';
import NavigatorService from './Helpers/NavigatorServices';

const App = () => (
  <AppNavigator
    ref={navigatorRef => {
      NavigatorService.setContainer(navigatorRef);
    }}
  />
);

export default App;
