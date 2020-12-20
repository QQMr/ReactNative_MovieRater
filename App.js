import React from 'react';
import MovieList from './componment/list';
import Detail from "./componment/detail"
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppNavigator = createStackNavigator({
  MovieList: {screen: MovieList},
  Detail: {screen: Detail},
}) 

const App = createAppContainer(AppNavigator);

export default App;

export  function AApp() {
  return (
    <MovieList></MovieList>
  );
}