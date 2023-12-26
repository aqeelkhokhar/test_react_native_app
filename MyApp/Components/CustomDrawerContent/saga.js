import axios from '../../Utils/axiosConfig';
import {put, takeLatest} from 'redux-saga/effects';
import * as actions from './slice';

import {logout_api} from '../../Constants/APIContants/ENDPOINTS';
import showToast from '../ModelComponent';
import {navigate} from '../../../rootNavigation';
import {HomeScreenName} from '../../Constants/ScreenName';
import {removeToken} from '../../Utils/secureStorage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

function* DrawerSaga() {
  try {
    const response = yield axios.post(logout_api);
    yield showToast(response?.data?.message);
    yield removeToken();
    yield put(actions.setToken(''));
    yield put(actions.DataRequestSuccess());
    const isSignedIn = yield GoogleSignin.isSignedIn();
    yield isSignedIn && GoogleSignin.signOut();
    yield navigate(HomeScreenName);
  } catch (error) {
    yield showToast(error?.message);
    yield put(actions.DataRequestFailure());
  }
}

export default function* () {
  yield takeLatest(actions.DataRequest, DrawerSaga);
}
