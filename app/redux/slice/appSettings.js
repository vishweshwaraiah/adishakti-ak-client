import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  status: 'loading',
  menuType: 'floating',
};

export const toggleMenuStyle = createAsyncThunk(
  'toggleMenuStyle',
  async (newStatus, thunkAPI) => {
    try {
      await AsyncStorage.setItem('menuType', newStatus);
      return newStatus;
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to switch menu style');
    }
  }
);

//State slice
export const appSettings = createSlice({
  name: 'appSettings',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(toggleMenuStyle.fulfilled, (state, action) => {
      state.status = 'changed';
      state.menuType = action.payload;
    });
    builder.addCase(toggleMenuStyle.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(toggleMenuStyle.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload?.message;
    });
  },
});

export default appSettings.reducer;
