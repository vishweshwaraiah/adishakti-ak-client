import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProdServerUri } from '@/utils/Globals';
import AxiosInstance from '@/utils/AxiosInstance';

const initialState = {
  status: 'loading',
  token: null,
  message: '',
};

export const registerUser = createAsyncThunk(
  'registerUser',
  async (userData, thunkAPI) => {
    const registerUrl = ProdServerUri + '/register';

    try {
      const response = await AxiosInstance.post(registerUrl, userData);
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
    const loginUrl = ProdServerUri + '/login';

    try {
      const response = await AxiosInstance.post(loginUrl, userData);
      return response.data;
    } catch (err) {
      console.log('error', err);
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//State slice
export const authData = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = 'loading';
      state.token = null;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    // register a user
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'registered';
      state.message =
        action.payload.message + ' for id ' + action.payload.userEmail;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'registering';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload?.message;
    });

    // login a user
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'loggedin';
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
      state.status = 'loading';
      state.token = null;
      state.message = '';
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

export const { resetState } = authData.actions;

export default authData.reducer;
