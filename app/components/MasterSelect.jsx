import React, { useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';
import MasterStyles from '@/utils/MasterStyles';

const MasterSelect = ({ label, data, onSelect }) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h + 2);
    });
    setVisible(true);
  };

  const onItemPress = (item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.selectOption,
        item.value === selected?.value && styles.isSelected,
      ]}
      onPress={() => onItemPress(item)}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType='fade'>
        <TouchableOpacity style={styles.selectOverlay} onPress={toggleDropdown}>
          <View style={[styles.selectDropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.dropdownList}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.selectButton}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {(selected && selected.label) || label}
      </Text>
      <FontAwesome
        style={styles.icon}
        name='chevron-circle-down'
        size={24}
        color='black'
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.$white,
    height: Sizes.$ieLargeHeight,
    zIndex: 1,
    borderRadius: Sizes.$ieBorderRadius,
    zIndex: 201,
    ...MasterStyles.commonShadow,
  },
  buttonText: {
    flex: 1,
    textAlign: 'left',
    marginLeft: Sizes.$ieMargin,
  },
  icon: {
    marginRight: Sizes.$ieMargin,
  },
  selectDropdown: {
    position: 'absolute',
    backgroundColor: Colors.$white,
    width: '95%',
    paddingBottom: Sizes.$iePadding,
    borderBottomLeftRadius: Sizes.$ieBorderRadius,
    borderBottomRightRadius: Sizes.$ieBorderRadius,
    borderTopWidth: 5,
    borderColor: Colors.$primary,
    ...MasterStyles.darkShadow,
  },
  selectOverlay: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.$modalBackground,
    zIndex: 200,
  },
  dropdownList: {
    width: '100%',
  },
  selectOption: {
    padding: Sizes.$iePadding,
    justifyContent: 'center',
    height: Sizes.$ieLargeHeight,
    borderBottomWidth: 0.3,
  },
  isSelected: {
    backgroundColor: Colors.$selected,
  },
});

export default MasterSelect;
