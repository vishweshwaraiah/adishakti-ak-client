import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNumsGroups } from '@/redux/slice/numsGroups';
import MasterIcon from '@/components/MasterIcon';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const screenHeight = Dimensions.get('window').height;

const SendToGroup = (props) => {
  const { getList } = props;

  const dispatch = useDispatch();

  const { theme } = useTheme();

  const { groupsList, status } = useSelector((state) => state.groupsSlice);

  const [selectedGroup, setSelectedGroup] = useState({});

  useEffect(() => {
    if (selectedGroup) {
      getList(selectedGroup?.nums_group);
    }
  }, [selectedGroup]);

  useEffect(() => {
    dispatch(fetchNumsGroups());
  }, []);

  const selectGroup = (item) => {
    setSelectedGroup(item);
  };

  const styles = StyleSheet.create({
    groupBox: {
      height: 'auto',
      width: '100%',
      marginTop: Sizes.$ieRegularMargin,
    },
    groupsList: {
      maxHeight: screenHeight / 5,
      marginBottom: Sizes.$ieRegularMargin,
    },
    styleLeft: {
      width: size - Sizes.$ieRegularPadding,
      paddingLeft: Sizes.$ieRegularPadding,
      paddingVertical: Sizes.$ieSmallPadding,
    },
    styleRight: {
      width: size - Sizes.$ieRegularPadding,
      paddingRight: Sizes.$ieRegularPadding,
      paddingVertical: Sizes.$ieSmallPadding,
    },
    groupItem: {
      backgroundColor: theme.itemBg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'hidden',
      height: Sizes.$ieRegularHeight,
      borderRadius: Sizes.$ieRegularRadius,
      paddingHorizontal: Sizes.$ieRegularPadding,
    },
    groupItemText: {
      color: theme.itemColor,
    },
    infoText: {
      textAlign: 'center',
      backgroundColor: theme.info,
      padding: Sizes.$ieRegularPadding,
      marginBottom: Sizes.$ieSmallMargin,
      borderRadius: Sizes.$ieSmallRadius,
      overflow: 'hidden',
      color: theme.white,
    },
  });

  const renderItem = ({ item, index }) => (
    <View style={index % 2 ? styles.styleLeft : styles.styleRight}>
      <TouchableOpacity onPress={() => selectGroup(item)}>
        <View style={styles.groupItem}>
          <Text style={styles.groupItemText}>{item.group_name}</Text>
          {selectedGroup.group_name === item.group_name && (
            <MasterIcon
              iconName='checkmark-circle'
              iconSize={24}
              iconFamily='Ionicons'
              iconColor={theme.itemColor}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.groupBox}>
      {status === 'loading' ? (
        <Text style={styles.infoText}>Loading groups...</Text>
      ) : (
        <View style={styles.groupsList}>
          {groupsList.length ? (
            <FlatList
              data={groupsList}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              numColumns={numColumns}
            />
          ) : (
            <Text style={styles.infoText}>
              No groups found! Add from settings page.
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default SendToGroup;
