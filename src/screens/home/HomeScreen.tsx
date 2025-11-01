import React, { useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchBar , GifCard } from '../../components';
import { useGifs } from '../../hooks/useGifs';
import styles from './Styles';
import { COLORS } from '../../res/themes/colors';
import { RootStackParamList } from '../../types';
import Strings from '../../res/strings';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const { gifs, loadGifs, loading, hasMore } = useGifs(query);
  const [refreshing, setRefreshing] = useState(false);

  // Pull to refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadGifs(true);
    setRefreshing(false);
  };

  // Load more when reaching end
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadGifs(false);
    }
  };

  const handleSearch = (text: string) => {
    setQuery(text);
  };

  if (loading && gifs?.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Search bar */}
      <SearchBar onSearch={handleSearch} />

      {/* GIF list */}
      <FlatList
        data={gifs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GifCard
            gif={item}
            onPress={() => navigation.navigate('Feedback', { gif: item })}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary}
          />
        }
        ListFooterComponent={
          loading && gifs.length > 0 ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>
            {query.length >= 3 ? Strings.NO_GIFS_FOUND : Strings.SEARCH_FOR_GIFS}
            </Text>
          </View>
        }
        contentContainerStyle={gifs.length === 0 ? styles.emptyList : undefined}
      />
    </SafeAreaView>
  );
};
