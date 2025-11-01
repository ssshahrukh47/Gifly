import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Gif } from '../types';

interface Props {
  gif: Gif;
  onPress: (gif: Gif) => void;
}

export const GifCard: React.FC<Props> = ({ gif, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(gif)} activeOpacity={0.8}>
    <Image  source={{ uri: gif.images?.fixed_height?.url ?? '' }} style={styles.image} />
    <View style={styles.titleBox}>
      <Text style={styles.title} numberOfLines={2}>
        {gif.title || 'Untitled GIF'}
      </Text>
    </View>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowRadius: 4,

  },
  image: {
    width: '100%',
    height: 200,
  },
  titleBox: {
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});