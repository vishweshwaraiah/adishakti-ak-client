import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ServerUri } from '@/utils/Globals';

const initialState = {
  status: 'loading',
  token: null,
  message: '',
};

export const registerUser = createAsyncThunk(
  'registerUser',
  async (userData, thunkAPI) => {
    const registerUrl = ServerUri + '/register';

    try {
      const response = await axios.post(registerUrl, userData);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err; // Rethrow non-response errors
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'loginUser',
  async (userData, thunkAPI) => {
    const loginUrl = ServerUri + '/login';

    try {
      const response = await axios.post(loginUrl, userData);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err; // Rethrow non-response errors
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'logoutUser',
  async (_, thunkAPI) => {
    try {
      await AsyncStorage.removeItem('auth');
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      if (!err.response) {
        throw err; // Rethrow non-response errors
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//State slice
export const authData = createSlice({
  name: 'authData',
  initialState,
  extraReducers: (builder) => {
    // register a user
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.message = action.payload.message;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload?.message;
    });

    // login a user
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload?.message;
    });

    // logout a user
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.token = null;
    });
    builder.addCase(logoutUser.pending, (state, action) => {
      state.token = null;
      state.status = 'loading';
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload?.message;
    });
  },
});

export default authData.reducer;
