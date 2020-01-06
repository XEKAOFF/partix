import React, {Component} from 'react';
import { StyleSheet,ScrollView,StatusBar,TextInput , Text, View } from 'react-native';
import SearchItem from "../Components/SearchItem";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import play from '../api/play';
import { connect } from 'react-redux';

class SongsArray extends Component {
    // componentDidMount() {
    //     console.log(this.props.userToken)
    //     // this.setState({
    //     //     token: this.props.userToken
    //     // })
    // }

    render() {
        var songs = this.props.songs;

        if ((!Array.isArray(songs) || songs === undefined || songs.length == 0)&&!this.props.isFetching) {
            return <MaterialCommunityIcons name="cloud-search-outline" size={130} color='#EE4540' style={{marginTop:50}}/>
        } else {
            var elems = songs[0].map((obj, index) => {
                // console.log(obj.title + " - " + obj.artist)
                return <SearchItem onChange={this.playSong.bind(this)} key={index} uri={obj.uri} songName={obj.title} songArtist={obj.artist} mixerName='Jacques'></SearchItem>
            })
            return elems
            // return <Text>{this.props.userToken}</Text>
        }
    }

    async playSong(uri){
        var res = await play({
          token: this.props.userToken,
          trackid: uri
        });
    }

}

const mapStateToProps = state => {
    return {
        userToken: state.userToken
    }
}

export default connect(mapStateToProps,null)(SongsArray)