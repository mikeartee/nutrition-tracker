import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getDailyNutrition, getTodaysFoods } from '../services/database';

export default function HomeScreen({ navigation }) {
  const [dailyNutrition, setDailyNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0
  });
  const [todaysFoods, setTodaysFoods] = useState([]);

  useEffect(() => {
    loadDailyData();
  }, []);

  const loadDailyData = async () => {
    const nutrition = await getDailyNutrition();
    const foods = await getTodaysFoods();
    setDailyNutrition(nutrition);
    setTodaysFoods(foods);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Nutrition</Text>
      
      <View style={styles.nutritionCard}>
        <Text style={styles.calorieText}>{dailyNutrition.calories} cal</Text>
        <View style={styles.macroRow}>
          <Text>Protein: {dailyNutrition.protein}g</Text>
          <Text>Carbs: {dailyNutrition.carbs}g</Text>
          <Text>Fat: {dailyNutrition.fat}g</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('BarcodeScanner')}
        >
          <Text style={styles.buttonText}>Scan Barcode</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('FoodSearch')}
        >
          <Text style={styles.buttonText}>Search Food</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('NutritionOptimizer')}
        >
          <Text style={styles.buttonText}>Optimize Nutrition</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.foodList}>
        <Text style={styles.sectionTitle}>Today's Foods</Text>
        {todaysFoods.map((food, index) => (
          <View key={index} style={styles.foodItem}>
            <Text>{food.name}</Text>
            <Text>{food.calories} cal</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  nutritionCard: { backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 20 },
  calorieText: { fontSize: 32, fontWeight: 'bold', textAlign: 'center' },
  macroRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  buttonContainer: { marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, marginBottom: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  foodList: { backgroundColor: 'white', padding: 15, borderRadius: 10 },
  foodItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' }
});