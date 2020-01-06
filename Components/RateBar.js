import React, {Component} from 'react';
import { StyleSheet,Animated,TouchableOpacity , Text, View } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";


export default class RateBar extends Component {

    state = {
        liked: false,
        disliked: false
    }

    render(){
        return(
            <View style={[styles.rateSlot,{...this.props.style}]}>
            
            {this.state.liked ? 
            <TouchableOpacity onPress={this.onLike} style={styles.rateButtons} hitSlop={{top: 20, bottom: 20, left: 50, right: 20}}>
              <AntDesign name="heart" size={10} color="#e36464" style={styles.rateButtonsSymbole}/>
              <Text style={[styles.rateButtonsText, styles.btnLeft, {color:'#e36464'}]}>{this.props.likes}</Text>
            </TouchableOpacity> : 
            <TouchableOpacity onPress={this.onLike} style={styles.rateButtons} hitSlop={{top: 20, bottom: 20, left: 50, right: 20}}>
              <AntDesign name="hearto" size={32} color="black" style={styles.rateButtonsSymbole}/>
              <Text style={[styles.rateButtonsText, styles.btnLeft]}>{this.props.likes}</Text>
            </TouchableOpacity>}
            
            {this.state.disliked ?
            <TouchableOpacity onPress={this.onDislike} style={styles.rateButtons} hitSlop={{top: 20, bottom: 20, left: 20, right: 50}}>
              <MaterialCommunityIcons name="thumb-down" size={32} color="#ffaf59" style={styles.rateButtonsSymbole}/>
              <Text style={[styles.rateButtonsText, styles.btnRight, {color:'#ffaf59'}]}>{this.props.dislikes}</Text>
            </TouchableOpacity> : <TouchableOpacity onPress={this.onDislike} style={styles.rateButtons} hitSlop={{top: 20, bottom: 20, left: 20, right: 50}}>
              <MaterialCommunityIcons name="thumb-down-outline" size={32} color="black" style={styles.rateButtonsSymbole}/>
              <Text style={[styles.rateButtonsText, styles.btnRight]}>{this.props.dislikes}</Text>
            </TouchableOpacity>}
            
            
          </View>
        );
    }

    
    onLike = () => {
        this.setState({
            liked: !this.state.liked,
            disliked: false
        });
    }
    onDislike = () => {
        this.setState({
            disliked: !this.state.disliked,
            liked: false
        });
    }
}

const styles = StyleSheet.create({
    rateSlot:{
        height: 30,
        width: '100%',
        zIndex: 10,
        // backgroundColor: 'red',
        // top: '50',
        // alignItems: 'flex-start',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection:'row',
        paddingLeft: 40,
    },
    rateButtons:{
        minWidth: 70,
        maxWidth: 70,
        // backgroundColor: 'orange',
        // marginHorizontal: 60,
    },
    rateButtonsSymbole:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    rateButtonsText:{
        width: 50,
        fontSize: 30,
        fontWeight: 'bold',
        // backgroundColor: 'red',
        left: 35,
        bottom: 4,
        fontSize: 20,
        textAlignVertical: 'center',
        position: 'absolute',
    },
    btnLeft: {
        left: 37,
    },
    btnRight: {
        textAlign: 'right',
        left: -57
    }
});