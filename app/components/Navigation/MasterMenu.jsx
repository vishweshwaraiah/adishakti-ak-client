import React from 'react';
import FloatingMenu from '@/components/Navigation/FloatingMenu';
import BottomMenu from '@/components/Navigation/BottomMenu';
import useMasterMenu from '@/utils/useMasterMenu';

const MasterMenu = (props) => {
  const { menuType = 'bottom' } = props;

  const uMm = useMasterMenu();

  const defaultProps = {
    menuItems: uMm.routeItems,
    toggleMenu: uMm.toggleMenu,
  };

  return menuType === 'floating' ? (
    <FloatingMenu {...defaultProps} />
  ) : (
    <BottomMenu {...defaultProps} />
  );
};

export default MasterMenu;
