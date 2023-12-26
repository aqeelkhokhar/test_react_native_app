import React, {Suspense, useEffect, useState} from 'react';
import {store} from './MyApp/Store';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import SplashScreen from 'react-native-splash-screen';
import ErrorBoundary from 'react-native-error-boundary';

import MyDrawer from './MyApp/Navigator/Drawer';
import {ActivityIndicator} from 'react-native-paper';
import * as Sentry from '@sentry/react-native';
import {SENTRY_KEY} from './MyApp/Constants/APIContants/BASE_URL';
import Toast from 'react-native-toast-message';
import * as Keychain from 'react-native-keychain';
import notifee, {EventType} from '@notifee/react-native';
import {isReadyRef, navigationRef, routeNameRef} from './rootNavigation';
import {Button, LogBox, View} from 'react-native';
import {Text, Alert, BackHandler} from 'react-native';
import RNRestart from 'react-native-restart';
import {
  HomeScreenName,
  LoginScreenName,
  NavigatorScreen,
} from './MyApp/Constants/ScreenName';

import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

LogBox.ignoreAllLogs();

const App = () => {
  const [loading, setLoading] = useState(true);

  Sentry.init({
    dsn: SENTRY_KEY,
    tracesSampleRate: 1.0,
    enableNative: false, // true by when you want to enable tracing
  });

  // Subscribe to events
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  // Bootstrap sequence function
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  setTimeout(() => {
    SplashScreen.hide();
  }, 3000);

  if (loading) {
    return null;
  }

  const errorHandler = (e, isFatal) => {
    console.log(isFatal, 'fatal error', e);
    if (isFatal) {
      Alert.alert(
        'Unexpected error occurred',
        `Error: ${isFatal ? 'Fatal' : ''} \n\n${e.name} ${
          e.message
        }\n\nWe have reported this to our team ! Please close the app and start again!`,

        [
          {
            text: 'Close App',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
          {
            text: 'Restart App',
            onPress: () => {
              RNRestart.Restart();
            },
          },
        ],
      );
    } else {
      console.log(e); // So that we can see it in the ADB logs in case of Android if needed
    }
  };

  setJSExceptionHandler(errorHandler);

  setNativeExceptionHandler(errorString => {
    console.log('Native exception handler', errorString);
    // we can also implement santery logs etc
    //You can do something like call an api to report to dev team here
  });

  const CustomFallback = (error, resetError) => (
    <View>
      <Text>Something happened!</Text>
      <Text>{error.toString()}</Text>
      <Button onPress={resetError} title={'Try again'} />
    </View>
  );

  const config = {
    screens: {
      Home: {
        screens: {
          Navigator: {
            screens: {
              'Login Screen': 'login',
            },
          },
        },
      },
    },
  };

  const linking = {
    prefixes: ['myapp://'],
    config,
  };

  return (
    <GluestackUIProvider>
      <Provider store={store}>
        <NavigationContainer
          linking={linking}
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            isReadyRef.current = true;
          }}>
          <Suspense fallback={<ActivityIndicator />}>
            <ErrorBoundary FallbackComponent={CustomFallback}>
              <MyDrawer />
            </ErrorBoundary>
            <Toast />
          </Suspense>
        </NavigationContainer>
      </Provider>
    </GluestackUIProvider>
  );
};

export default Sentry.wrap(App);
