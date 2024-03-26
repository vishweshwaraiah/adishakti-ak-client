import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { server_uri } from '@/utils/Globals';

const initialState = {
  isLoading: false,
  isError: false,
  isDeleted: false,
  groupsList: [],
  message: '',
};

//State slice
export const numsGroups = createSlice({
  name: 'numsGroups',
  initialState,
  extraReducers: (builder) => {
    // Fetch numbers groups
    builder.addCase(fetchNumsGroups.fulfilled, (state, action) => {
      state.isLoading = false;
      state.groupsList = action.payload;
    });
    builder.addCase(fetchNumsGroups.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNumsGroups.rejected, (state, action) => {
      state.isError = true;
      console.log('Error: ', action);
    });

    // Add numbers group
    builder.addCase(addNumsGroups.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.groupsList.push(action.payload);
    });
    builder.addCase(addNumsGroups.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addNumsGroups.rejected, (state, action) => {
      state.isError = true;
      console.log('Error: ', action);
    });

    // Delete numers groups
    builder.addCase(deleteNumsGroup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isDeleted = true;
      state.message = 'Deleted successfully!';
      const filteredList = state.groupsList.filter(
        (x) => x.group_name !== action.payload.group_name
      );
      state.groupsList = filteredList;
    });
    builder.addCase(deleteNumsGroup.pending, (state, action) => {
      state.isDeleted = false;
      state.isLoading = true;
    });
    builder.addCase(deleteNumsGroup.rejected, (state, action) => {
      state.isDeleted = false;
      state.isError = true;
      console.log('Error: ', action);
    });
  },
});

export const fetchNumsGroups = createAsyncThunk('fetchNumsGroups', async () => {
  const response = await axios.get(server_uri + '/fetchgroups');
  return response.data;
});

export const addNumsGroups = createAsyncThunk(
  'addNumsGroups',
  async (groupData) => {
    const response = await axios.post(server_uri + '/creategroup', groupData);
    return response.data;
  }
);

export const deleteNumsGroup = createAsyncThunk(
  'deleteNumsGroup',
  async (groupData) => {
    const deleteUrl = `${server_uri}/delete/${groupData.group_name}`;
    const response = await axios.delete(deleteUrl);
    return response.data;
  }
);

export default numsGroups.reducer;
