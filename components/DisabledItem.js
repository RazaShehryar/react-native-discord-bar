import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const DisabledItem = ({name}) => {
  return (
    <View style={styles.container}>
      <Image source={name} style={styles.image} resizeMode="contain" />
    </View>
  );
};

export default DisabledItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#495478',
    width: 40,
    height: 40,
  },
  image: {width: 20, height: 20},
});
