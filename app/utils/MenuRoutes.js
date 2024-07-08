const MenuRoutes = [
  {
    name: 'home',
    label: 'Home',
    floatingBtn: false,
    iconName: 'home',
    iconFamily: 'Ionicons',
    path: '/main_views/home/HomeScreen',
    isSelected: true,
  },
  {
    name: 'messages',
    label: 'Messages',
    floatingBtn: true,
    iconName: 'message',
    iconFamily: 'Entypo',
    path: '/main_views/messages/MessageScreen',
    isSelected: false,
  },
  {
    name: 'account',
    label: 'Account',
    floatingBtn: false,
    iconName: 'person',
    iconFamily: 'Ionicons',
    path: '/main_views/account/AccountScreen',
    isSelected: false,
  },
];

export default MenuRoutes;
