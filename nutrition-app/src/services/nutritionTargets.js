// Australian Dietary Guidelines & NZ Nutrient Reference Values
// Based on NHMRC (Australia) and Ministry of Health (NZ) recommendations

const getDailyTargets = (age = 30, gender = 'male', activityLevel = 'moderate') => {
  const targets = {
    // Macronutrients
    calories: gender === 'male' ? 2500 : 2000,
    protein: gender === 'male' ? 64 : 46, // g
    carbs: 310, // g (45-65% of energy)
    fat: gender === 'male' ? 70 : 56, // g
    fiber: gender === 'male' ? 30 : 25, // g
    
    // Essential Minerals (mg unless noted)
    calcium: age > 50 ? 1300 : 1000,
    iron: gender === 'male' ? 8 : (age > 50 ? 8 : 18),
    magnesium: gender === 'male' ? 400 : 310,
    phosphorus: 700,
    potassium: 3800, // AI (Adequate Intake)
    sodium: 2300, // Upper limit
    zinc: gender === 'male' ? 14 : 8,
    
    // Trace Minerals (mcg)
    iodine: 150,
    selenium: gender === 'male' ? 70 : 60,
    copper: 900,
    manganese: gender === 'male' ? 2300 : 1800,
    chromium: gender === 'male' ? 35 : 25,
    molybdenum: 45,
    
    // Vitamins
    vitaminC: gender === 'male' ? 90 : 75, // mg
    vitaminD: 600, // IU
    vitaminB12: 2.4, // mcg
    folate: 400, // mcg
    vitaminA: gender === 'male' ? 900 : 700, // mcg RAE
    vitaminE: 15, // mg
    vitaminK: gender === 'male' ? 120 : 90, // mcg
    
    // B Vitamins (mg unless noted)
    thiamine: gender === 'male' ? 1.2 : 1.1,
    riboflavin: gender === 'male' ? 1.3 : 1.1,
    niacin: gender === 'male' ? 16 : 14,
    vitaminB6: age > 50 ? 1.7 : 1.3,
    biotin: 30, // mcg
    pantothenicAcid: 5
  };

  // Adjust for activity level
  if (activityLevel === 'high') {
    targets.calories *= 1.2;
    targets.protein *= 1.3;
    targets.sodium *= 1.1;
  } else if (activityLevel === 'low') {
    targets.calories *= 0.8;
  }

  return targets;
};

const getMineralFoodSources = () => ({
  calcium: ['Dairy products', 'Leafy greens', 'Sardines', 'Almonds', 'Fortified plant milks'],
  iron: ['Red meat', 'Spinach', 'Lentils', 'Fortified cereals', 'Oysters'],
  magnesium: ['Nuts', 'Seeds', 'Whole grains', 'Dark chocolate', 'Avocado'],
  potassium: ['Bananas', 'Potatoes', 'Beans', 'Spinach', 'Salmon'],
  zinc: ['Meat', 'Shellfish', 'Seeds', 'Nuts', 'Dairy'],
  selenium: ['Brazil nuts', 'Seafood', 'Eggs', 'Sunflower seeds'],
  iodine: ['Iodised salt', 'Seafood', 'Dairy', 'Eggs', 'Seaweed'],
  copper: ['Shellfish', 'Nuts', 'Seeds', 'Dark chocolate', 'Organ meats'],
  vitaminC: ['Citrus fruits', 'Berries', 'Kiwi fruit', 'Capsicum', 'Broccoli'],
  vitaminD: ['Fatty fish', 'Fortified milk', 'Egg yolks', 'Mushrooms'],
  folate: ['Leafy greens', 'Legumes', 'Fortified cereals', 'Asparagus'],
  vitaminB12: ['Meat', 'Fish', 'Dairy', 'Fortified plant foods', 'Nutritional yeast']
});

const getDeficiencyWarnings = (current, targets) => {
  const warnings = [];
  const critical = ['iron', 'calcium', 'vitaminD', 'vitaminB12', 'folate'];
  
  Object.keys(targets).forEach(nutrient => {
    const currentValue = current[nutrient] || 0;
    const targetValue = targets[nutrient];
    const percentage = (currentValue / targetValue) * 100;
    
    if (percentage < 50 && critical.includes(nutrient)) {
      warnings.push({
        nutrient,
        severity: 'high',
        message: `${nutrient} is critically low (${Math.round(percentage)}% of target)`
      });
    } else if (percentage < 70) {
      warnings.push({
        nutrient,
        severity: 'medium',
        message: `${nutrient} is below recommended intake (${Math.round(percentage)}% of target)`
      });
    }
  });
  
  return warnings.sort((a, b) => a.severity === 'high' ? -1 : 1);
};

export { getDailyTargets, getMineralFoodSources, getDeficiencyWarnings };