import {createSlice} from '@reduxjs/toolkit';

const DrawerSlice = createSlice({
  name: 'drawer',
  initialState: {loading: false, data: [], token: null},
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
    setToken: (state, {payload}) => {
      state.token = payload;
    },
  },
});

export const {DataRequest, DataRequestSuccess, DataRequestFailure, setToken} =
  DrawerSlice.actions;

export default DrawerSlice.reducer;
