import React, {Component} from 'react';
import PartyClient from "./Pages/PartyClient";
import JoinHomeMenu from "./Pages/JoinHomeMenu";
import SearchSong from "./Pages/SearchSong";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import {AntDesign,MaterialCommunityIcons,MaterialIcons} from "@expo/vector-icons";
import LeaderBoard from './Pages/Leaderboard';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';


const initialState = {
  isPlaying: false,
  title: 'IC3PEAK - Ether',
  likes:6,
  dislikes:9,
  liked:false,
  disliked:false,
  userToken: null,
  socketUserId: null,
  connectedUsers: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_SONG':
      return {
        ...state,
          title: action.title
      }
    case 'CONNECT':
      return {
        ...state,
        userToken: action.userToken
      }
    case 'LIKE':
      return {
        ...state,
          likes: action.likes
      }
    case 'DISLIKE':
      return {
        ...state,
          dislikes: action.dislikes
      }
    case 'TOGGLE_PLAY':
      return {
        ...state,
        isPlaying: !state.isPlaying
      }
    case 'SOCKET_CONNECT':
      return {
        ...state,
        socketUserId: action.userId
      }
    case 'SOCKET_DISCONNECT':
      return {
        ...state,
        connectedUsers: []
      }
    case 'SOCKET_USER_JOIN':
      return {
        ...state,
        connectedUsers: [...state.connectedUsers, action.user]
      }
    case 'SOCKET_USER_LEFT':
      return {
        ...state,
        connectedUsers: state.connectedUsers.filter(item => item !== action.user)
      }
    default:
      return state
  }
};

const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
        
      </Provider>
    );
  }
}

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
      order: ['MainMenuPage','LeaderBoardPage','PartyPage', 'SearchPage'],
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
      
    let Navigation = createAppContainer(TabNavigator);
      