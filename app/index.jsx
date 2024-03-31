import React, { Fragment } from 'react';
import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <Fragment>
      <Redirect href='/auth/login' />
      <StatusBar style='auto' />
    </Fragment>
  );
}
