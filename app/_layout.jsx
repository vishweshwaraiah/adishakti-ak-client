import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const AuthLayout = () => {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='auth' />
        <Stack.Screen name='main_views' />
      </Stack>
    </Provider>
  );
};

export default AuthLayout;
