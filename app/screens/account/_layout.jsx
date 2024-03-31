import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name='AccountScreen' />
      <Stack.Screen name='GroupsScreen' />
      <Stack.Screen name='ProfileScreen' />
      <Stack.Screen name='ContactsScreen' />
    </Stack>
  );
};

export default Layout;
