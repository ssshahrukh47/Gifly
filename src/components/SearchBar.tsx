import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../res/themes/colors';

interface Props {
  onSearch: (query: string) => void;
  debounceTime?: number;
}

export const SearchBar: React.FC<Props> = ({ onSearch, debounceTime = 500 }) => {
  const [query, setQuery] = useState('');
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle input changes
  const handleChange = useCallback(
    (text: string) => {
      setQuery(text);

      // Clear previous timeout if exists
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }

      // Set new debounce timer
      typingTimeout.current = setTimeout(() => {
        const trimmed = text.trim();
        if (trimmed.length >= 3 || trimmed.length === 0) {
          onSearch(trimmed);
        }
      }, debounceTime);
    },
    [onSearch, debounceTime]
  );

  // Clear input
  const handleClear = useCallback(() => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    setQuery('');
    onSearch('');
  }, [onSearch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} />
        <TextInput
          style={styles.input}
          placeholder="Search GIFs..."
          value={query}
          onChangeText={handleChange}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close-circle" size={20}/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
    backgroundColor: COLORS.lightGray,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
});
