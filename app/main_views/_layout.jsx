import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MenuRoutes from '@/utils/MenuRoutes';
import { useTheme } from '@/themes/ThemeProvider';
import { Slot } from 'expo-router';
import MasterMenu from '@/components/Navigation/MasterMenu';

const Layout = () => {
  const { menuType, appTheme } = useSelector((state) => state.appSettings);
  const { switchTheme } = useTheme();

  useEffect(() => {
    switchTheme(appTheme);
  }, [appTheme]);

  return (
    <>
      <MasterMenu menuType={menuType} menuItems={MenuRoutes} />
      <Slot />
    </>
  );
};

export default Layout;
