import React, {useEffect, useMemo} from 'react';
import {Button, SafeAreaView} from 'react-native';
import {useInjectReducer, useInjectSaga} from 'redux-injectors';
import {useDispatch, useSelector} from 'react-redux';
import {HomeScreenName, LoginScreenName} from '../../Constants/ScreenName';
import drawerStyle from './style';
import {Text, Box, Center} from '@gluestack-ui/themed';

import DrawerReducer, {DataRequest, setToken} from './slice';
import {DrawerSelector} from './selector';
import DrawerSaga from './saga';
import {getToken} from '../../Utils/secureStorage';

const CustomDrawerContent = ({navigation}) => {
  const {loading, Data, token} = useSelector(DrawerSelector);

  useInjectReducer({
    key: 'drawer',
    reducer: DrawerReducer,
  });
  useInjectSaga({key: 'drawer', saga: DrawerSaga});

  const dispatch = useDispatch();

  useMemo(async () => {
    const access_token = await getToken();
    console.log('inside drawer get token functin', access_token);
    dispatch(setToken(access_token));
  }, [navigation]);

  const styles = drawerStyle();
  function handleLogout() {
    navigation.closeDrawer();
    dispatch(DataRequest());
    console.log('logout');
  }
  function handleLogin() {
    navigation.navigate(LoginScreenName);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Box flex={1}> */}
      <Button
        title="Home"
        onPress={() => navigation.navigate(HomeScreenName)}
      />

      <Box mb={17} style={{flex: 1, justifyContent: 'flex-end'}}>
        <Center>
          {token ? (
            <Text size="lg" style={{color: 'red'}} onPress={handleLogout}>
              Logout
            </Text>
          ) : (
            <Text size="lg" style={{color: 'green'}} onPress={handleLogin}>
              Login
            </Text>
          )}
        </Center>
      </Box>
      {/* </Box> */}
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
