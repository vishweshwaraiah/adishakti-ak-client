import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name='MessagesScreen' />
    </Stack>
  );
};

export default Layout;
