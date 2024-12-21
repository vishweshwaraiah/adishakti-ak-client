import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSegments } from 'expo-router';
import MenuRoutes from '@/utils/MenuRoutes';

const useMasterMenu = () => {
  const navigation = useRouter();
  const segments = useSegments();
  const pathname = usePathname();

  const [routeItems, setRouteItems] = useState([]);

  const updateRoutes = (rName) => {
    const updatedRoutes = MenuRoutes.map((i) => {
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
    }
  };

  const updateMenus = () => {
    const cloned = [...segments];
    const segment = cloned.reverse()[0];
    updateRoutes(segment);
  };

  useEffect(() => {
    const cloned = [...segments];
    const segment = cloned.reverse()[0];
    updateRoutes(segment);
  }, [pathname]);

  return {
    toggleMenu,
    updateMenus,
    routeItems,
  };
};

export default useMasterMenu;
