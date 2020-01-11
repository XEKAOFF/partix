import React, {Component} from 'react';
import { StyleSheet,TouchableOpacity, Animated , Text, View } from 'react-native';
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);

export default class LeaderBoardItem extends React.Component { 
  state = {
    animation: new Animated.Value(1),
  };
  
  handlePressIn = () => {
      Animated.spring(this.state.animation, {
        toValue: 0,
    }).start(() => {
      
      
      });
  };
  handlePressOut = () => {
    Animated.spring(this.state.animation, {
      toValue: 1,
      friction: 2,
      tension: 3,
  }).start()
  };
  
  render() { 
    
    const animatedHeight = this.state.animation.interpolate({
      inputRange: [0,1],
      outputRange: [80,60]
    })

    return (
      <AnimatedBtn onPressOut={this.handlePressOut.bind(this)} onPressIn={this.handlePressIn.bind(this)} style={[styles.container,{height:animatedHeight}]}> 
            <Text style={[styles.userIndex]}>
                #1
            </Text>
        <View style={styles.userInfo}>
          <Text style={[styles.userText]}>
            {this.props.userName}
            </Text>
        </View>
        <View style={[{marginTop:-4},{flexDirection:'row'}]}>
          <MaterialCommunityIcons name="star-four-points-outline" size={15} color='#EE4540' style={{marginTop:5}}/>       
          <Text style={[styles.userPoints]}>
             {this.props.points}
          </Text>
        </View>
      </AnimatedBtn> 
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
    margin: 0,
    marginBottom: 30,
    width: 250,
    height: 60,
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 20,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  userInfo:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 245,
    height: 30,
  },
  userText:{
    maxWidth: 220,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  userIndex:{
    marginLeft: 30,
    position: 'absolute',
    right: 15,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  userPoints:{
    fontSize: 20,
    color: '#EE4540',
    fontWeight: 'bold',
  },
});
