import React, {Component} from 'react';
import { StyleSheet,TouchableOpacity,StatusBar,TextInput , Text, View } from 'react-native';
import PlayListElement from "../Components/PlaylistItem";
import AudioWave from "../Components/Audiowave";
import RateBar from "../Components/RateBar";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default class JoinHomeMenu extends Component {  
  render(){
    return (
    
        <View style={styles.container}>
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
            <TextInput placeholderTextColor='grey' placeholder='Username' style={styles.field}></TextInput>
        </View>
        <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.menuBtn}><Text style={styles.menuBtnText}>Create a party</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menuBtn}><Text style={styles.menuBtnText}>Join a party</Text></TouchableOpacity>
        </View>
       </View>
    );
  }
 
 
}

const styles = StyleSheet.create({
 
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
        height: 40,
        borderRadius: 25,
        borderWidth: 3,
        shadowColor: 'black',
        shadowRadius: 100,
        borderColor: 'white',
        fontSize: 20,
        textAlign: 'center',
        // borderColor: 'red',
        // borderWidth: 2
    },
    menuBtn:{
        borderColor: 'black',
        width: 250,
        height: 45,
        borderRadius: 30,
        borderWidth: 5,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuBtnText:{
        color: 'grey',
        fontSize: 20,
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
