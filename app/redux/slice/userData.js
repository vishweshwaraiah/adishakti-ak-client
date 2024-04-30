import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProdServerUri } from '@/utils/Globals';
import AxiosInstance from '@/utils/AxiosInstance';

const initialState = {
  status: 'loading',
  user: {},
  message: '',
  imageUri: '',
};

export const deleteImage = createAsyncThunk(
  'deleteImage',
  async (usrData, thunkAPI) => {
    const deleteImageUrl = ProdServerUri + '/delete_image';

    try {
      const response = await AxiosInstance.put(deleteImageUrl, usrData);
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
    const uploadImageUrl = ProdServerUri + '/upload_image';
    const formData = new FormData();

    const { image, userEmail, profileImage } = usrData;

    if (!image || !userEmail) {
      return thunkAPI.rejectWithValue({
        message: 'Both email and file are required!',
      });
    }

    formData.append('avatar', {
      name: '_avatar',
      uri: image,
      type: 'image/*',
    });

    formData.append('userEmail', userEmail);
    formData.append('currentImage', profileImage);

    const updateProgress = (progress) => {
      console.log(`Upload progress: ${progress}%`);
    };

    const config = {
      headers: {
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
      const response = await AxiosInstance.put(
        uploadImageUrl,
        formData,
        config
      );
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
    if (!imageName) return false;

    const fetchImageUrl = ProdServerUri + '/fetch_image/' + imageName;

    try {
      const response = await AxiosInstance.get(fetchImageUrl);
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
      const response = await AxiosInstance.get(fetchUserUrl);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err; // Rethrow non-response errors
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'updateUser',
  async (usrData, thunkAPI) => {
    const updateUserUrl = ProdServerUri + '/update_user';

    const { userEmail, userMobile } = usrData;

    if (!userEmail || !userMobile) {
      return thunkAPI.rejectWithValue({
        message: 'Both email and mobile number are required!',
      });
    }

    try {
      const response = await AxiosInstance.put(updateUserUrl, usrData);
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
    resetStatus: (state) => {
      state.status = 'loading';
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
      state.status = 'uploaded';
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
      state.status = 'deleted';
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

    // update user details
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = 'updated';
      state.user = action.payload;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload?.message;
    });
  },
});

export const { clearUser } = userData.actions;

export default userData.reducer;
