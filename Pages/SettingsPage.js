import React, {Component} from 'react';
import { StyleSheet,ScrollView,StatusBar,Animated,TouchableOpacity , Text, View } from 'react-native';
import LeaderBoardItem from "../Components/LeaderBoardItem";
import AudioWave from "../Components/Audiowave";
import RateBar from "../Components/RateBar";
import {Entypo,Feather} from "@expo/vector-icons";
import {connect} from 'react-redux'
import SettingBar from '../Components/SettingBar';
import UsersArray from '../Components/UsersArray';
import { NavigationEvents } from 'react-navigation';


class SettingsPage extends React.Component {
  render(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>App settings</Text>
        </View>

    );
  }
}

function mapStateToProps(state) {
  return {
    isPlaying: state.isPlaying,
    title: state.title,
    likes: state.likes,
    dislikes: state.dislikes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeSong: (title) => dispatch({ type: 'NEW_SONG', title }),
    togglePlay: () => dispatch({ type: 'TOGGLE_PLAY'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)

const styles = StyleSheet.create({
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
    
      },
      text: {
        marginTop : 40,
      },
      container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      },
});
