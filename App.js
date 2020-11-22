import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './Login';
import HomeScreen from './Home';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

const AppStack = createSwitchNavigator({
  'Login': LoginScreen,
  'Home': HomeScreen
})

const AppContainer = createAppContainer(AppStack);

export default class App extends React.Component {

  render() {
    return (
      <AppContainer />
    )
  }
}
