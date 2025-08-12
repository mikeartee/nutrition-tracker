import axios from 'axios';

// OpenFoodFacts API for NZ/AU products
const OPENFOODFACTS_API = 'https://world.openfoodfacts.org/api/v0';

// Food Standards Australia New Zealand (FSANZ) compatible search
const searchFoodByBarcode = async (barcode) => {
  try {
    // Try OpenFoodFacts first (has good NZ/AU coverage)
    const response = await axios.get(`${OPENFOODFACTS_API}/product/${barcode}.json`);
    
    if (response.data.status === 1) {
      const product = response.data.product;
      
      // Filter for NZ/AU products
      const countries = product.countries_tags || [];
      const isNZAU = countries.some(country => 
        country.includes('new-zealand') || country.includes('australia')
      );
      
      if (isNZAU || !countries.length) {
        return {
          barcode,
          name: product.product_name || 'Unknown Product',
          brand: product.brands || '',
          calories: parseFloat(product.nutriments?.['energy-kcal_100g']) || 0,
          protein: parseFloat(product.nutriments?.proteins_100g) || 0,
          carbs: parseFloat(product.nutriments?.carbohydrates_100g) || 0,
          fat: parseFloat(product.nutriments?.fat_100g) || 0,
          fiber: parseFloat(product.nutriments?.fiber_100g) || 0,
          sodium: parseFloat(product.nutriments?.sodium_100g) || 0,
          sugar: parseFloat(product.nutriments?.sugars_100g) || 0,
          calcium: parseFloat(product.nutriments?.calcium_100g) || 0,
          iron: parseFloat(product.nutriments?.iron_100g) || 0,
          magnesium: parseFloat(product.nutriments?.magnesium_100g) || 0,
          potassium: parseFloat(product.nutriments?.potassium_100g) || 0,
          zinc: parseFloat(product.nutriments?.zinc_100g) || 0,
          vitaminC: parseFloat(product.nutriments?.['vitamin-c_100g']) || 0
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Barcode search error:', error);
    return null;
  }
};

const searchFoodByName = async (query) => {
  try {
    // First search local NZ/AU database
    const localResults = searchLocalFoods(query);
    
    // Then search OpenFoodFacts database
    const response = await axios.get(`${OPENFOODFACTS_API}/cgi/search.pl`, {
      params: {
        search_terms: query,
        search_simple: 1,
        action: 'process',
        json: 1,
        page_size: 15,
        countries: 'New Zealand,Australia'
      }
    });

    let apiResults = [];
    if (response.data.products) {
      apiResults = response.data.products.map(product => ({
        name: product.product_name || 'Unknown Product',
        brand: product.brands || '',
        calories: parseFloat(product.nutriments?.['energy-kcal_100g']) || 0,
        protein: parseFloat(product.nutriments?.proteins_100g) || 0,
        carbs: parseFloat(product.nutriments?.carbohydrates_100g) || 0,
        fat: parseFloat(product.nutriments?.fat_100g) || 0,
        fiber: parseFloat(product.nutriments?.fiber_100g) || 0,
        sodium: parseFloat(product.nutriments?.sodium_100g) || 0,
        sugar: parseFloat(product.nutriments?.sugars_100g) || 0,
        calcium: parseFloat(product.nutriments?.calcium_100g) || 0,
        iron: parseFloat(product.nutriments?.iron_100g) || 0,
        magnesium: parseFloat(product.nutriments?.magnesium_100g) || 0,
        potassium: parseFloat(product.nutriments?.potassium_100g) || 0,
        zinc: parseFloat(product.nutriments?.zinc_100g) || 0,
        vitaminC: parseFloat(product.nutriments?.['vitamin-c_100g']) || 0,
        barcode: product.code,
        source: 'OpenFoodFacts'
      })).filter(food => food.calories > 0);
    }

    // Combine results with local first
    return [...localResults, ...apiResults];
  } catch (error) {
    console.error('Food search error:', error);
    // Return local results if API fails
    return searchLocalFoods(query);
  }
};

// Search local NZ/AU foods database
const searchLocalFoods = (query) => {
  const localFoods = getNZAUCommonFoods();
  const searchTerm = query.toLowerCase();
  
  return localFoods.filter(food => 
    food.name.toLowerCase().includes(searchTerm) ||
    (food.brand && food.brand.toLowerCase().includes(searchTerm))
  ).map(food => ({ ...food, source: 'Local NZ/AU Database' }));
};

// Enhanced NZ/AU common foods database
const getNZAUCommonFoods = () => [
  // Breakfast cereals
  { name: 'Weet-Bix (2 biscuits)', brand: 'Sanitarium', calories: 136, protein: 4.4, carbs: 24.8, fat: 1.4, fiber: 3.4, iron: 3.6, calcium: 24, sodium: 260 },
  { name: 'Cornflakes (30g)', brand: 'Kelloggs', calories: 113, protein: 2.1, carbs: 25.2, fat: 0.3, fiber: 0.9, iron: 5.4, sodium: 270 },
  
  // Bread & grains
  { name: 'Vogels Bread (1 slice)', brand: 'Goodman Fielder', calories: 109, protein: 4.2, carbs: 16.8, fat: 2.8, fiber: 2.1, iron: 1.2, magnesium: 45, sodium: 180 },
  { name: 'White Bread (1 slice)', calories: 80, protein: 2.5, carbs: 15.0, fat: 1.0, fiber: 0.8, iron: 0.9, calcium: 50, sodium: 150 },
  { name: 'Brown Rice (1 cup cooked)', calories: 216, protein: 5.0, carbs: 45.0, fat: 1.8, fiber: 3.5, magnesium: 84, potassium: 150 },
  
  // Dairy
  { name: 'Anchor Milk (1 cup)', brand: 'Anchor', calories: 150, protein: 8.0, carbs: 12.0, fat: 8.0, fiber: 0, calcium: 300, sodium: 120 },
  { name: 'Mainland Cheese (30g)', brand: 'Mainland', calories: 120, protein: 7.5, carbs: 0.3, fat: 10.0, fiber: 0, calcium: 200, zinc: 1.0, sodium: 180 },
  { name: 'Greek Yogurt (170g)', calories: 100, protein: 18.0, carbs: 6.0, fat: 0, fiber: 0, calcium: 200, sodium: 65 },
  
  // Meat & protein
  { name: 'Tegel Chicken Breast (100g)', brand: 'Tegel', calories: 165, protein: 31.0, carbs: 0, fat: 3.6, fiber: 0, iron: 0.7, zinc: 1.0, sodium: 70 },
  { name: 'Beef Mince (100g)', calories: 250, protein: 26.0, carbs: 0, fat: 15.0, fiber: 0, iron: 2.6, zinc: 4.8, sodium: 75 },
  { name: 'Salmon Fillet (100g)', calories: 208, protein: 25.4, carbs: 0, fat: 12.4, fiber: 0, calcium: 12, potassium: 363, sodium: 59 },
  { name: 'Eggs (2 large)', calories: 140, protein: 12.0, carbs: 1.0, fat: 10.0, fiber: 0, iron: 1.8, calcium: 50, sodium: 140 },
  
  // Vegetables
  { name: 'Kumara (1 medium baked)', calories: 112, protein: 2.0, carbs: 26.0, fat: 0.1, fiber: 3.9, potassium: 542, vitaminC: 22, sodium: 7 },
  { name: 'Broccoli (1 cup)', calories: 25, protein: 3.0, carbs: 5.0, fat: 0.3, fiber: 2.3, vitaminC: 81, calcium: 43, potassium: 288 },
  { name: 'Spinach (1 cup)', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, fiber: 0.7, iron: 0.8, calcium: 30, potassium: 167 },
  
  // Fruits
  { name: 'Avocado (1 medium)', calories: 234, protein: 2.9, carbs: 8.5, fat: 21.4, fiber: 6.7, potassium: 690, magnesium: 39, sodium: 10 },
  { name: 'Banana (1 medium)', calories: 105, protein: 1.3, carbs: 27.0, fat: 0.4, fiber: 3.1, potassium: 422, vitaminC: 10.3, sodium: 1 },
  { name: 'Apple (1 medium)', calories: 95, protein: 0.5, carbs: 25.0, fat: 0.3, fiber: 4.0, potassium: 195, vitaminC: 8.4, sodium: 2 },
  { name: 'Kiwifruit (1 medium)', calories: 42, protein: 0.8, carbs: 10.0, fat: 0.4, fiber: 2.1, vitaminC: 64, potassium: 215, sodium: 2 },
  
  // Pantry staples
  { name: 'Watties Baked Beans (1/2 cup)', brand: 'Watties', calories: 105, protein: 5.0, carbs: 19.0, fat: 0.5, fiber: 5.0, iron: 1.8, potassium: 300, sodium: 400 },
  { name: 'Peanut Butter (2 tbsp)', calories: 190, protein: 8.0, carbs: 8.0, fat: 16.0, fiber: 2.0, magnesium: 57, potassium: 208, sodium: 147 },
  { name: 'Olive Oil (1 tbsp)', calories: 119, protein: 0, carbs: 0, fat: 13.5, fiber: 0, sodium: 0 }
];

export { searchFoodByBarcode, searchFoodByName, getNZAUCommonFoods };