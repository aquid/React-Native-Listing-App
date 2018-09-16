import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, TouchableOpacity } from 'react-native';
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
       this.redirectToSignup = this.redirectToSignup.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    handleFacebookLogin () {
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
                let dates = response.data.birthday.split('/');
                let lbData = {};
                lbData.email = response.data.email;
                lbData.password = `${response.data.name.substr(0,5)}${dates[1]}${dates[0]}`;
                lbData.ttl = -1;
                return authService.login(lbData);
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

    redirectToSignup = () => {
        this.props.navigation.navigate('Signup');
    };


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Welcome to the Book My Apartment App!</Text>
                <Button onPress={this.handleFacebookLogin} title="Facebook Login" color="#4267B2"/>
                <TouchableOpacity style={styles.redirectText} onPress={this.redirectToSignup}>
                    <Text style={styles.clickText}>Not a member yet? Signup!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default LoginComponent;