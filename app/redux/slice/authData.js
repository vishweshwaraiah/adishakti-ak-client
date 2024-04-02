import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

//State slice
export const authData = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = null;
    },
  },
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
  },
});

export const { clearToken } = authData.actions;

export default authData.reducer;
