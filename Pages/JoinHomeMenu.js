import React, {Component} from 'react';
import { StyleSheet,TouchableOpacity,StatusBar,TextInput , Text, View } from 'react-native';
import PlayListElement from "../Components/PlaylistItem";
import { NavigationActions } from "react-navigation";
import AudioWave from "../Components/Audiowave";
import RateBar from "../Components/RateBar";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {connect} from 'react-redux'
import SettingBar from '../Components/SettingBar';

const regex = RegExp('^[a-zA-Z0-9]+(?:[_-]?[a-zA-Z0-9])*$')

class JoinHomeMenu extends Component {
  state = {
    partyText: "",
    username: "",
    loading: false,
    goodToLaunch: false
  }

  updateText(text) {
    this.setState({
      partyText: text
    })
    this.updateCondition()
  }

  updateUsername(text) {
    this.setState({
      username: text
    })
    this.updateCondition()
  }

  updateCondition() {
    if(this.state.username.length >= 3&&regex.test(this.state.username)&&this.state.partyText.length >= 3) {
      // console.log("yes")
      this.setState({
        goodToLaunch: true
      })
    } else {
      // console.log("no")
      this.setState({
        goodToLaunch: false
      })
    }
  }

  joinParty() {
    this.props.socketConnect({user: this.state.username, room: this.state.partyText, type: 'join'});
    this.props.navigation.navigate('Tabs', {}, NavigationActions.navigate({routeName: 'PartyPage'}))
    // this.setState({
      //   loading: true
      // })
  }
    
  createParty() {
    this.props.socketConnect({user: this.state.username, room: this.state.partyText, type: 'create'});
    this.props.navigation.navigate('Tabs', {}, NavigationActions.navigate({routeName: 'PartyPage'}))
    // this.setState({
      //   loading: true
      // })
      //console.log(this.state.partyText + " - " + this.state.username)
  }
    
  switchNav() {
    this.props.navigation.navigate('Tabs', {}, NavigationActions.navigate({routeName: 'PartyPage'}))
  }
  render(){
    return (
    
        <View style={styles.container}>
          <SettingBar onlySettings={true} margin={30}></SettingBar>
          <View style={styles.fixedAudiowaves}>
            <View style={[styles.audioBar,{height:8}]}></View>
            <View style={[styles.audioBar,{height:25}]}></View>
            <View style={[styles.audioBar,{height:40}]}></View>
            <View style={[styles.audioBar,{height:25}]}></View>
            <View style={[styles.audioBar,{height:8}]}></View>
          </View>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
            <Text style={styles.appTitle}>Partix</Text>
        </View>
        <View style={styles.middleSlot}>
            <TextInput onChangeText={newtext => this.updateUsername(newtext)} placeholderTextColor='grey' placeholder='Username' style={styles.field}></TextInput>
        </View>
        { !this.state.loading ?
        <View style={{flex: 0.7, justifyContent:'space-evenly',alignItems: 'center'}}>
          <TextInput onChangeText={newtext => this.updateText(newtext)} placeholderTextColor='grey' placeholder='Party Name' style={(!this.props.errorPartyName) ? [styles.partyfield] : [styles.partyfield, {backgroundColor: 'red'}]}></TextInput>
          <View style={styles.inputBtnContainer}>
            <TouchableOpacity onPress={this.createParty.bind(this)} disabled={!this.state.goodToLaunch} style={!this.state.goodToLaunch ? {...styles.menuBtn, ...styles.buttonDisabled} : styles.menuBtn}><Text style={styles.menuBtnText}>Create</Text></TouchableOpacity>
            <TouchableOpacity onPress={this.joinParty.bind(this)} disabled={!this.state.goodToLaunch} style={!this.state.goodToLaunch ? {...styles.menuBtn, ...styles.buttonDisabled} : styles.menuBtn}><Text style={styles.menuBtnText}>Join</Text></TouchableOpacity>
          </View>
            <TouchableOpacity onPress={this.switchNav.bind(this)} style={!this.state.goodToLaunch ? {...styles.menuBtn, ...styles.buttonDisabled} : styles.menuBtn}><Text style={styles.menuBtnText}>DevDoor</Text></TouchableOpacity>
        </View> :
        <View>
          <Text>Loading</Text>
        </View>
        }
       </View>
    );
  }
 
 
}

// const mapStateToProps = state => {
//   return {
//     isPlaying: state.isPlaying,
//     title: state.title,
//     likes: state.likes,
//     dislikes: state.dislikes,
//     connectedUsers: state.connectedUsers,
//     socketUserId: state.socketUserId
//   }
// }

function mapStateToProps(state) {
  return {
    errorPartyName: state.errorPartyName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    socketConnect: (data) => dispatch({ type: 'S_CONNECT', data }),
    socketDisconnect: () => dispatch({ type: 'S_DISCONNECT' }),
    errorToggle: () => dispatch({ type: 'ERROR_PARTYNAME' }),
    // userJoin: (user) => dispatch({ type: 'SOCKET_USER_JOIN', user }),
    // userLeft: (user) => dispatch({ type: 'SOCKET_USER_LEFT', user })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinHomeMenu)

const styles = StyleSheet.create({
  inputBtnContainer: {
    //backgroundColor: 'red',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '80%',
    justifyContent: 'space-between'
  },
  partyfield: {
    //backgroundColor: 'blue',
    height: 50,
    width: '80%',
    borderColor: 'black',
    borderRadius: 30,
    borderWidth: 3,
    textAlign: 'center',
    fontSize: 20
  },
  menuBtn:{
    width: '40%',
    height: 45,
    backgroundColor: '#333',
    borderColor: 'black',
    borderRadius: 30,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuBtnText:{
      color: '#ccc',
      fontSize: 20,
  },
  buttonDisabled: {
    borderColor: '#999',
    backgroundColor: '#aaa'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fixedAudiowaves:{
    height: 45,
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
   
    flexDirection:'row',

  },
  audioBar:{
    width: 7,
    
    backgroundColor: 'grey',
    margin: 4,
    borderRadius: 50,
  },
  header:{
    backgroundColor: 'white',
    zIndex: 10,
    alignItems:'center',
    justifyContent:'center',
    width: '100%',
    height: 100,
   
    },  
    appTitle:{
        color: 'black',
        fontSize: 35,
    }, 
    middleSlot:{
        alignItems:'center',
        backgroundColor: '#1d1427',
        justifyContent:'center',
        height: 100,

    },
    bottomSlot: {
        backgroundColor: '#C72C41',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
        // backgroundColor: 'red'
    },
    field: {
        width: '80%',
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        shadowColor: 'black',
        shadowRadius: 100,
        borderColor: 'white',
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
        // borderColor: 'red',
        // borderWidth: 2
    },




    addBtn:{
      width : 50,
      height: 50,
      backgroundColor: '#EE4540',
      borderRadius: 50,
      position: "absolute",
      alignItems: 'center',
    
      shadowColor: "white",
      shadowOpacity: 0.7,
      shadowRadius: 8,
    
      bottom: 10,
      
      right: 10,
    },
    
    
});
