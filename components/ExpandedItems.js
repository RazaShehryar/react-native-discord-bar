import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const ExpandedItems = ({name}) => {
  return (
    <View style={styles.center}>
      <View style={styles.background} />
      <Image source={name} style={styles.image} resizeMode="contain" />
    </View>
  );
};

export default ExpandedItems;

const styles = StyleSheet.create({
  background: {
    height: 50,
    paddingVertical: 25,
    backgroundColor: '#49547890',
    width: '100%',
    position: 'absolute',
    top: -8,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {width: 40, height: 40},
});
