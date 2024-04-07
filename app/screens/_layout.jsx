import React from 'react';
import { StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { Entypo, Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import MasterStyles from '@/utils/MasterStyles';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';

const Layout = () => {
  const router = useRouter();

  const floatingNavBtn = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => router.push('screens/account/ProfileScreen')}
          style={[styles.floatingBtn]}
        >
          <AntDesign name='home' size={24} color='yellow' />
        </TouchableOpacity>
      </View>
    );
  };

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
        <Feather name='plus' size={48} color='black' />
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
    <Tabs backBehavior='none'>
      <Tabs.Screen
        name='home'
        options={{
          tabBarLabel: '',
          title: 'Home',
          headerShown: false,
          tabBarLabelStyle: styles.tabBarLabelStyle,
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
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: styles.tabItemStyle,
          tabBarIcon: (e) => CustomTabBarIcon(e, 'messages'),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          tabBarLabel: '',
          title: 'Account',
          headerShown: false,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: styles.tabItemStyle,
          tabBarIcon: (e) => CustomTabBarIcon(e, 'account'),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 25,
    backgroundColor: Colors.$white,
    borderRadius: Sizes.$ieRegularRadius * 2,
    width: '90%',
    left: '5%',
    right: '5%',
    height: Sizes.$navDimension,
    maxHeight: 75,
    ...MasterStyles.navShadow,
  },
  tabItemStyle: {
    top: Platform.OS === 'ios' ? 20 : 10,
    position: 'relative',
  },
  tabBarLabelStyle: {},
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
    paddingTop: Sizes.$ieRegularPadding,
  },
  floatingBtn: {
    display: 'none',
    width: Sizes.$btnDimension,
    height: Sizes.$btnDimension,
    borderRadius: 35,
    backgroundColor: Colors.$midblue,
    padding: Sizes.$ieRegularPadding,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 25,
  },
});
