import React from 'react';
import { Provider } from 'react-redux';
import { Stack } from 'expo-router';
import ThemeProvider from '@/themes/ThemeProvider';
import { store } from '@/redux/store';

const AuthLayout = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='auth' />
          <Stack.Screen name='main_views' />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
};

export default AuthLayout;
