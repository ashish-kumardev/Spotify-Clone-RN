import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/HomeScreen';
import SearchScreen from '../Search/SearchScreen';
import LibraryScreen from '../Library/LibraryScreen';
import {SharedStateProvider} from '../../context/SharedStateContext';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <SharedStateProvider>
      <Tab.Navigator
        screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
        initialRouteName="Home"
        tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
      </Tab.Navigator>
    </SharedStateProvider>
  );
};

export default BottomTab;
