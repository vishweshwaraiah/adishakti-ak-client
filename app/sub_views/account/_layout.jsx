import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name='ContactsScreen' />
      <Stack.Screen name='GroupsScreen' />
      <Stack.Screen name='ProfileScreen' />
      <Stack.Screen name='UpdateDetails' />
    </Stack>
  );
};

export default Layout;
