import React, {Component} from 'react';
import { StyleSheet,TouchableOpacity, Animated , Text, View } from 'react-native';
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

export default class SearchItem extends React.Component { 
  
  render() {
    return (
      <View  style={[styles.container]}> 
        <View style={styles.songInfos}>
          <Text style={[styles.songText]}>
            {this.props.songName} - {this.props.songArtist}
          </Text>
         
        </View>
        <TouchableOpacity onPress={ () =>
            this.props.onChange(this.props.uri)
          } style={styles.addBtn}><Text style={styles.addBtnTxt}>+</Text></TouchableOpacity>
      </View> 
    );
  }

  // play() {
  //   if (typeof this.props.onChange === 'function') {
  //     // this.props.playSong(this.props.uri);
  //     console.log("??gregre?")
  //   } else {
  //     console.log("???????????????")
  //   }
  // }

  switchBtn(){
    this.setState({
      isOpen: !this.state.isOpen,
    })
    if(this.state.isOpen){
      this.closeAnim();
    }else{
      this.openAnim();
    }
  }
  openAnim = () => {
      Animated.timing(this.state.animation, {
          toValue: 1,
          duration: 300,
      }).start();
  };
  closeAnim = () => {
    Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 100,
    }).start();
};
}

const styles = StyleSheet.create({
  
  container:{
    margin: 10,
    marginBottom: 30,
    width: 250,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 20,
 
    position: 'relative',
    justifyContent: 'center',
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    
    shadowRadius: 6.68,
    elevation: 11,
  },
  songInfos:{
    width: 200,
    height: 60,
    marginLeft: 5,
    justifyContent: 'center',
   
  },
  songText:{
    marginTop: 5,
    maxWidth: 220,
    fontWeight: 'bold',
  },
  addBtn:{
    width : 40,
    height: 40,
    backgroundColor: '#EE4540',
    borderRadius: 50,
    position: "absolute",
    alignItems: 'center',

    shadowColor: "white",
    shadowOpacity: 0.7,
    shadowRadius: 8,

    bottom: 10,
    
    right: 5,
  },
  addBtnTxt:{
    color: 'white',
    fontSize : 40,
    fontWeight: 'bold',
    marginTop: -7,
  },
});
