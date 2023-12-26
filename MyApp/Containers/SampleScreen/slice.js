import {createSlice} from '@reduxjs/toolkit';

const SampleSlice = createSlice({
  name: 'sample',
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
  SampleSlice.actions;

export default SampleSlice.reducer;
