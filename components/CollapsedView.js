import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const CollapsedView = () => {
  return (
    <View style={styles.collapsedView}>
      <Animatable.Image
        animation="fadeIn"
        duration={250}
        source={require('../assets/folder.png')}
        style={styles.folderImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default CollapsedView;

const styles = StyleSheet.create({
  collapsedView: {
    backgroundColor: '#495478',
    borderRadius: 10,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  folderImage: {aspectRatio: 1, flex: 0.6},
});
