import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../res/themes/colors';

interface Props {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export const StarRating: React.FC<Props> = ({ rating, onRatingChange }) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onRatingChange(star)} style={styles.star}>
          <Ionicons
            name={star <= rating ? 'star' : 'star-outline'}
            size={35}
            color={star <= rating ? COLORS.star: COLORS.lightGray}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    marginHorizontal: 4,
  },
});