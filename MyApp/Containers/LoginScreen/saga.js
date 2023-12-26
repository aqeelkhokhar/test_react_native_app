import axios from '../../Utils/axiosConfig';
import {put, takeLatest} from 'redux-saga/effects';
import * as actions from './slice';
import * as drawerAction from '../../Components/CustomDrawerContent/slice';

import {login_api} from '../../Constants/APIContants/ENDPOINTS';
import {setToken} from '../../Utils/secureStorage';
import {navigate} from '../../../rootNavigation';
import {HomeScreenName} from '../../Constants/ScreenName';
import showToast from '../../Components/ModelComponent';
import LoginScreenSagaDTO from './loginDTO';

function* LoginScreenSaga({payload}) {
  try {
    const response = yield axios.post(login_api, payload);
    const dto_response = yield LoginScreenSagaDTO(response?.data);
    yield setToken(dto_response?.access_token);
    yield put(drawerAction.setToken(dto_response?.access_token));
    yield put(actions.DataRequestSuccess(dto_response));
    yield showToast('Login Successfully');
    yield navigate(HomeScreenName);
  } catch (error) {
    console.log(error, 'error');
    yield put(actions.DataRequestFailure());
  }
}

export default function* () {
  yield takeLatest(actions.DataRequest, LoginScreenSaga);
}
