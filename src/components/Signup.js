import React from 'react';
import {View, Text, StyleSheet, Button, AsyncStorage, TouchableOpacity} from 'react-native';
import Expo from 'expo';
import axios from 'axios';
import AuthService from '../services/AuthService';
import {FB_APP_ID} from '../services/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#03A9F4',
    },
    label: {
        fontSize: 16,
        fontWeight: 'normal',
        marginBottom: 48,
    },
    redirectText: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#03A9F4',
        padding: 0,
        marginTop: 20
    },
    clickText: {
        color: '#757575'
    }
});

class LoginComponent extends React.Component {
    constructor(props){
        super(props);
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    handleFacebookLogin () {
        let userObject = {};
        let authService = new AuthService();
        Expo.Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
            permissions: [ 'email','user_photos','user_birthday','user_gender','user_location']
        })
            .then((result) => {
                if (result.isCancelled) {
                    return Promise.reject('Login Cancelled');
                } else {
                    return axios.get(`https://graph.facebook.com/me?fields=id,email,name,gender,birthday,location,picture&access_token=${result.token}`);
                }
            })
            .then((response) => {
                let lbData = {};
                let dates = response.data.birthday.split('/');
                lbData.name = response.data.name;
                lbData.email = response.data.email;
                lbData.username = response.data.email;
                lbData.password = `${response.data.name.substr(0,5)}${dates[1]}${dates[0]}`;
                lbData.picture = response.data.picture ? response.data.picture.data.url : null;
                lbData.roles = ['student'];
                userObject = lbData;
                return authService.singup(lbData)
            })
            .then(() => {
                let lbLogin = {
                    email: userObject.email,
                    password: userObject.password,
                    ttl: -1
                };
                return authService.login(lbLogin);
            })
            .then((token) => {
                return AsyncStorage.setItem('accessToken', token.data.id);
            })
            .then( () => {
                this.props.navigation.navigate('App');
            })
            .catch((error) => {
                console.log('error from server', JSON.stringify(error));
            });
    }

    redirectToLogin = () => {
        this.props.navigation.navigate('Login');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Welcome to the Facebook SDK for React Native!</Text>
                <Button onPress={this.handleFacebookLogin} title="Signup with Facebook" color="#4267B2"/>
                <TouchableOpacity style={styles.redirectText} onPress={this.redirectToLogin}>
                    <Text style={styles.clickText}>Already Signed up? Login!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default LoginComponent;