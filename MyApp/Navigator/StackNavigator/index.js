import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreenName, LoginScreenName} from '../../Constants/ScreenName';
import HomeScreen from '../../Containers/Home';
import {TouchableOpacity} from 'react-native';
import {DrawerIcon} from '../../Constants/AppIcons';
import LoginScreen from '../../Containers/LoginScreen';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

const CustomDrawerIcon = ({navigation}) => (
  <TouchableOpacity
    onPress={() => {
      navigation.toggleDrawer();
    }}
    style={{marginLeft: 10}}>
    {DrawerIcon}
  </TouchableOpacity>
);

const Navigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Access the navigation state and print the hierarchy
    const unsubscribe = navigation.addListener('state', state => {
      console.log('Navigation State:stack', state);
      const {routeNames} = state.data.state;
      console.log('Navigation State:.........stack', routeNames);
    });

    // Clean up the event listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name={HomeScreenName}
          component={HomeScreen}
          options={({navigation}) => ({
            headerShown: true, //true when add item in drawer
            title: null,
            headerLeft: () => <CustomDrawerIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen name={LoginScreenName} component={LoginScreen} />
      </Stack.Navigator>
    </>
  );
};

export default Navigator;
