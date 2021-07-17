import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const MakeFolder = () => {
  return (
    <View style={styles.folder}>
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

export default MakeFolder;

const styles = StyleSheet.create({
  folderImage: {aspectRatio: 1, flex: 0.6},
  folder: {
    backgroundColor: '#495478',
    borderRadius: 10,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
