import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServerUri } from '@/utils/Globals';

const initialState = {
  status: 'loading',
  isDeleted: false,
  groupsList: [],
  message: '',
};

export const fetchNumsGroups = createAsyncThunk('fetchNumsGroups', async () => {
  const response = await axios.get(ServerUri + '/fetchgroups');
  return response.data;
});

export const addNumsGroups = createAsyncThunk(
  'addNumsGroups',
  async (groupData, thunkAPI) => {
    const createUrl = `${ServerUri}/creategroup`;

    try {
      const response = await axios.post(createUrl, groupData);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err; // Rethrow non-response errors
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteNumsGroup = createAsyncThunk(
  'deleteNumsGroup',
  async (groupData) => {
    const deleteUrl = `${ServerUri}/delete/${groupData.group_name}`;
    const response = await axios.delete(deleteUrl);
    return response.data;
  }
);

//State slice
export const numsGroups = createSlice({
  name: 'numsGroups',
  initialState,
  extraReducers: (builder) => {
    // Fetch numbers groups
    builder.addCase(fetchNumsGroups.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.groupsList = action.payload;
    });
    builder.addCase(fetchNumsGroups.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchNumsGroups.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.error?.message;
    });

    // Add numbers group
    builder.addCase(addNumsGroups.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.message = action.payload.message;
      state.groupsList.push(action.payload);
    });
    builder.addCase(addNumsGroups.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addNumsGroups.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload?.message;
    });

    // Delete numbers groups
    builder.addCase(deleteNumsGroup.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.isDeleted = true;
      state.message = 'Deleted successfully!';
      const filteredList = state.groupsList.filter(
        (x) => x.group_name !== action.payload.group_name
      );
      state.groupsList = filteredList;
    });
    builder.addCase(deleteNumsGroup.pending, (state) => {
      state.isDeleted = false;
      state.status = 'loading';
    });
    builder.addCase(deleteNumsGroup.rejected, (state, action) => {
      state.isDeleted = false;
      state.status = 'error';
      state.message = action.error?.message;
    });
  },
});

export default numsGroups.reducer;
