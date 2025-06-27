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
    // Search OpenFoodFacts database
    const response = await axios.get(`${OPENFOODFACTS_API}/cgi/search.pl`, {
      params: {
        search_terms: query,
        search_simple: 1,
        action: 'process',
        json: 1,
        page_size: 20,
        countries: 'New Zealand,Australia'
      }
    });

    if (response.data.products) {
      return response.data.products.map(product => ({
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
        barcode: product.code
      })).filter(food => food.calories > 0); // Filter out incomplete entries
    }

    return [];
  } catch (error) {
    console.error('Food search error:', error);
    return [];
  }
};

// Fallback NZ/AU common foods database
const getNZAUCommonFoods = () => [
  { name: 'Weet-Bix (2 biscuits)', calories: 136, protein: 4.4, carbs: 24.8, fat: 1.4, fiber: 3.4, iron: 3.6, calcium: 24 },
  { name: 'Vogels Bread (1 slice)', calories: 109, protein: 4.2, carbs: 16.8, fat: 2.8, fiber: 2.1, iron: 1.2, magnesium: 45 },
  { name: 'Anchor Milk (1 cup)', calories: 150, protein: 8.0, carbs: 12.0, fat: 8.0, fiber: 0, calcium: 300, vitaminB12: 1.1 },
  { name: 'Mainland Cheese (30g)', calories: 120, protein: 7.5, carbs: 0.3, fat: 10.0, fiber: 0, calcium: 200, zinc: 1.0 },
  { name: 'Tegel Chicken Breast (100g)', calories: 165, protein: 31.0, carbs: 0, fat: 3.6, fiber: 0, iron: 0.7, zinc: 1.0 },
  { name: 'Watties Baked Beans (1/2 cup)', calories: 105, protein: 5.0, carbs: 19.0, fat: 0.5, fiber: 5.0, iron: 1.8, potassium: 300 },
  { name: 'Avocado (1 medium)', calories: 234, protein: 2.9, carbs: 8.5, fat: 21.4, fiber: 6.7, potassium: 690, magnesium: 39 },
  { name: 'Banana (1 medium)', calories: 105, protein: 1.3, carbs: 27.0, fat: 0.4, fiber: 3.1, potassium: 422, vitaminC: 10.3 }
];

export { searchFoodByBarcode, searchFoodByName, getNZAUCommonFoods };