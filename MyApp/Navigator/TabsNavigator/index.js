import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Navigator from '../StackNavigator';
import {NavigatorScreen} from '../../Constants/ScreenName';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Access the navigation state and print the hierarchy
    const unsubscribe = navigation.addListener('state', state => {
      console.log('Navigation State:tab', state);
      const {routeNames} = state.data.state;
      console.log('Navigation State:.........tab', routeNames);
    });

    // Clean up the event listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={NavigatorScreen}
        component={Navigator}
        options={{headerShown: false, tabBarStyle: {display: 'none'}}} // enble bottom tab when needed
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
