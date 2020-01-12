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
import TabNavig from './TabNavigScene.js'
import NavigationService from './NavigationService';
import SettingsPage from './Pages/SettingsPage';

const initialState = {
  isPlaying: false,
  title: 'Je ne regrette rien - Edith Piaf',
  likes:6,
  dislikes:9,
  liked:false,
  disliked:false,
  userToken: null,
  connectedUsers: [],
  errorPartyName: false
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
    case 'S_DISCONNECT':
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
    case 'ERROR_PARTYNAME':
        return {
            ...state,
            errorPartyName: !state.errorPartyName
        }

    default:
        return state
  }
};

const store = createStore(reducer, applyMiddleware(socketMiddleware));

export default class App extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        
    return (
        <Provider store={store}>
            <StackNav 
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
            }} />
            
        </Provider>
        );
    }
}
const AppNavigator = createStackNavigator({
    Home: JoinHomeMenu,
    Tabs: TabNavig,
    Settings: { screen: SettingsPage,
                navigationOptions: {
                    headerShown: true
                }
    },
},
{
    defaultNavigationOptions: {
        headerShown: false
    }
});

const StackNav = createAppContainer(AppNavigator);



// const Stack = createStackNavigator({
//   tab: TabNavigator,
//   otherScreen: JoinHomeMenu,
// })

// export default TabNavigator;


      