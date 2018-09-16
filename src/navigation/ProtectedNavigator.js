import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements'
import Listing from '../components/Listing';
import Booking from '../components/Booking';
import Setting from '../components/Setting';

const ListingStack = createStackNavigator({
    Listing: Listing
});

const BookingStack = createStackNavigator({
    Booking: Booking
});

const SettingStack = createStackNavigator({
    Setting: Setting
});

const ProtectedNavigator = createBottomTabNavigator(
    {
        Listings : ListingStack,
        Bookings : BookingStack,
        Account : SettingStack
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                let iconName;
                const { routeName } = navigation.state;
                if(routeName === 'Listings') {
                    iconName = `view-list`;
                }
                else if(routeName === 'Bookings'){
                    iconName = `collections-bookmark`;
                }
                else {
                    iconName = `account-circle`
                }
                return <Icon name={iconName} size={25} color={tintColor} />;
            }
        }),
        tabBarOptions: {
            initialRouteName: 'Listing',
            activeTintColor: '#FF5252',
            inactiveTintColor: 'gray',
            style : {
                borderTopColor: '#FF5252'
            }
        }
    }
);

export default ProtectedNavigator;