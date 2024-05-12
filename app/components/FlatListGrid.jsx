import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const FlatListGrid = (props) => {
  const {
    gridData,
    valueKey,
    columns = 5,
    itemSpace = Sizes.$ieRegularPadding,
  } = props;

  const { theme } = useTheme();

  const RenderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{item[valueKey]}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    gridBox: {
      // the number of columns you want to devide the screen into
      flex: columns,
      marginHorizontal: 'auto',
      width: '100%',
    },
    item: {
      flex: 1,
      minWidth: Math.floor(100 / columns) + '%',
      maxWidth: Math.floor(100 / columns) + '%',
      paddingVertical: itemSpace,
      backgroundColor: theme.white,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.gridBox}>
      <FlatList
        data={gridData}
        numColumns={columns}
        renderItem={RenderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default FlatListGrid;
