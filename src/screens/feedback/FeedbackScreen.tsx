import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { FeedbackData, RootStackParamList } from '../../types';
import styles from './Styles';
import { StarRating } from '../../components';
import Strings from '../../res/strings';
import { COLORS } from "../../res/themes/colors"

type Props = {
  route: RouteProp<RootStackParamList, 'Feedback'>;
};

export const FeedbackScreen: React.FC<Props> = ({ route }) => {
  const { gif } = route.params;
  const navigation = useNavigation<any>();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingImage, setLoadingImage] = useState(true);

  const STORAGE_KEY = `feedback_${gif.id}`;

  // Load saved feedback
  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data: FeedbackData = JSON.parse(saved);
          setComment(data.comment || '');
          setRating(data.rating);
        }
      } catch (err) {
        console.warn('Failed to load feedback', err);
      }
    };
    loadFeedback();
  }, [STORAGE_KEY]);

  // Submit feedback
  const handleSubmit = async () => {
    setError('');

    if (rating === 0) {
      setError(Strings.RATING_ERROR);
      return;
    }

    setLoading(true);
    const data: FeedbackData = {
      gifId: gif.id,
      comment,
      rating,
      timestamp: Date.now(),
    };

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      Alert.alert('Success', 'Your feedback has been saved!');
      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to save feedback');
    } finally {
      setLoading(false);
    }
  };

  const imageUrl =
    gif.images?.downsized_medium?.url ??
    gif.images?.fixed_height?.url ??
    gif.images?.preview_gif?.url ??
    '';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <TouchableOpacity
            style={{ marginBottom: 14 }}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} />
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            {loadingImage && (
              <ActivityIndicator
                size="large"
                color={COLORS.primary}
                style={{ position: 'absolute', zIndex: 1 }}
              />
            )}
            <Image
              source={{ uri: imageUrl }}
              style={styles.gif}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={300}
              onLoadStart={() => setLoadingImage(true)}
              onLoadEnd={() => setLoadingImage(false)}
            />
          </View>

          <Text style={styles.title}>{gif.title || 'Untitled GIF'}</Text>
                
           {/* Rating */}
          <Text style={styles.label}>
            {Strings.RATING} <Text>*</Text>
          </Text>
          <StarRating
            rating={rating}
            onRatingChange={(newRating) => {
              setRating(newRating);
              if (newRating > 0) setError('');
            }}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          
          {/* Comment */}
          <Text style={styles.label}>Comment (Optional)</Text>
          <TextInput
            style={styles.textArea}
            placeholder={Strings.SHARE_YOUR_THOUGHTS}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? Strings.SAVING : Strings.SUBMIT_FEEDBACK}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};