import {createSlice} from '@reduxjs/toolkit';

const LoginScreenSlice = createSlice({
  name: 'login',
  initialState: {loading: false, data: []},
  reducers: {
    DataRequest: state => {
      state.loading = true;
    },
    DataRequestSuccess: (state, {payload}) => {
      state.loading = false;
      state.data = payload;
    },
    DataRequestFailure: state => {
      state.loading = false;
    },
  },
});

export const {DataRequest, DataRequestSuccess, DataRequestFailure} =
  LoginScreenSlice.actions;

export default LoginScreenSlice.reducer;
