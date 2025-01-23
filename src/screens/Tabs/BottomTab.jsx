import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/HomeScreen';
import SearchScreen from '../Search/SearchScreen';
import LibraryScreen from '../Library/LibraryScreen';
import {SharedStateProvider} from '../../context/SharedStateContext';
import CustomTabBar from './CustomTabBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
};

export default BottomTab;
