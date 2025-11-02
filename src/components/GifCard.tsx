import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Gif } from '../types';
import { COLORS } from '../res/themes/colors';

interface Props {
  gif: Gif;
  onPress: (gif: Gif) => void;
}

export const GifCard: React.FC<Props> = ({ gif, onPress }) => {
  const [loading, setLoading] = useState(true);
  const imageUrl =
    gif.images?.downsized_medium?.url ??
    gif.images?.fixed_height?.url ??
    gif.images?.preview_gif?.url ??
    '';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(gif)}
      activeOpacity={0.85}
    >
      <View style={styles.imageContainer}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={COLORS.primary}
            style={styles.loader}
          />
        )}

        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={300}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      </View>

      <View style={styles.titleBox}>
        <Text style={styles.title} numberOfLines={2}>
          {gif.title || 'Untitled GIF'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowRadius: 4,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
  titleBox: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});