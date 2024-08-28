import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProdServerUri } from '@/utils/Globals';
import AxiosInstance from '@/utils/AxiosInstance';

const initialState = {
  status: 'initial',
  isDeleted: false,
  groupsList: [],
  message: '',
};

export const fetchNumsGroups = createAsyncThunk(
  'fetchNumsGroups',
  async (_, thunkAPI) => {
    const fetchUrl = ProdServerUri + '/fetchgroups';

    try {
      const response = await AxiosInstance.get(fetchUrl);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err; // Rethrow non-response errors
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addNumsGroups = createAsyncThunk(
  'addNumsGroups',
  async (groupData, thunkAPI) => {
    const createUrl = `${ProdServerUri}/creategroup`;

    try {
      const response = await AxiosInstance.post(createUrl, groupData);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err; // Rethrow non-response errors
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateNumsGroups = createAsyncThunk(
  'updateNumsGroups',
  async (groupData, thunkAPI) => {
    const updateUrl = `${ProdServerUri}/updategroup`;

    try {
      const response = await AxiosInstance.post(updateUrl, groupData);
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
  async (groupData, thunkAPI) => {
    const deleteUrl = `${ProdServerUri}/delete/${groupData.group_name}`;

    try {
      const response = await AxiosInstance.delete(deleteUrl);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err; // Rethrow non-response errors
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const sendMessages = createAsyncThunk(
  'sendMessages',
  async (smsData, thunkAPI) => {
    const createUrl = `${ProdServerUri}/message`;

    try {
      const response = await AxiosInstance.post(createUrl, smsData);
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
export const numsGroups = createSlice({
  name: 'numsGroups',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'initial';
    },
  },
  extraReducers: (builder) => {
    // Fetch numbers groups
    builder.addCase(fetchNumsGroups.fulfilled, (state, action) => {
      state.status = 'fetched';
      state.groupsList = action.payload;
    });
    builder.addCase(fetchNumsGroups.pending, (state) => {
      state.status = 'fetching';
    });
    builder.addCase(fetchNumsGroups.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.error?.message;
    });

    // Add numbers group
    builder.addCase(addNumsGroups.fulfilled, (state, action) => {
      state.status = 'created';
      state.message = action.payload.message;
      state.groupsList.push(action.payload.group);
    });
    builder.addCase(addNumsGroups.pending, (state) => {
      state.status = 'creating';
    });
    builder.addCase(addNumsGroups.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload?.message;
    });

    // Add numbers group
    builder.addCase(updateNumsGroups.fulfilled, (state, action) => {
      state.status = 'updated';
      state.message = action.payload.message;
      const newGroup = action.payload.group;
      const groupIndex = state.groupsList.findIndex(
        (x) => x._id === newGroup._id
      );
      state.groupsList[groupIndex] = newGroup;
    });
    builder.addCase(updateNumsGroups.pending, (state) => {
      state.status = 'updating';
    });
    builder.addCase(updateNumsGroups.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload?.message;
    });

    // Delete numbers groups
    builder.addCase(deleteNumsGroup.fulfilled, (state, action) => {
      state.status = 'deleted';
      state.isDeleted = true;
      state.message = 'Deleted successfully!';
      const filteredList = state.groupsList.filter(
        (x) => x.group_name !== action.payload.group_name
      );
      state.groupsList = filteredList;
    });
    builder.addCase(deleteNumsGroup.pending, (state) => {
      state.isDeleted = false;
      state.status = 'deleting';
    });
    builder.addCase(deleteNumsGroup.rejected, (state, action) => {
      state.isDeleted = false;
      state.status = 'error';
      state.message = action.error?.message;
    });

    // send message to number(s)
    builder.addCase(sendMessages.fulfilled, (state, action) => {
      state.status = 'sms_sent';
      if (action.payload.Success === 'True') {
        state.message = 'Message(s) Sent Successfully.!';
      } else {
        state.message = action.payload.Message;
      }
    });
    builder.addCase(sendMessages.pending, (state) => {
      state.status = 'sms_sending';
    });
    builder.addCase(sendMessages.rejected, (state, action) => {
      state.status = 'sms_error';
      state.message = action.payload?.message;
    });
  },
});

export const { resetStatus } = numsGroups.actions;

export default numsGroups.reducer;
