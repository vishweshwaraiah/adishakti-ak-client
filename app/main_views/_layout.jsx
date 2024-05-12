import React from 'react';
import { useSelector } from 'react-redux';
import BottomMenu from '@/components/BottomMenu';
import FloatingMenu from '@/components/FloatingMenu';
import MenuRoutes from '@/utils/MenuRoutes';

const Layout = () => {
  const { menuType } = useSelector((state) => state.appSettings);

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
