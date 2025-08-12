import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { searchFoodByName } from '../services/foodApi';
import { addFoodEntry } from '../services/database';

export default function FoodSearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const results = await searchFoodByName(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };

  const addFood = async (food) => {
    await addFoodEntry(food);
    navigation.goBack();
  };

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity style={styles.foodItem} onPress={() => addFood(item)}>
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodDetails}>
          {item.calories} cal/100g | Protein: {item.protein}g | Carbs: {item.carbs}g
        </Text>
        <View style={styles.metaRow}>
          {item.brand && <Text style={styles.brandText}>{item.brand}</Text>}
          {item.source && <Text style={styles.sourceText}>{item.source}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && <Text style={styles.loadingText}>Searching...</Text>}

      <FlatList
        data={searchResults}
        renderItem={renderFoodItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.resultsList}
        ListEmptyComponent={
          !loading && searchQuery ? (
            <Text style={styles.emptyText}>No foods found. Try a different search term.</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  searchContainer: { flexDirection: 'row', marginBottom: 20 },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
    marginRight: 10
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center'
  },
  searchButtonText: { color: 'white', fontWeight: 'bold' },
  loadingText: { textAlign: 'center', fontSize: 16, color: '#666' },
  resultsList: { flex: 1 },
  foodItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee'
  },
  foodInfo: { flex: 1 },
  foodName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  foodDetails: { fontSize: 14, color: '#666', marginBottom: 5 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandText: { fontSize: 12, color: '#999', fontStyle: 'italic' },
  sourceText: { fontSize: 10, color: '#007AFF', backgroundColor: '#E3F2FD', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#666', marginTop: 50 }
});