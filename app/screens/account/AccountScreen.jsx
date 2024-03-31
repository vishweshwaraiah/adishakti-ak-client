import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import { ServerUri } from '@/utils/Globals';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import MasterCard from '@/components/MasterCard';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import Settings from '@/components/Settings/Settings';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/redux/slice/userData';

const AccountScreen = () => {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <AuthTemplate screenName='Account'>
      <MasterCard style={styles.profileBox}>
        <View style={[styles.itemBox, styles.hasEditBtn]}>
          <View style={styles.itemBox}>
            <Image
              style={styles.profileImage}
              source={require('@/assets/images/logo.png')}
            ></Image>
            <View>
              <Text style={styles.rowTitle}>{user.name}</Text>
              <Text style={styles.subText}>{user.email}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.navigate('screens/account/ProfileScreen');
            }}
            style={styles.editBtn}
          >
            <MaterialIcons name='edit' size={24} color='white' />
          </TouchableOpacity>
        </View>
      </MasterCard>
      <Settings />
    </AuthTemplate>
  );
};

const styles = StyleSheet.create({
  profileBox: {
    flex: 1,
  },
  profileImage: {
    width: Sizes.$ieRegularHeight,
    height: Sizes.$ieRegularHeight,
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  hasEditBtn: {
    justifyContent: 'space-between',
  },
  editBtn: {
    backgroundColor: Colors.$primary,
    paddingHorizontal: Sizes.$ieLargePadding,
    paddingVertical: Sizes.$ieSmallPadding,
    borderRadius: Sizes.$ieLargeRadius,
  },
  rowTitle: {
    fontSize: Sizes.$ieLargeFont,
    fontWeight: 'bold',
  },
  subText: {
    color: Colors.$gray,
    textDecorationLine: 'underline',
  },
});

export default AccountScreen;
