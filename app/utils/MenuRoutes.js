const MenuRoutes = [
  {
    name: 'home',
    label: 'Home',
    floatingBtn: false,
    iconName: 'home',
    iconFamily: 'Ionicons',
    path: '/main_views/home/HomeScreen',
  },
  {
    name: 'messages',
    label: 'Messages',
    floatingBtn: true,
    iconName: 'message',
    iconFamily: 'Entypo',
    path: '/main_views/messages/MessageScreen',
  },
  {
    name: 'account',
    label: 'Account',
    floatingBtn: false,
    iconName: 'person',
    iconFamily: 'Ionicons',
    path: '/main_views/account/AccountScreen',
  },
];

export default MenuRoutes;
