import React, { Fragment } from 'react';
import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const MasterApp = () => {
  return (
    <Fragment>
      <Redirect href='/auth/loader' />
      <StatusBar style='auto' />
    </Fragment>
  );
};

export default MasterApp;
