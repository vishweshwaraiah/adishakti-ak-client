const MenuRoutes = [
  {
    name: 'HomeScreen',
    label: 'Home',
    floatingBtn: false,
    iconName: 'home',
    iconFamily: 'Ionicons',
    path: '/main_views/home/HomeScreen',
    isSelected: true,
  },
  {
    name: 'MessagesScreen',
    label: 'Messages',
    floatingBtn: true,
    iconName: 'message',
    iconFamily: 'Entypo',
    path: '/main_views/messages/MessagesScreen',
    isSelected: false,
  },
  {
    name: 'AccountScreen',
    label: 'Account',
    floatingBtn: false,
    iconName: 'person',
    iconFamily: 'Ionicons',
    path: '/main_views/account/AccountScreen',
    isSelected: false,
  },
];

export default MenuRoutes;
