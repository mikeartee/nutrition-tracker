import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getDailyNutrition } from '../services/database';
import { getDailyTargets, getMineralFoodSources, getDeficiencyWarnings } from '../services/nutritionTargets';

export default function NutritionOptimizer({ navigation }) {
  const [currentNutrition, setCurrentNutrition] = useState({});
  const [targets, setTargets] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [mineralSources, setMineralSources] = useState({});

  useEffect(() => {
    const dailyTargets = getDailyTargets(30, 'male', 'moderate');
    setTargets(dailyTargets);
    setMineralSources(getMineralFoodSources());
    loadNutritionData(dailyTargets);
  }, []);

  const loadNutritionData = async (dailyTargets) => {
    const nutrition = await getDailyNutrition();
    setCurrentNutrition(nutrition);
    const warnings = getDeficiencyWarnings(nutrition, dailyTargets);
    setRecommendations(warnings);
  };



  const getNutrientProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nutrition Optimizer</Text>
      
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Daily Progress</Text>
        
        {['calories', 'protein', 'carbs', 'fat', 'fiber', 'calcium', 'iron', 'magnesium', 'potassium', 'zinc', 'vitaminC'].map(nutrient => (
          <View key={nutrient} style={styles.progressItem}>
            <Text style={styles.nutrientName}>
              {nutrient.charAt(0).toUpperCase() + nutrient.slice(1).replace(/([A-Z])/g, ' $1')}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${getNutrientProgress(currentNutrition[nutrient] || 0, targets[nutrient] || 1)}%`,
                    backgroundColor: getNutrientProgress(currentNutrition[nutrient] || 0, targets[nutrient] || 1) < 70 ? '#FF6B35' : '#4CAF50'
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round((currentNutrition[nutrient] || 0) * 10) / 10} / {targets[nutrient] || 0}
              {['calcium', 'iron', 'magnesium', 'potassium', 'zinc'].includes(nutrient) ? 'mg' : 
               nutrient === 'vitaminC' ? 'mg' : 
               ['calories'].includes(nutrient) ? '' : 'g'}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.recommendationsSection}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        
        {recommendations.length === 0 ? (
          <Text style={styles.goodJob}>Great job! You're meeting your nutrition goals!</Text>
        ) : (
          recommendations.map((rec, index) => (
            <View key={index} style={[styles.recommendationCard, rec.severity === 'high' && styles.criticalCard]}>
              <Text style={styles.recMessage}>{rec.message}</Text>
              <Text style={styles.recFoods}>
                Try: {mineralSources[rec.nutrient]?.join(', ') || 'Varied whole foods'}
              </Text>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity 
        style={styles.mealPlanButton}
        onPress={() => {/* Generate meal plan */}}
      >
        <Text style={styles.buttonText}>Generate Meal Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  progressSection: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 },
  progressItem: { marginBottom: 15 },
  nutrientName: { fontSize: 16, marginBottom: 5 },
  progressBar: { height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, marginBottom: 5 },
  progressFill: { height: '100%', backgroundColor: '#4CAF50', borderRadius: 4 },
  progressText: { fontSize: 14, color: '#666' },
  recommendationsSection: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 },
  goodJob: { color: '#4CAF50', fontSize: 16, textAlign: 'center', fontStyle: 'italic' },
  recommendationCard: { backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8, marginBottom: 10 },
  criticalCard: { backgroundColor: '#ffe6e6', borderLeftWidth: 4, borderLeftColor: '#FF6B35' },
  recMessage: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  recFoods: { fontSize: 14, color: '#666' },
  mealPlanButton: { backgroundColor: '#FF6B35', padding: 15, borderRadius: 8 },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }
});