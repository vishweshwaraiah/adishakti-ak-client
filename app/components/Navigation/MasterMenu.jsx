import React, { useEffect, useState } from 'react';
import { useSegments, usePathname, useRouter } from 'expo-router';
import FloatingMenu from '@/components/Navigation/FloatingMenu';
import BottomMenu from '@/components/Navigation/BottomMenu';

const MasterMenu = (props) => {
  const {
    menuItems = [],
    menuType = 'bottom',
    iconsColor = '#ffffff',
    onPress = () => {},
  } = props;

  const navigation = useRouter();
  const segments = useSegments();
  const pathname = usePathname();

  const [routeItems, setRouteItems] = useState(menuItems);

  const updateRoutes = (rName) => {
    const updatedRoutes = menuItems.map((i) => {
      i.isSelected = i.name === rName ? true : false;
      return i;
    });

    setRouteItems(updatedRoutes);
  };

  const toggleMenu = (menu) => {
    if (menu?.isSelected) return;
    if (menu?.name) {
      navigation.navigate(menu.path);
      updateRoutes(menu.name);
      onPress();
    }
  };

  useEffect(() => {
    // may need to fix if trows any error
    updateRoutes(segments.reverse()[1]);
  }, [pathname]);

  return menuType === 'floating' ? (
    <FloatingMenu
      menuItems={routeItems}
      toggleMenu={toggleMenu}
      iconsColor={iconsColor}
    />
  ) : (
    <BottomMenu
      menuItems={routeItems}
      toggleMenu={toggleMenu}
      iconsColor={iconsColor}
    />
  );
};

export default MasterMenu;
