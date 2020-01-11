import React, {Component} from 'react';
import { StyleSheet,Animated,TouchableOpacity , Text, View } from 'react-native';

const AnimatedBar = Animated.createAnimatedComponent(View);

export default class AudioWave extends React.Component { 
    state = {
        animation1: new Animated.Value(0),
        animation2: new Animated.Value(0),
        animation3: new Animated.Value(0),
        animation4: new Animated.Value(0),
        animation5: new Animated.Value(0),
    };
    startAnimation1 = () => {
        Animated.timing(this.state.animation1, {
            toValue: 1,
            duration: 300,
        }).start(() => {
            Animated.timing(this.state.animation1, {
                toValue: 0,
                duration: 300,
            }).start(() => {
                if(this.props.playing)
                this.startAnimation1();
            });
        });
    };
    startAnimation2 = () => {
        Animated.timing(this.state.animation2, {
            toValue: 1,
            duration: 400,
        }).start(() => {
            Animated.timing(this.state.animation2, {
                toValue: 0,
                duration: 300,
            }).start(() => {
                if(this.props.playing)
                this.startAnimation2();
            });
        });
    };
    startAnimation3 = () => {
        Animated.timing(this.state.animation3, {
            toValue: 1,
            duration: 300,
        }).start(() => {
            Animated.timing(this.state.animation3, {
                toValue: 0,
                duration: 200,
            }).start(() => {
                if(this.props.playing)
                this.startAnimation3();
            });
        });
    };
    startAnimation4 = () => {
        Animated.timing(this.state.animation4, {
            toValue: 1,
            duration: 400,
        }).start(() => {
            Animated.timing(this.state.animation4, {
                toValue: 0,
                duration: 400,
            }).start(() => {
                if(this.props.playing)
                this.startAnimation4();
            });
        });
    };
    startAnimation5 = () => {
        Animated.timing(this.state.animation5, {
            toValue: 1,
            duration: 600,
        }).start(() => {
            Animated.timing(this.state.animation5, {
                toValue: 0,
                duration: 200,
            }).start(() => {
                if(this.props.playing)
                this.startAnimation5();
            });
        });
    };

    UNSAFE_componentWillReceiveProps(nextProp) {
        if (this.props.playing !== nextProp.playing) {
            if(!this.props.playing) {
                this.startAnimation1();
                this.startAnimation2();
                this.startAnimation3();
                this.startAnimation4();
                this.startAnimation5();
            }
        }
    }

    componentDidMount(){
        if(this.props.playing) {
            this.startAnimation1();
            this.startAnimation2();
            this.startAnimation3();
            this.startAnimation4();
            this.startAnimation5();
        }
    }
    render() { 
        const animatedHeight = this.state.animation1.interpolate({
            inputRange: [0,1],
            outputRange: [4,30]
        })
        const animatedHeight2 = this.state.animation2.interpolate({
            inputRange: [0,1],
            outputRange: [4,30]
        })
        const animatedHeight3 = this.state.animation3.interpolate({
            inputRange: [0,1],
            outputRange: [4,40]
        })
        const animatedHeight4 = this.state.animation4.interpolate({
            inputRange: [0,1],
            outputRange: [4,25]
        })
        const animatedHeight5 = this.state.animation5.interpolate({
            inputRange: [0,1],
            outputRange: [4,36]
        })
        
       
        return (
        <View style={[styles.container, {...this.props.style}]}> 
            <AnimatedBar style={[styles.bar,{height:animatedHeight},{backgroundColor: this.props.color}]}></AnimatedBar>
            <AnimatedBar style={[styles.bar,{height:animatedHeight2},{backgroundColor: this.props.color}]}></AnimatedBar>
            <AnimatedBar style={[styles.bar,{height:animatedHeight3},{backgroundColor: this.props.color}]}></AnimatedBar>
            <AnimatedBar style={[styles.bar,{height:animatedHeight4},{backgroundColor: this.props.color}]}></AnimatedBar>
            <AnimatedBar style={[styles.bar,{height:animatedHeight5},{backgroundColor: this.props.color}]}></AnimatedBar>
        </View> 
        );
    } 
}

const styles = StyleSheet.create({
  
  container:{
    
    height: 45,
    width: '100%',
    alignItems: 'center',

    justifyContent: 'center',
   
    flexDirection:'row',

  

  },
  bar:{
    width: 5,
    height: 30,
    backgroundColor: '#EE4540',
    margin: 4,
    borderRadius: 50,

  },
 
});
