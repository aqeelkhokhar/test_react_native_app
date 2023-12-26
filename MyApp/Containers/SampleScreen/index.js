import React, {useEffect} from 'react';
import {Text, ActivityIndicator, SafeAreaView} from 'react-native';
import {useInjectReducer, useInjectSaga} from 'redux-injectors';
import {useDispatch, useSelector} from 'react-redux';

import SampleReducer, {DataRequest} from './slice';
import {SampleSelector} from './selector';
import SampleSaga from './saga';
import styles from './style';

const SampleScreen = () => {
  const {loading} = useSelector(SampleSelector);
  useInjectReducer({
    key: 'sample',
    reducer: SampleReducer,
  });
  useInjectSaga({key: 'sample', saga: SampleSaga});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DataRequest());
  }, []);

  if (loading === false) {
    return (
      <SafeAreaView>
        <Text>Welcom</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <ActivityIndicator size="small" color="red" />
    </SafeAreaView>
  );
};

export default SampleScreen;
