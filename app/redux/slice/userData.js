import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServerUri } from '@/utils/Globals';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  status: 'loading',
  user: {},
};

export const fetchUser = createAsyncThunk('fetchUser', async (thunkAPI) => {
  const token = await AsyncStorage.getItem('auth');
  const fetchUserUrl = ServerUri + '/get_user/' + token;

  try {
    const response = await axios.get(fetchUserUrl);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err; // Rethrow non-response errors
    }
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

//State slice
export const userData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
    },
  },
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
      state.message = action.payload?.message;
    });
  },
});

export const { clearUser } = userData.actions;

export default userData.reducer;
