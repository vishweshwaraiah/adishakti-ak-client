import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Slot } from 'expo-router';
import { useTheme } from '@/themes/ThemeProvider';
import MasterMenu from '@/components/Navigation/MasterMenu';
import Fallback from '@/components/ErrorFallback';
import MenuRoutes from '@/utils/MenuRoutes';

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
