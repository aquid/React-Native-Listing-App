import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';

class BookingComponent extends React.Component {
    static navigationOptions = {
        title: 'Booking',
        headerStyle: {
            backgroundColor: '#1976D2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Booking Screen</Text>
            </View>
        );
    }
}

export default BookingComponent;