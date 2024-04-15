import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProdServerUri } from '@/utils/Globals';

const initialState = {
  status: 'loading',
  user: {},
  message: '',
  imageUri: '',
};

export const deleteImage = createAsyncThunk(
  'deleteImage',
  async (usrData, thunkAPI) => {
    const deleteImageUrl = ProdServerUri + '/delete_image/';

    try {
      const response = await axios.put(deleteImageUrl, usrData);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err; // Rethrow non-response errors
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateImage = createAsyncThunk(
  'updateImage',
  async (usrData, thunkAPI) => {
    const uploadImageUrl = ProdServerUri + '/upload_image/';
    const formData = new FormData();

    const { image, email } = usrData;

    formData.append('avatar', {
      name: '_avatar',
      uri: image,
      type: 'image/*',
    });

    formData.append('email', email);

    const updateProgress = (progress) => {
      console.log(`Upload progress: ${progress}%`);
    };

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: ({ loaded, total }) => {
        const percentComplete = (loaded / total) * 100;
        updateProgress(percentComplete);
      },
      transformRequest: () => {
        return formData;
      },
    };

    try {
      const response = await axios.put(uploadImageUrl, formData, config);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err; // Rethrow non-response errors
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchImage = createAsyncThunk(
  'fetchImage',
  async (imageName, thunkAPI) => {
    const fetchImageUrl = ProdServerUri + '/fetch_image/' + imageName;

    try {
      const response = await axios.get(fetchImageUrl);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err; // Rethrow non-response errors
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'fetchUser',
  async (token, thunkAPI) => {
    const fetchUserUrl = ProdServerUri + '/get_user/' + token;

    try {
      const response = await axios.get(fetchUserUrl);
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
export const userData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    // fetch a user details
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

    // upload user image
    builder.addCase(updateImage.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.user = action.payload;
    });
    builder.addCase(updateImage.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateImage.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload?.message;
    });

    // delete user image
    builder.addCase(deleteImage.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.user = action.payload;
    });
    builder.addCase(deleteImage.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteImage.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload?.message;
    });

    // fetch user image
    builder.addCase(fetchImage.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.imageUri = action.payload;
    });
    builder.addCase(fetchImage.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchImage.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload?.message;
    });
  },
});

export const { clearUser } = userData.actions;

export default userData.reducer;
