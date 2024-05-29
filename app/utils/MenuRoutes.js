const MenuRoutes = [
  {
    isTrigger: true,
    name: 'trigger',
    iconName: 'plus',
    iconFamily: 'Feather',
    path: null,
  },
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
    iconName: 'user',
    iconFamily: 'Feather',
    path: '/main_views/account/AccountScreen',
  },
];

export default MenuRoutes;
