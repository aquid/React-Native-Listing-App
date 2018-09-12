import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import PublicNavigator from './PublicNavigator';
import ProtectedNavigator from './ProtectedNavigator';
import AuthLoadingComponent from '../components/AuthLoading';

const RootNavigator =  createSwitchNavigator(
    {
        AuthLoading: AuthLoadingComponent,
        App: ProtectedNavigator,
        Auth: PublicNavigator,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default RootNavigator;