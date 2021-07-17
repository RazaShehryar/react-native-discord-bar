import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const ExpandedView = ({items}) => {
  return (
    <View style={styles.expandedFolder}>
      {items.map((u, p) => (
        <View style={styles.expandedImageView} key={u + p.toString()}>
          <Animatable.Image
            animation="fadeIn"
            duration={250}
            source={u?.name}
            style={styles.expandedImage}
            resizeMode="contain"
          />
        </View>
      ))}
    </View>
  );
};

export default ExpandedView;

const styles = StyleSheet.create({
  expandedImage: {aspectRatio: 1, flex: 0.5},
  expandedImageView: {
    width: '48%',
    marginHorizontal: 0.5,
  },
  expandedFolder: {
    backgroundColor: '#495478',
    borderRadius: 10,
    width: 50,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    overflow: 'hidden',
    marginVertical: 2,
  },
});
