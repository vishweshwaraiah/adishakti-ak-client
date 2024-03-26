import { configureStore } from '@reduxjs/toolkit';
import numsGroups from '@/redux/slice/numsGroups';

export const store = configureStore({
  reducer: {
    numsGroups: numsGroups,
  },
});
