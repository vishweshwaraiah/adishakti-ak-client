import React, { Fragment } from 'react';
import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AuthLayout from './auth/_layout';

export default function App() {
  return (
    <Fragment>
      <AuthLayout></AuthLayout>
      <Redirect href='/auth/login' />
      <StatusBar style='auto' />
    </Fragment>
  );
}
