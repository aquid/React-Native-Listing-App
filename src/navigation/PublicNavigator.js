import {createStackNavigator} from 'react-navigation';
import Login from '../components/Login';
import Signup from '../components/Signup'

const PublicNavigator = createStackNavigator(
    {
        Login: Login,
        Signup: Signup
    },
    {
        initialRouteName: 'Login'
    }
);

export default PublicNavigator;