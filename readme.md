# Nutrition Tracker App 🥗📱

A comprehensive React Native/Expo nutrition tracking application with barcode scanning and mineral optimization, specifically designed for New Zealand and Australian food products.

## 🌟 Features

### Core Functionality
- **📱 Daily Nutrition Dashboard** - Real-time tracking of calories, macros, and micronutrients
- **📷 Barcode Scanner** - Camera-based scanning with NZ/AU food database integration
- **🔍 Food Search** - Text-based search for regional food products
- **⚡ Nutrition Optimizer** - AI-powered recommendations based on dietary intake

### Comprehensive Nutrient Tracking
- **Macronutrients**: Calories, Protein, Carbohydrates, Fat, Fiber
- **Essential Minerals**: Calcium, Iron, Magnesium, Phosphorus, Potassium, Sodium, Zinc
- **Trace Minerals**: Iodine, Selenium, Copper, Manganese, Chromium, Molybdenum
- **Vitamins**: A, D, E, K, C, B-complex (B1, B2, B3, B6, B12, Folate, Biotin)

### Smart Features
- **🎯 Personalized Targets** - Age/gender/activity-specific recommendations
- **🚨 Deficiency Warnings** - Critical nutrient alerts with food suggestions
- **🇳🇿🇦🇺 Regional Focus** - NZ/AU dietary guidelines and food database
- **📊 Progress Tracking** - Color-coded nutrient progress bars
- **💾 Offline Storage** - SQLite database for local data persistence

## 🏗️ Technical Architecture

### Frontend
- **React Native** with Expo SDK 49
- **React Navigation** for screen management
- **Expo Camera & Barcode Scanner** for food scanning
- **SQLite** for local data storage

### Backend Services
- **OpenFoodFacts API** - Primary food database (filtered for NZ/AU)
- **Fallback Database** - Common NZ/AU foods (Weet-Bix, Anchor, Vogels, etc.)
- **Nutrition Targets Service** - NHMRC & NZ Ministry of Health guidelines

### Database Schema
```sql
food_entries (
  id, name, brand, calories, protein, carbs, fat, fiber,
  sodium, sugar, calcium, iron, magnesium, potassium,
  zinc, vitaminC, serving_size, date, barcode
)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Expo CLI
- iOS Simulator or Android Emulator (or physical device with Expo Go)

### Installation
```bash
# Clone repository
git clone <your-repo-url>
cd learn_git/nutrition-app

# Install dependencies
npm install

# Start development server
npx expo start

# Run on specific platform
npx expo start --ios     # iOS Simulator
npx expo start --android # Android Emulator
npx expo start --web     # Web browser
```

### Mobile Testing
1. Install **Expo Go** on your phone
2. Scan QR code from terminal
3. Grant camera permissions for barcode scanning

## 📱 App Screens

### 🏠 Home Screen
- Daily nutrition summary with calorie counter
- Macro breakdown (protein, carbs, fat)
- Quick access to all features
- Today's food log

### 📷 Barcode Scanner
- Real-time camera scanning
- NZ/AU product recognition
- Automatic nutrition data extraction
- One-tap food logging

### 🔍 Food Search
- Text-based search with autocomplete
- Regional food database
- Detailed nutrition information
- Brand and product filtering

### ⚡ Nutrition Optimizer
- Comprehensive nutrient progress tracking
- Personalized deficiency warnings
- Food source recommendations
- Color-coded progress indicators

## 🎯 Nutrition Guidelines

### Target Sources
- **Australia**: NHMRC (National Health and Medical Research Council)
- **New Zealand**: Ministry of Health Nutrient Reference Values
- **Activity Adjustments**: Sedentary, Moderate, High activity levels
- **Demographics**: Age and gender-specific recommendations

### Critical Nutrients Monitored
- **Iron** - Common deficiency, especially in women
- **Calcium** - Bone health, dairy alternatives
- **Vitamin D** - Limited sun exposure regions
- **Vitamin B12** - Plant-based diet considerations
- **Folate** - Pregnancy and general health

## 🛠️ Development

### Project Structure
```
nutrition-app/
├── src/
│   ├── screens/          # App screens
│   ├── services/         # API & database services
│   └── components/       # Reusable components
├── App.js               # Main app entry
├── app.json            # Expo configuration
└── package.json        # Dependencies
```

### Key Services
- **`foodApi.js`** - OpenFoodFacts integration & NZ/AU filtering
- **`database.js`** - SQLite operations & nutrition calculations
- **`nutritionTargets.js`** - Dietary reference values & recommendations

### Adding New Features
1. Create screen in `src/screens/`
2. Add navigation route in `App.js`
3. Update database schema if needed
4. Add API integrations in `src/services/`

## 🔧 Configuration

### Environment Variables
```bash
# Optional: Custom API endpoints
FOOD_API_BASE_URL=https://world.openfoodfacts.org/api/v0
```

### Permissions Required
- **Camera** - Barcode scanning
- **Storage** - Local database

## 📊 Data Sources

### Primary Database
- **OpenFoodFacts** - 2M+ products worldwide
- **Regional Filtering** - NZ/AU country tags
- **Nutrition Data** - Comprehensive macro/micronutrient profiles

### Fallback Foods
- Weet-Bix, Vogels Bread, Anchor Milk
- Mainland Cheese, Tegel Chicken
- Watties Baked Beans, Fresh Produce

## 🚀 Deployment

### Expo Build
```bash
# Build for app stores
npx expo build:ios
npx expo build:android

# Or use EAS Build (recommended)
npx eas build --platform all
```

### Web Deployment
```bash
npx expo export:web
# Deploy dist/ folder to hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenFoodFacts** - Open food database
- **NHMRC Australia** - Dietary guidelines
- **NZ Ministry of Health** - Nutrient reference values
- **Expo Team** - React Native framework

## 📞 Support

For support, email your-email@example.com or create an issue in this repository.

---

**Built with ❤️ for healthier eating in Australia and New Zealand** 🇦🇺🇳🇿