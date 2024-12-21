import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProdServerUri } from '@/utils/Globals';
import AxiosInstance from '@/utils/AxiosInstance';

const initialState = {
  userStatus: 'initial',
  user: {},
  imageMessage: '',
  userMessage: '',
  imageUri: '',
  imageStatus: 'initial',
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
      return `Upload progress: ${progress}%`;
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

export const fetchUser = createAsyncThunk('fetchUser', async (_, thunkAPI) => {
  const fetchUserUrl = ProdServerUri + '/get_user/';

  try {
    const response = await AxiosInstance.get(fetchUserUrl);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err; // Rethrow non-response errors
    }
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

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
    resetUserStatus: (state) => {
      state.userStatus = 'initial';
    },
  },
  extraReducers: (builder) => {
    // upload user image
    builder.addCase(updateImage.fulfilled, (state, action) => {
      state.imageStatus = 'uploadedimage';
      state.user = action.payload;
    });
    builder.addCase(updateImage.pending, (state) => {
      state.imageStatus = 'uploadingimage';
    });
    builder.addCase(updateImage.rejected, (state, action) => {
      state.imageStatus = 'error';
      state.imageMessage = action.payload?.message;
    });

    // delete user image
    builder.addCase(deleteImage.fulfilled, (state, action) => {
      state.imageStatus = 'deletedimage';
      state.user = action.payload;
    });
    builder.addCase(deleteImage.pending, (state) => {
      state.imageStatus = 'deletingimage';
    });
    builder.addCase(deleteImage.rejected, (state, action) => {
      state.imageStatus = 'error';
      state.imageMessage = action.payload?.message;
    });

    // fetch user image
    builder.addCase(fetchImage.fulfilled, (state, action) => {
      state.imageStatus = 'fetchedimage';
      state.imageUri = action.payload;
    });
    builder.addCase(fetchImage.pending, (state) => {
      state.imageStatus = 'fetchingimage';
    });
    builder.addCase(fetchImage.rejected, (state, action) => {
      state.imageStatus = 'error';
      state.imageMessage = action.payload?.message;
    });

    // fetch user details
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userStatus = 'fetcheduser';
      state.user = action.payload;
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.userStatus = 'fetchinguser';
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userStatus = 'error';
      state.userMessage = action.payload?.message;
    });

    // update user details
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.userStatus = 'updateduser';
      state.user = action.payload;
      state.userMessage = 'Details Updated Successfully!';
    });
    builder.addCase(updateUser.pending, (state) => {
      state.userStatus = 'updatinguser';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.userStatus = 'error';
      state.userMessage = action.payload?.message;
    });
  },
});

export const { clearUser, resetUserStatus } = userData.actions;

export default userData.reducer;
