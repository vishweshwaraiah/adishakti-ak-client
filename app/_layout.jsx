import React from 'react';
import { Provider } from 'react-redux';
import { Stack } from 'expo-router';
import ThemeProvider from '@/themes/ThemeProvider';
import store from '@/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const AuthLayout = () => {
  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
    },
  });
  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <Provider store={store}>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='auth' />
            <Stack.Screen name='main_views' />
          </Stack>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default AuthLayout;
