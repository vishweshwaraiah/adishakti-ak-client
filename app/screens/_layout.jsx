import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Tabs, useRouter } from 'expo-router';
import { Entypo, Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';
import MasterStyles from '@/utils/MasterStyles';

const Layout = () => {
  const router = useRouter();

  const CustomTabBarButton = (props) => {
    const { children, onPress } = props;

    return (
      <TouchableOpacity style={styles.customTabBarButton} onPress={onPress}>
        <View style={styles.buttonView}>{children}</View>
      </TouchableOpacity>
    );
  };

  const CustomTabBarIcon = (event, name) => {
    const { focused } = event;
    let element;

    if (name === 'home') {
      element = focused ? (
        <Ionicons name='home' size={32} color='blue' />
      ) : (
        <Ionicons name='home' size={24} color='gray' />
      );
    }

    if (name === 'messages') {
      element = focused ? (
        <Feather name='plus' size={48} color='yellow' />
      ) : (
        <Feather name='plus' size={32} color='white' />
      );
    }

    if (name === 'account') {
      element = focused ? (
        <Entypo name='user' size={32} color='blue' />
      ) : (
        <Entypo name='user' size={24} color='gray' />
      );
    }

    return <View style={styles.iconView}>{element}</View>;
  };

  return (
    <Provider store={store}>
      <Tabs>
        <Tabs.Screen
          name='home'
          options={{
            tabBarLabel: 'Home',
            title: 'Home',
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarItemStyle: styles.tabItemStyle,
            tabBarIcon: (e) => CustomTabBarIcon(e, 'home'),
          }}
        />
        <Tabs.Screen
          name='messages'
          options={{
            tabBarLabel: '',
            title: 'Messages',
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarItemStyle: styles.tabItemStyle,
            tabBarIcon: (e) => CustomTabBarIcon(e, 'messages'),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tabs.Screen
          name='account'
          options={{
            tabBarLabel: 'Account',
            title: 'Account',
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarItemStyle: styles.tabItemStyle,
            tabBarIcon: (e) => CustomTabBarIcon(e, 'account'),
          }}
        />
      </Tabs>
      <TouchableOpacity
        onPress={() => router.push('screens/account/ProfileScreen')}
        style={[styles.floatingBtn]}
      >
        <AntDesign name='home' size={24} color='yellow' />
      </TouchableOpacity>
    </Provider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 25,
    backgroundColor: Colors.$white,
    borderRadius: Sizes.$ieBorderRadius * 2,
    width: '90%',
    left: '5%',
    right: '5%',
    paddingTop: Sizes.$iePadding,
    height: Sizes.$navDimension,
    ...MasterStyles.navShadow,
  },
  tabItemStyle: {
    top: 8,
    position: 'relative',
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
  },
  customTabBarButton: {
    top: -15,
    alignItems: 'center',
    justifyContent: 'center',
    ...MasterStyles.navShadow,
  },
  buttonView: {
    width: Sizes.$btnDimension,
    height: Sizes.$btnDimension,
    borderRadius: 35,
    backgroundColor: Colors.$activeBar,
    paddingTop: Sizes.$iePadding,
  },
  floatingBtn: {
    display: 'none',
    width: Sizes.$btnDimension,
    height: Sizes.$btnDimension,
    borderRadius: 35,
    backgroundColor: Colors.$midblue,
    padding: Sizes.$iePadding,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 25,
  },
});
