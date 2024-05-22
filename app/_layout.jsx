import React from 'react';
import { Provider } from 'react-redux';
import { Stack } from 'expo-router';
import ThemeProvider from '@/themes/ThemeProvider';
import { store } from '@/redux/store';

const AuthLayout = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='auth' />
          <Stack.Screen name='main_views' />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
};

export default AuthLayout;
