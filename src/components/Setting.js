import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';

class SettingComponent extends React.Component {
    static navigationOptions = {
        title: 'Setting',
        headerStyle: {
            backgroundColor: '#1976D2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Profile Screen</Text>
                <Button title="Actually, sign me out" onPress={this._signOutAsync} />
            </View>
        );
    }
}

export default SettingComponent;