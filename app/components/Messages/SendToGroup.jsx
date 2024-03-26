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
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const screenHeight = Dimensions.get('window').height;

const SendToGroup = (props) => {
  const { getList } = props;
  const dispatch = useDispatch();
  const { groupsList, isLoading } = useSelector((state) => state.numsGroups);

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

  const renderItem = ({ item, index }) => (
    <View style={index % 2 ? styles.styleLeft : styles.styleRight}>
      <TouchableOpacity onPress={() => selectGroup(item)}>
        <View style={styles.groupItem}>
          <Text style={styles.groupItemText}>{item.group_name}</Text>
          {selectedGroup.group_name === item.group_name && (
            <Ionicons name='checkmark-circle' size={24} color='white' />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.groupBox}>
      {isLoading && <Text>Loading groups...</Text>}
      <View style={styles.groupsList}>
        {groupsList.length ? (
          <FlatList
            data={groupsList}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={numColumns}
          />
        ) : (
          <Text style={{ textAlign: 'center' }}>
            No groups found!. Add one from Mange groups page.
          </Text>
        )}
      </View>
    </View>
  );
};

export default SendToGroup;

const styles = StyleSheet.create({
  groupBox: {
    height: 'auto',
    width: '100%',
    marginTop: Sizes.$ieMargin,
  },
  groupsList: {
    maxHeight: screenHeight / 5,
  },
  styleLeft: {
    width: size - Sizes.$iePadding,
    paddingLeft: Sizes.$iePadding,
    paddingBottom: Sizes.$iePadding,
  },
  styleRight: {
    width: size - Sizes.$iePadding,
    paddingRight: Sizes.$iePadding,
    paddingBottom: Sizes.$iePadding,
  },
  groupItem: {
    backgroundColor: Colors.$black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    height: Sizes.$ieRegularHeight,
    borderRadius: Sizes.$ieBorderRadius,
    paddingHorizontal: Sizes.$iePadding,
  },
  groupItemText: {
    color: Colors.$white,
  },
});
