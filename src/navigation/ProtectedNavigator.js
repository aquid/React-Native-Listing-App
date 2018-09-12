import { createStackNavigator } from 'react-navigation';
import Home from '../components/Home'

const ProtectedNavigator = createStackNavigator({
    Login: {
        screen: Home
    }
});

export default ProtectedNavigator;