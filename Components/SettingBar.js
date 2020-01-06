import React, {Component} from 'react';
import { StyleSheet,Animated,TouchableOpacity , Text, View, Alert } from 'react-native';
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";


export default class SettingBar extends Component {

    render(){
        return(
            <View style={[styles.container,{marginTop: this.props.margin}]}>
                <TouchableOpacity onPress={this.onQuit.bind(this)} style={styles.leaveBtn} hitSlop={{top: 20, bottom: 20, left: 20, right: 50}}>
                    <FontAwesome name="angle-left" size={30} color="#adadad" />
                </TouchableOpacity>
                <TouchableOpacity  style={styles.settingBtn} hitSlop={{top: 20, bottom: 20, left: 20, right: 50}}>
                    <Entypo name="sound-mix" size={20} color="#adadad" />
                </TouchableOpacity>
            </View>
        );
    }
    onQuit(){
        Alert.alert(
            'Hey there !',
            'Do you really want to leave this party ?',
            [
              {text: 'Yes sure !', 
              onPress: () => this.goToMenu.bind(this),
              style:'destructive'},
              {
                text: 'No !',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
            {cancelable: true},
          );
    }
    goToMenu(){
        console.log('menu');
        this.props.navigation.navigate('PartyPage');
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        position: "absolute",
    },
    leaveBtn:{
        marginLeft: 10,
        marginTop: -6,
    },
    settingBtn:{
        right: 10,
        position: "absolute",
    }
});