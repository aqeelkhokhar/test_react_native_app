import React, {useEffect} from 'react';
import {View, ImageBackground, Text, ActivityIndicator} from 'react-native';
import {useInjectReducer, useInjectSaga} from 'redux-injectors';
import {useDispatch, useSelector} from 'react-redux';
import * as Keychain from 'react-native-keychain';

import HomeReducer, {HomeRequest} from './slice';
import {HomeSelector} from './selector';
import HomeSaga from './saga';
import styles from './style';

import Background from '../../Assets/Images/background.png';
import {Box, Center, HStack} from '@gluestack-ui/themed';
import FastImage from 'react-native-fast-image';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  useInjectReducer({key: 'home', reducer: HomeReducer});
  useInjectSaga({key: 'home', saga: HomeSaga});
  const navigation = useNavigation();

  useEffect(() => {
    // Access the navigation state and print the hierarchy
    const unsubscribe = navigation.addListener('state', state => {
      console.log('Navigation State:', state);
      const {routes} = state.data.state;
      console.log('Navigation State:.........', routes);
    });

    // Clean up the event listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);

  const dispatch = useDispatch();

  const {Data, loading} = useSelector(HomeSelector);

  const fetchLocationsData = () => {
    dispatch(HomeRequest());
  };

  async function onAppBootstrap() {
    // Register the device with FCM
    await notifee.requestPermission();
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();
    console.log('token generated', token);
    // Save the token
    // await postToApi('/users/1234/tokens', {token});
  }

  useEffect(() => {
    // onAppBootstrap();
    fetchLocationsData();
  }, []);

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  // Retreive the stored credentials from keychain or shared preferences
  // useEffect(() => {
  //   async function MyKeyChain() {
  //     try {
  //       const credentials = await Keychain.getGenericPassword({
  //         service: 'mytoken',
  //       });
  //       if (credentials) {
  //         console.log(
  //           credentials?.password,
  //           'Credentials successfully loaded for user ' + credentials.username,
  //         );
  //       } else {
  //         console.log('No credentials stored');
  //       }
  //     } catch (error) {
  //       console.log("Keychain couldn't be accessed!", error);
  //     }
  //     await Keychain.resetGenericPassword();
  //   }
  //   MyKeyChain();
  // }, []);

  if (!loading) {
    return (
      <Box flex={1}>
        <ImageBackground
          style={styles.imageBackgroundStyle}
          source={Background}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.companyText}>Pikessoft BoilerPlate</Text>
          <Box
            p="$5"
            m="$2"
            mt="80%"
            bg="$primary200"
            mb={50}
            borderTopLeftRadius="$lg"
            borderBottomRightRadius="$md"
            width="95%"
            alignItems="center">
            <HStack
              justifyContent="space-between"
              alignContent="center"
              width="100%">
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  fontSize: 20,
                }}>
                Contributors
              </Text>
              <FastImage
                style={{width: 70, height: 70, borderRadius: 35}}
                source={{
                  uri: 'https://avatars.githubusercontent.com/u/95348365?s=400&u=93dd4d6b6f16619adcbecfe9ee7c3134ca005b04&v=4',
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </HStack>
          </Box>
        </ImageBackground>
      </Box>
    );
  }

  return (
    <Center flex={1}>
      <ActivityIndicator size="large" color="#00A4A3" />
    </Center>
  );
};

export default HomeScreen;
