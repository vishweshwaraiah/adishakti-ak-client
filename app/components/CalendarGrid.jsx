import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';

const CalendarGrid = (props) => {
  const {
    gridData,
    headerData,
    dataValueKey,
    headerValueKey,
    listKeyId = 'id',
    columns = 5,
    itemSpace = 0,
    onClick = () => {},
  } = props;

  const [rows, setRows] = useState(5);

  useEffect(() => {
    if (gridData) {
      const gridDataLength = gridData.length;
      setRows(gridDataLength / columns);
    }
  }, [gridData]);

  const styles = StyleSheet.create({
    gridBox: {
      marginHorizontal: 'auto',
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    gridItem: {
      flex: 1,
      minWidth: 100 / columns + '%',
      height: rows ? 100 / rows + '%' : 50,
      justifyContent: 'center',
      alignItems: 'center',
      padding: itemSpace,
    },
    activeDates: {
      color: Colors.$black,
    },
    disabledDates: {
      color: Colors.$gray,
    },
    currentStyle: {
      backgroundColor: Colors.$primary,
    },
    selectedStyle: {
      backgroundColor: Colors.$secondary,
    },
    selectedDate: {
      color: Colors.$white,
    },
    headerBg: {
      backgroundColor: Colors.$secondary,
      marginBottom: 5,
    },
  });

  const GridItem = (itemProps) => {
    const {
      item = {},
      valueKey = '',
      isHeader = false,
      onClick = () => {},
    } = itemProps;

    const textColor = () => {
      if (item.type === 'month-date') {
        return styles.activeDates;
      } else if (item.type === 'selected-date') {
        return styles.selectedDate;
      } else {
        return styles.disabledDates;
      }
    };

    const selectedStyle = () => {
      if (item.type === 'selected-date') {
        return styles.selectedStyle;
      }

      if (item.type === 'current-date') {
        return styles.currentStyle;
      }

      if (isHeader) {
        return styles.headerBg;
      }
    };

    const clickHandler = () => {
      if (item.type === 'month-date') {
        onClick(item);
      }
    };

    return (
      <View style={[styles.gridItem, selectedStyle()]}>
        <TouchableOpacity onPress={clickHandler}>
          <Text style={textColor()}>{item[valueKey]}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.gridBox}>
      {headerData?.map((item) => {
        return (
          <GridItem
            item={item}
            valueKey={headerValueKey}
            key={item[listKeyId]}
            isHeader={true}
          />
        );
      })}
      {gridData?.map((item) => {
        return (
          <GridItem
            item={item}
            valueKey={dataValueKey}
            key={item[listKeyId]}
            isHeader={false}
            onClick={onClick}
          />
        );
      })}
    </View>
  );
};

export default CalendarGrid;
