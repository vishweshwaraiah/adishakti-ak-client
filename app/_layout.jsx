import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='auth' />
      <Stack.Screen name='screens' />
    </Stack>
  );
};

export default AuthLayout;
