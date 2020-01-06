import React, {Component} from 'react';
import { StyleSheet,ScrollView,StatusBar,TextInput , Text, View, TouchableOpacity } from 'react-native';
import SearchItem from "../Components/SearchItem";
import AudioWave from "../Components/Audiowave";
import RateBar from "../Components/RateBar";
import SongsArray from "../Components/SongsArray";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import token from '../api/token';
import search from '../api/search';
import {connect} from 'react-redux';
import { AuthSession } from "expo";
import { NavigationEvents } from 'react-navigation';

const SPOTIFY_CLIENT_ID = "aa74cce4969446f58a31435f8d08a1a3";

class SearchSong extends Component {  

  _isMounted = false;

  state = {
    token: null,
    isTokenFetching: false,
    songs: [],
    offset: 0,
    query: '',
    isFetching: false,
    isEmpty: true,
    isTokenFetching: false,
    result: null
  }

  async refreshToken() {
    if(this._isMounted) {
      this.setState({
        isTokenFetching: true,
      });
    }

    const newToken = await token();
    if(this._isMounted) {
    this.setState({
      token: newToken,
      isTokenFetching: false,
    })}
  }

  connectToSpotify = async () => {
    let redirectUrl = encodeURIComponent(AuthSession.getRedirectUrl());
    let result = await AuthSession.startAsync(
       {
        
        authUrl:
          `https://accounts.spotify.com/authorize?response_type=code`  +
          `&client_id=${SPOTIFY_CLIENT_ID}` +
          `&scope=user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing` +
          `&redirect_uri=${redirectUrl}`,
      }
    );

    var res = await token({code: result.params.code, uri: redirectUrl});

    // console.log("=================")
    // console.log(res)
    // console.log("=================")

    this.props.connect(res);
    // var json = JSON.parse(result);
  };

  

  async loadSongs() {
    const { songs, offset, query, isFetching, isEmpty } = this.state;

    const token = this.props.userToken;

    if (isFetching || isEmpty) {
      return;
    }

    if(this._isMounted)
      this.setState({ isFetching: true });
    
    const newSongs = await search({
      offset: 0,
      limit: 5,
      q: query,
      token,
    });

    if (newSongs.length === 0) {
      console.log('no songs found. there may be an error');
      this.setState({ isEmpty: true });
    }

    if(this._isMounted) {
      this.setState({
        isFetching: false,
        songs: [newSongs]
      });
    }
  }

  handleSearchChange(text) {
    if(text == '') {
      return;
    }
    // reset state
    this.setState({
      isEmpty: false,
      query: text,
      offset: 0,
      songs: [],
    }, () => {
      this.loadSongs();
      // console.log('search text is', text);
    });

  }

  async componentDidMount() {
    this._isMounted = true;
    // await this.refreshToken();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render(){
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <NavigationEvents onDidBlur={payload =>  this.refs._scrollView.scrollTo({y: 0,x:0,animated: true})} />
            <View style={[styles.header,styles.shadow]}>
                <AudioWave style={styles.waveform} color='#ababab' playing={this.props.isPlaying}></AudioWave>
                <Text style={styles.currentMusic}>{this.props.userToken}</Text>
            </View>
            
            <View style={[styles.bottomSlot]}>
                <TextInput onChangeText={newtext => this.handleSearchChange(newtext)} style={styles.textField} 
                placeholderTextColor='#c4c4c4' 
                placeholder='Search and add to the playlist'
                clearButtonMode='while-editing'
                keyboardAppearance='dark'
                keyboardType= 'web-search'
                selectionColor= 'orange'
                ></TextInput>
                {this.state.result ? <Text style={{color: 'white'}}>{JSON.stringify(this.state.result)}</Text> : null}
                <TouchableOpacity style={{backgroundColor: 'red'}} onPress={this.connectToSpotify}><Text>CONNECT</Text></TouchableOpacity>
                <ScrollView ref='_scrollView' contentContainerStyle={[{flexGrow : 1,alignItems: 'center'}]}>
                    {(this.state.isEmpty) ? 
                      <Text style={styles.resultText}></Text>
                    :
                      <Text style={styles.resultText}>Results</Text>
                    }

                    <SongsArray songs={this.state.songs} notFound={this.state.isFetching}></SongsArray>
                </ScrollView>
            </View>
        </View>

    );
  }
 
 
}

const mapStateToProps = state => {
  return {
    isPlaying: state.isPlaying,
    userToken: state.userToken,
    title: state.title,
    likes: state.likes,
    dislikes: state.dislikes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    connect: (userToken) => dispatch({ type: 'CONNECT', userToken })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSong)

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
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      },
      header: {
        height: '30%',
        alignItems : 'center',
      },
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
    textField:{
        position: "relative",
        marginTop: -15,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'grey',
        width: 250,
        height: 30,
        borderRadius: 15,
        paddingHorizontal: 10,
        zIndex: 20,
    },
    bottomSlot: {
        flex: 1,
        backgroundColor: '#1d1427',
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80%',
        borderTopLeftRadius: 30,
    },
    resultText:{
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10,
    },
});
