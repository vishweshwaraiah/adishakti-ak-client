import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useTheme } from '@/themes/ThemeProvider';
import MasterIcon from '@/components/MasterIcon';
import Sizes from '@/utils/Sizes';

const GroupsList = (props) => {
  const {
    groupsList = [],
    onDeletePress = () => {},
    onViewPress = () => {},
  } = props;

  const { theme } = useTheme();

  const deleteHandler = (item) => {
    onDeletePress(item);
  };

  const viewHandler = (item) => {
    onViewPress(item);
  };

  const styles = StyleSheet.create({
    utilsBox: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowStyle: {
      width: '100%',
      alignSelf: 'center',
      backgroundColor: theme.itemBg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'hidden',
      borderBottomWidth: 1,
      borderBottomColor: theme.itemColor,
      height: Sizes.$ieLargeHeight,
      paddingHorizontal: Sizes.$ieLargePadding,
      marginBottom: Sizes.$ieSmallMargin,
    },
    groupItemText: {
      color: theme.white,
    },
    groupActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: Sizes.$ieFlexGapLarge,
    },
  });

  const renderItem = ({ item }) => (
    <View style={styles.rowStyle}>
      <Text style={styles.groupItemText}>{item.group_name}</Text>
      <View style={styles.groupActions}>
        <MasterIcon
          iconName='list'
          iconSize={24}
          iconFamily='Entypo'
          iconColor={theme.itemColor}
          isInteractive={true}
          onPress={() => viewHandler(item)}
          iconBgSize={24}
        />
        <MasterIcon
          iconName='trash'
          iconSize={24}
          iconFamily='Ionicons'
          iconColor={theme.itemColor}
          isInteractive={true}
          onPress={() => deleteHandler(item)}
          iconBgSize={24}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.utilsBox}>
      {groupsList.length ? (
        <FlatList
          data={groupsList}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text style={{ textAlign: 'center' }}>
          No groups found! Please add from top right button.
        </Text>
      )}
    </View>
  );
};

export default GroupsList;
