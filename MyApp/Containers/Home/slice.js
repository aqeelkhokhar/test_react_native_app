import {createSlice} from '@reduxjs/toolkit';

const HomeSlice = createSlice({
  name: 'home',
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    HomeRequest: state => {
      state.loading = true;
    },
    HomeRequestSuccess: (state, {payload}) => {
      state.data = payload;
      state.loading = false;
    },
    HomeRequestFailure: state => {
      state.loading = false;
    },
  },
});

export const {HomeRequest, HomeRequestSuccess, HomeRequestFailure} =
  HomeSlice.actions;

export default HomeSlice.reducer;
