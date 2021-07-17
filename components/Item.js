import React from 'react';
import {Image, StyleSheet} from 'react-native';

const Item = ({name}) => {
  return <Image source={name} style={styles.image} resizeMode="contain" />;
};

export default Item;

const styles = StyleSheet.create({
  image: {width: 40, height: 40},
});
