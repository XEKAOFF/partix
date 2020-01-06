import React, {Component} from 'react';
import { StyleSheet,TouchableOpacity, Animated , Text, View } from 'react-native';
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

export default class PlayListElement extends React.Component { 
  constructor() {
    super()
    this.state = {
      animation: new Animated.Value(0),
      isOpen: false,
    }
  }
  
  render() { 
    const animatedHeight = this.state.animation.interpolate({
      inputRange: [0,1],
      outputRange: [60,120]
    })
    const animatedMaxWidth = this.state.animation.interpolate({
      inputRange: [0,1],
      outputRange: [20,35]
    })
    const animatedInfos = this.state.animation.interpolate({
      inputRange: [0,1],
      outputRange: [0,40]
    })
    const animatedColor = this.state.animation.interpolate({
      inputRange: [0,1],
      outputRange: ['grey','#EE4540']
    })
    const animatedFontSize = this.state.animation.interpolate({
      inputRange: [0,1],
      outputRange: [13,18]
    })
    const animatedShadow = this.state.animation.interpolate({
      inputRange: [0,1],
      outputRange: [0,0.4]
    })
    
    return (
      <AnimatedButton onPress={this.switchBtn.bind(this)} style={[styles.container,{height: animatedHeight}]}> 
          <AnimatedText style={[{fontSize:animatedFontSize},{color:animatedColor},{height: animatedMaxWidth},styles.songText]}>
            {this.props.songName} - {this.props.songArtist}
          </AnimatedText>
        <View style={{flexDirection:'row'}}>
          <Feather name="user" size={10}  style={[{marginRight: 4},styles.userText]}/>
          <Text style={styles.userText}>{this.props.mixerName}</Text>
        </View>
        { this.state.isOpen ?
          <AnimatedView style={[{height:animatedInfos},{alignItems:'center'}]}>
            <View style={{flexDirection:'row'}}>
              <MaterialCommunityIcons name="star-four-points-outline" size={10} color='grey' style={[{marginRight:2},{marginTop:1}]}/>
              <Text style={styles.userPoints}>190</Text>
            </View>
            <Text style={styles.timeLeft}>Song play in 02:12</Text>
          </AnimatedView> : null
        }
        {/* <AnimatedView style={[{height:animatedInfos},{alignItems:'center'}]}>
          <Text style={styles.userPoints}>190Pts</Text>
          <Text style={styles.timeLeft}>Song play in 02:12</Text>
        </AnimatedView> */}
     
             
      </AnimatedButton> 
    );
  }

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
      Animated.spring(this.state.animation, {
          toValue: 1,
          friction: 5,
          tension: 20,
      }).start();
  };
  closeAnim = () => {
    Animated.spring(this.state.animation, {
      toValue: 0,
      friction: 3,
      tension: 5,
  }).start();
};
}

const styles = StyleSheet.create({
  
  container:{
    margin: 10,
    marginBottom: 30,
    width: 250,
    height: 60,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 20,
 
    position: 'relative',
    alignItems: 'center',

    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    
    shadowRadius: 6.68,
    elevation: 11,
  },
  songText:{
    marginTop: 5,
    maxWidth: 220,
  },
  userText: {
    fontSize: 20,
    color: 'grey',
    marginTop: 0,
    color: '#EE4540',
    fontWeight: 'bold',
  },
  userPoints: {
    fontSize: 10,
    color: 'grey',
    fontStyle:'italic',
  },
  timeLeft: {
    fontSize: 15,
    color: 'grey',
    marginTop: 12,

  },
});
