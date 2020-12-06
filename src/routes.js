import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Gyms from './pages/Gyms';
import GymsStore from './pages/GymsStore';
import HomeScreen from './pages/HomeScreen';
import Register from './pages/Register';
import Map from './pages/Map';
import Profile from './pages/Profile';
import Students from './pages/Students';
import Training from './pages/Training';

const Routes = createAppContainer(
    createSwitchNavigator({
        HomeScreen,
        Login,
        Register,
        Gyms,
        GymsStore,
        Map,
        Profile,
        Students,
        Training
    })
);

export default Routes;