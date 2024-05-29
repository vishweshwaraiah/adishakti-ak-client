import React, { Fragment } from 'react';
import { Redirect, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const MasterApp = () => {
  const { key } = useRootNavigationState();

  if (!key) return null;

  return (
    <Fragment>
      <Redirect href='/auth/loader' />
      <StatusBar style='auto' />
    </Fragment>
  );
};

export default MasterApp;
