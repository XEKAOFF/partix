import React, {Component} from 'react';
import PartyClient from "./Pages/PartyClient";
import JoinHomeMenu from "./Pages/JoinHomeMenu";
import SearchSong from "./Pages/SearchSong";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import {AntDesign,MaterialCommunityIcons,MaterialIcons} from "@expo/vector-icons";
import LeaderBoard from './Pages/Leaderboard';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import socketMiddleware from "./redux-middleware";
import { createStackNavigator } from 'react-navigation-stack';
import NavigationService from './NavigationService';

// export default class TabNavig extends Component {
//     render() {
//         return (
//             <Navigation/>
//         );
//     }
// }
const TabNavigator = createMaterialTopTabNavigator({
    MainMenuPage: {
    screen: JoinHomeMenu,
    navigationOptions: {
      tabBarIcon: () => (
        <MaterialIcons name="do-not-disturb" size={25} color="red" style={{width: 30}} />
        )
      },
    },
    LeaderBoardPage: {
    screen: LeaderBoard,
    navigationOptions: {
      tabBarIcon: () => (
        <AntDesign name="bars" size={25} color="white" style={{width: 30}} />
        )
      },
    },
    PartyPage: {
      screen: PartyClient,
      navigationOptions: {
        tabBarIcon: () => (
          <AntDesign name="hearto" size={25} color="white" style={{width: 60}} />
          )
        },
      },
    SearchPage: {
      screen: SearchSong,
      navigationOptions: {
        tabBarIcon: () => (
          <MaterialCommunityIcons name="playlist-plus" size={30} color="white" style={{width: 30}} />
          )
        }
      },
    },
    {
      // order: ['MainMenuPage','LeaderBoardPage','PartyPage', 'SearchPage'],
      order: ['LeaderBoardPage','PartyPage', 'SearchPage'],
      tabBarPosition: 'bottom',
      initialRouteName: 'PartyPage',
      tabBarOptions: {
        activeTintColor: '#D4AF37',
        inactiveTintColor: 'gray',
        showLabel: false,
        showIcon: true,
        indicatorStyle: {
          backgroundColor: '#ee4540'
        },
        style: {
          backgroundColor: '#1a1a1a',
        }
      },
    },
    )
      
export default Navigation = createAppContainer(TabNavigator);