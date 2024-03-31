import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServerUri } from '@/utils/Globals';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  status: 'loading',
  user: {},
};

export const fetchUser = createAsyncThunk('fetchUser', async () => {
  const token = await AsyncStorage.getItem('auth');
  const uri = ServerUri + '/get_user/' + token;

  const response = await axios.get(uri);

  return response.data;
});

//State slice
export const userData = createSlice({
  name: 'userData',
  initialState,
  extraReducers: (builder) => {
    // register a user
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.user = action.payload;
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = 'error';
      console.log('Error: ', action);
    });
  },
});

export default userData.reducer;
