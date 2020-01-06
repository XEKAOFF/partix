import React, {Component} from 'react';
import { StyleSheet,ScrollView,StatusBar,TextInput , Text, View } from 'react-native';
import LeaderBoardItem from "../Components/LeaderBoardItem";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { connect } from 'react-redux';

class UsersArray extends Component {
    render() {
        let users = this.props.connectedUsers;
        if (!Array.isArray(users) || users === undefined || users.length == 0) {
            return <Text>No users connected</Text>
        } else {
            var elems = users.map((obj, index) => {
                return <LeaderBoardItem key={index} userName={obj} points={666}></LeaderBoardItem>
            })
            return elems
        }
    }
}

const mapStateToProps = state => {
    return {
        connectedUsers: state.connectedUsers
    }
}

export default connect(mapStateToProps,null)(UsersArray)