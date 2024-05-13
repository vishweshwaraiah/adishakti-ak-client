import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProdServerUri } from '@/utils/Globals';
import AxiosInstance from '@/utils/AxiosInstance';

const initialState = {
  status: 'loading',
  menuType: '',
  appTheme: '',
  userEmail: '',
};

export const updateAppSettings = createAsyncThunk(
  'updateAppSettings',
  async (appSettings, thunkAPI) => {
    const updatePrefsUrl = ProdServerUri + 'update_settings';

    const { userEmail } = appSettings;

    if (!userEmail) {
      console.log('Email is required!');
      return false;
    }

    try {
      const response = await AxiosInstance.put(updatePrefsUrl, appSettings);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err; // Rethrow non-response errors
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchAppSettings = createAsyncThunk(
  'fetchAppSettings',
  async (userEmail, thunkAPI) => {
    if (!userEmail) {
      console.log('Email is required!');
      return false;
    }

    const fetchSettingsUrl = ProdServerUri + 'fetch_settings/' + userEmail;

    try {
      const response = await AxiosInstance.get(fetchSettingsUrl);
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
export const appSettings = createSlice({
  name: 'appSettings',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAppSettings.fulfilled, (state, action) => {
      state.appTheme = action.payload?.appTheme;
      state.menuType = action.payload?.menuStyle;
      state.userEmail = action.payload?.userEmail;
    });
    builder.addCase(fetchAppSettings.rejected, (state) => {
      state.status = 'error';
    });

    // update user preferences
    builder.addCase(updateAppSettings.fulfilled, (state, action) => {
      state.appTheme = action.payload?.appTheme;
      state.menuType = action.payload?.menuStyle;
      state.userEmail = action.payload?.userEmail;
    });
    builder.addCase(updateAppSettings.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export default appSettings.reducer;
