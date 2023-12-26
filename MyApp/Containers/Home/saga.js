import axios from '../../Utils/axiosConfig';
import {put, takeLatest, select} from 'redux-saga/effects';
import * as actions from './slice';

import {Location_WITH_VERSION} from '../../Constants/APIContants/ENDPOINTS';
import {getToken} from '../../Utils/secureStorage';
import showToast from '../../Components/ModelComponent';

function* HomeSaga() {
  try {
    const access_token = yield getToken();
    console.log('Access token: ' + access_token);
    yield put(actions.HomeRequestFailure());
    // const response = yield axios.get(`${Location_WITH_VERSION}`);
    // yield put(actions.HomeRequestSuccess(response?.data));
  } catch (error) {
    console.log(error, 'error');
    yield showToast(error?.message);
    yield put(actions.HomeRequestFailure());
  }
}

export default function* () {
  yield takeLatest(actions.HomeRequest, HomeSaga);
}
