import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('nutrition.db');

// Initialize database
const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS food_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        brand TEXT,
        calories REAL,
        protein REAL,
        carbs REAL,
        fat REAL,
        fiber REAL,
        sodium REAL,
        sugar REAL,
        calcium REAL DEFAULT 0,
        iron REAL DEFAULT 0,
        magnesium REAL DEFAULT 0,
        potassium REAL DEFAULT 0,
        zinc REAL DEFAULT 0,
        vitaminC REAL DEFAULT 0,
        serving_size REAL DEFAULT 100,
        date TEXT,
        barcode TEXT
      );
    `);
    
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS user_goals (
        id INTEGER PRIMARY KEY,
        calories INTEGER DEFAULT 2000,
        protein INTEGER DEFAULT 150,
        carbs INTEGER DEFAULT 200,
        fat INTEGER DEFAULT 65,
        fiber INTEGER DEFAULT 25
      );
    `);
  });
};

// Add food entry
const addFoodEntry = (foodData, servingSize = 100) => {
  return new Promise((resolve, reject) => {
    const today = new Date().toISOString().split('T')[0];
    
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO food_entries 
         (name, brand, calories, protein, carbs, fat, fiber, sodium, sugar, calcium, iron, magnesium, potassium, zinc, vitaminC, serving_size, date, barcode) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          foodData.name,
          foodData.brand || '',
          (foodData.calories * servingSize) / 100,
          (foodData.protein * servingSize) / 100,
          (foodData.carbs * servingSize) / 100,
          (foodData.fat * servingSize) / 100,
          (foodData.fiber * servingSize) / 100,
          (foodData.sodium * servingSize) / 100,
          (foodData.sugar * servingSize) / 100,
          ((foodData.calcium || 0) * servingSize) / 100,
          ((foodData.iron || 0) * servingSize) / 100,
          ((foodData.magnesium || 0) * servingSize) / 100,
          ((foodData.potassium || 0) * servingSize) / 100,
          ((foodData.zinc || 0) * servingSize) / 100,
          ((foodData.vitaminC || 0) * servingSize) / 100,
          servingSize,
          today,
          foodData.barcode || ''
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Get today's nutrition totals
const getDailyNutrition = () => {
  return new Promise((resolve, reject) => {
    const today = new Date().toISOString().split('T')[0];
    
    db.transaction(tx => {
      tx.executeSql(
        `SELECT 
          COALESCE(SUM(calories), 0) as calories,
          COALESCE(SUM(protein), 0) as protein,
          COALESCE(SUM(carbs), 0) as carbs,
          COALESCE(SUM(fat), 0) as fat,
          COALESCE(SUM(fiber), 0) as fiber,
          COALESCE(SUM(sodium), 0) as sodium,
          COALESCE(SUM(sugar), 0) as sugar,
          COALESCE(SUM(calcium), 0) as calcium,
          COALESCE(SUM(iron), 0) as iron,
          COALESCE(SUM(magnesium), 0) as magnesium,
          COALESCE(SUM(potassium), 0) as potassium,
          COALESCE(SUM(zinc), 0) as zinc,
          COALESCE(SUM(vitaminC), 0) as vitaminC
         FROM food_entries WHERE date = ?`,
        [today],
        (_, { rows }) => {
          const result = rows.item(0);
          resolve({
            calories: Math.round(result.calories),
            protein: Math.round(result.protein * 10) / 10,
            carbs: Math.round(result.carbs * 10) / 10,
            fat: Math.round(result.fat * 10) / 10,
            fiber: Math.round(result.fiber * 10) / 10,
            sodium: Math.round(result.sodium),
            sugar: Math.round(result.sugar * 10) / 10,
            calcium: Math.round(result.calcium),
            iron: Math.round(result.iron * 10) / 10,
            magnesium: Math.round(result.magnesium),
            potassium: Math.round(result.potassium),
            zinc: Math.round(result.zinc * 10) / 10,
            vitaminC: Math.round(result.vitaminC * 10) / 10
          });
        },
        (_, error) => reject(error)
      );
    });
  });
};

// Get today's food entries
const getTodaysFoods = () => {
  return new Promise((resolve, reject) => {
    const today = new Date().toISOString().split('T')[0];
    
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM food_entries WHERE date = ? ORDER BY id DESC',
        [today],
        (_, { rows }) => {
          const foods = [];
          for (let i = 0; i < rows.length; i++) {
            foods.push(rows.item(i));
          }
          resolve(foods);
        },
        (_, error) => reject(error)
      );
    });
  });
};

// Get nutrition history for charts/analysis
const getNutritionHistory = (days = 7) => {
  return new Promise((resolve, reject) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split('T')[0];
    
    db.transaction(tx => {
      tx.executeSql(
        `SELECT 
          date,
          SUM(calories) as calories,
          SUM(protein) as protein,
          SUM(carbs) as carbs,
          SUM(fat) as fat,
          SUM(fiber) as fiber
         FROM food_entries 
         WHERE date >= ? 
         GROUP BY date 
         ORDER BY date DESC`,
        [startDateStr],
        (_, { rows }) => {
          const history = [];
          for (let i = 0; i < rows.length; i++) {
            history.push(rows.item(i));
          }
          resolve(history);
        },
        (_, error) => reject(error)
      );
    });
  });
};

// Initialize database on import
initDatabase();

export { 
  addFoodEntry, 
  getDailyNutrition, 
  getTodaysFoods, 
  getNutritionHistory 
};