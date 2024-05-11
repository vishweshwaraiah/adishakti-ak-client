import React from 'react';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='loader' />
      <Stack.Screen name='login' />
      <Stack.Screen name='register' />
    </Stack>
  );
};

export default AuthLayout;
