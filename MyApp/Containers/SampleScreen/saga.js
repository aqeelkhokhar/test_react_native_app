import axios from '../../Utils/axiosConfig';
import {put, takeLatest, select} from 'redux-saga/effects';
import * as actions from './slice';

import {Location_WITH_VERSION} from '../../Constants/APIContants/ENDPOINTS';

function* SampleSaga() {
  try {
    const response = yield axios.get(`${Location_WITH_VERSION}`);
    yield put(actions.DataRequestSuccess(response?.data));
  } catch (error) {
    console.log(error, 'error');
    yield put(actions.DataRequestFailure(response?.data));
  }
}

export default function* () {
  yield takeLatest(actions.DataRequest, SampleSaga);
}
