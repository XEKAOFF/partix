import React, {Component} from 'react';
import { StyleSheet,ScrollView,StatusBar,Animated,TouchableOpacity , Text, View } from 'react-native';
import LeaderBoardItem from "../Components/LeaderBoardItem";
import AudioWave from "../Components/Audiowave";
import RateBar from "../Components/RateBar";
import {Entypo,Feather} from "@expo/vector-icons";
import '../global';
import {connect} from 'react-redux'
import SettingBar from '../Components/SettingBar';
import UsersArray from '../Components/UsersArray';
import { NavigationEvents } from 'react-navigation';

const AnimatedFeather = Animated.createAnimatedComponent(Feather);


class Leaderboard extends React.Component {
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
    tension: 20,
}).start()
};

goToMenu(){
  console.log('menu');
  this.props.navigation.navigate('PartyPage');
}

  render(){
    
    const animatedHeight = this.state.animation.interpolate({
      inputRange: [0,1],
      outputRange: [30,50]
    })
    return (
        <View style={styles.container}>
            <NavigationEvents onDidBlur={payload =>  this.refs._scrollView.scrollTo({y: 0,x:0,animated: true})} />
            <StatusBar translucent backgroundColor="black" />

            <SettingBar onClick={this.goToMenu} margin={30}></SettingBar>

            <View style={[styles.header,styles.shadow]}>
                <AudioWave style={styles.waveform} color='#ababab' playing={this.props.isPlaying}></AudioWave>
                <Text style={styles.currentMusic}>{this.props.title}</Text>
        
                  <TouchableOpacity style={styles.pauseBtn} onPressIn={this.handlePressIn.bind(this)} onPressOut={this.handlePressOut.bind(this)} onPress={this.props.togglePlay}>
                    {this.props.isPlaying ?
                      <AnimatedFeather name="pause"  style={[{fontSize:animatedHeight}]}/>
                    :
                      <AnimatedFeather name="play"  style={[{fontSize:animatedHeight},{marginLeft: 4}]}/>
                    }
                  </TouchableOpacity>
            
                <Text style={[{color: 'grey'},{fontWeight: 'bold'},{marginTop:90}]}>Leaderboard :</Text>
            </View>
            <ScrollView ref='_scrollView' showsVerticalScrollIndicator={false} style={styles.scroll} >

              <UsersArray />
              {/* <LeaderBoardItem userName='Kraxkan' points={356}></LeaderBoardItem>
              <LeaderBoardItem userName='Célian' points={320}></LeaderBoardItem>
              <LeaderBoardItem userName='Kraxkan' points={356}></LeaderBoardItem>
              <LeaderBoardItem userName='Célian' points={320}></LeaderBoardItem>
              <LeaderBoardItem userName='Kraxkan' points={356}></LeaderBoardItem>
              <LeaderBoardItem userName='Célian' points={320}></LeaderBoardItem>
              <LeaderBoardItem userName='Kraxkan' points={356}></LeaderBoardItem>
              <LeaderBoardItem userName='Célian' points={320}></LeaderBoardItem>
              <LeaderBoardItem userName='Jean-Charles' points={245}></LeaderBoardItem>
              <LeaderBoardItem userName='Anonymousse a raser' points={98}></LeaderBoardItem> */}
            </ScrollView>
           
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

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)

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
      header: {
        height: '30%',
        alignItems : 'center',
      },
      container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      },
      // scroll: {
      //   // position: 'absolute',
      //   // bottom: 0,
      //   // width: '100%',
      //   // justifyContent: 'center',
      //   backgroundColor: 'w'
      // },
      currentMusic:{
        color : 'black',
        fontWeight : 'bold',
        marginTop: 65,
        fontSize: 15,
      },
      waveform:{
          position: 'absolute',
          marginTop: 20,
      },
      pauseBtn:{
        position: 'absolute',
        marginTop: 100,
      },  
});
