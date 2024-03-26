import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name='HomeScreen' />
      <Stack.Screen name='ContactsScreen' />
    </Stack>
  );
};

export default Layout;
