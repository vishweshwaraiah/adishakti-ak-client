import { configureStore } from '@reduxjs/toolkit';
import numsGroups from '@/redux/slice/numsGroups';
import userData from '@/redux/slice/userData';
import authData from '@/redux/slice/authData';
import appSettings from '@/redux/slice/appSettings';

export const store = configureStore({
  reducer: {
    groupsSlice: numsGroups,
    userSlice: userData,
    authSlice: authData,
    appSettings: appSettings,
  },
});
