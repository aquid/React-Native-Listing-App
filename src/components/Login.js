import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Expo from 'expo';
import axios from 'axios';
import AuthService from '../services/AuthService';
import FB_APP_ID from '../services/constants';

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
});

class LoginComponent extends React.Component {
    constructor(props){
       super(props);
       // this.authService = new AuthService();
       // this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    handleFacebookLogin () {
        Expo.Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
            permissions: [ 'email','user_photos','user_birthday','user_gender','user_location']
        })
            .then((result) => {
                console.log('result', result);
                if (result.isCancelled) {
                    console.log('Login cancelled');
                    return Promise.reject('Login Cancelled');
                } else {
                    console.log('Login success with permissions: ');
                    return axios.get(`https://graph.facebook.com/me?fields=id,email,name,gender,birthday,location,picture&access_token=${result.token}`);
                }
            })
            .then((response) => {
                console.log(response.data);
                let lbData = {};
                lbData.name = response.data.name;
                lbData.email = response.data.email;
                lbData.username = response.data.email;
                lbData.password = 'password';
                lbData.picture = response.data.picture ? response.data.picture.data.url : null;
                lbData.roles = ['student'];
                let authService = new AuthService();
                console.log(authService);
                return authService.singup(lbData)
            })
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                console.log('error', JSON.stringify(error));
            });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Welcome to the Facebook SDK for React Native!</Text>
                <Button onPress={this.handleFacebookLogin} title="Login With Facebook" color="#4267B2"/>
            </View>
        );
    }
}

export default LoginComponent;