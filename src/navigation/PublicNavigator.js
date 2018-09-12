import { createStackNavigator } from 'react-navigation';
import Login from '../components/Login'

const PublicNavigator = createStackNavigator({
    Login: {
        screen: Login
    }
});

export default PublicNavigator;