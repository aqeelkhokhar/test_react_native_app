import {createSlice} from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    loading: false,
  },
  reducers: {
    getLoadingRequest: state => {
      state.loading = true;
    },
  },
});

export const {getLoadingRequest} = globalSlice.actions;

export default globalSlice.reducer;
