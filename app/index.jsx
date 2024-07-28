import React, { Fragment } from 'react';
import { Redirect, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

const MasterApp = () => {
  const rootNavState = useRootNavigationState();

  if (rootNavState?.key) {
    return (
      <Fragment>
        <Redirect href='/auth/loader' />
        <StatusBar style='auto' />
      </Fragment>
    );
  } else {
    return <Text>Loading...</Text>;
  }
};

export default MasterApp;
