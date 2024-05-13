import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BottomMenu from '@/components/Navigation/BottomMenu';
import FloatingMenu from '@/components/Navigation/FloatingMenu';
import MenuRoutes from '@/utils/MenuRoutes';
import { useTheme } from '@/themes/ThemeProvider';

const Layout = () => {
  const { menuType, appTheme } = useSelector((state) => state.appSettings);
  const { switchTheme } = useTheme();

  useEffect(() => {
    switchTheme(appTheme);
  }, [appTheme]);

  return (
    <>
      {menuType === 'floating' ? (
        <FloatingMenu
          menuItems={MenuRoutes}
          themeColor='black'
          iconsColor='white'
        />
      ) : (
        <BottomMenu
          menuItems={MenuRoutes}
          themeColor='white'
          iconsColor='black'
        />
      )}
    </>
  );
};

export default Layout;
