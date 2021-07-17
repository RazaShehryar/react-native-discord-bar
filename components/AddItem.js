import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const AddItem = ({name}) => {
  return (
    <View style={styles.itemView}>
      <Image source={name} style={styles.plus} resizeMode="contain" />
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  plus: {width: 20, height: 20},
  itemView: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#323238',
  },
});
