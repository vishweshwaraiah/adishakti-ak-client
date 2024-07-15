import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name='ListScreen' />
      <Stack.Screen name='ViewScreen' />
    </Stack>
  );
};

export default Layout;
