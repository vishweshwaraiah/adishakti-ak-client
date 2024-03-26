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
import { server_uri } from '@/utils/Globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import MasterCard from '@/components/MasterCard';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import Settings from '@/components/Settings/Settings';
import { router } from 'expo-router';

const AccountScreen = () => {
  const [userData, setUserData] = useState({});

  const getUserDetails = async () => {
    const token = await AsyncStorage.getItem('auth');

    axios
      .get(server_uri + '/get_user/' + token)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        Alert.alert('Failed to get user data!', err.message);
      });
  };

  useEffect(() => {
    getUserDetails();
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
              <Text style={styles.rowTitle}>{userData.name}</Text>
              <Text style={styles.subText}>{userData.email}</Text>
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
    fontSize: Sizes.$largeFont,
    fontWeight: 'bold',
  },
  subText: {
    color: Colors.$gray,
    textDecorationLine: 'underline',
  },
});

export default AccountScreen;
