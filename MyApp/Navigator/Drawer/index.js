import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from '../TabsNavigator';
import {HomeScreenName} from '../../Constants/ScreenName';
import CustomDrawerContent from '../../Components/CustomDrawerContent';
import {useNavigation} from '@react-navigation/native';
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Access the navigation state and print the hierarchy
    const unsubscribe = navigation.addListener('state', state => {
      console.log('Navigation State: drawer', state);
      // const {routeNames} = state.data.state;
      // console.log('Navigation State:.........drawer', routeNames);
    });

    // Clean up the event listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);
  return (
    <Drawer.Navigator
      initialRouteName="TabNavigator"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={HomeScreenName}
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
