import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import MenuRoutes from '@/utils/MenuRoutes';
import { useTheme } from '@/themes/ThemeProvider';
import { Slot } from 'expo-router';
import MasterMenu from '@/components/Navigation/MasterMenu';
import MasterButton from '@/components/MasterButton';

function Fallback({ error, resetErrorBoundary }) {
  return (
    <View role='alert'>
      <Text>Something went wrong:</Text>
      <Text style={{ color: 'red', marginVertical: 10 }}>{error.message}</Text>
      <MasterButton onPress={resetErrorBoundary} title='Refresh Screen!' />
    </View>
  );
}

const Layout = () => {
  const { menuType, appTheme } = useSelector((state) => state.appSettings);
  const { switchTheme } = useTheme();

  useEffect(() => {
    switchTheme(appTheme);
  }, [appTheme]);

  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={(details) => {
        console.log('Error Details', details);
      }}
    >
      <MasterMenu menuType={menuType} menuItems={MenuRoutes} />
      <Slot />
    </ErrorBoundary>
  );
};

export default Layout;
