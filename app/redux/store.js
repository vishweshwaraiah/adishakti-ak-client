import { configureStore } from '@reduxjs/toolkit';
import numsGroups from '@/redux/slice/numsGroups';
import userData from '@/redux/slice/userData';
import authData from '@/redux/slice/authData';

export const store = configureStore({
  reducer: {
    groupsSlice: numsGroups,
    userSlice: userData,
    authSlice: authData,
  },
});
