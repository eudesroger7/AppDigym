import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Gyms from './pages/Gyms';
import HomeScreen from './pages/HomeScreen';
import Register from './pages/Register';

const Routes = createAppContainer(
    createSwitchNavigator({
        HomeScreen,
        Login,
        Register,
        Gyms,
    })
);

export default Routes;