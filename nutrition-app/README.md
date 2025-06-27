# Nutrition Tracker App

A React Native/Expo app for tracking food intake with barcode scanning and nutritional optimization, specifically designed for New Zealand and Australian food products.

## Features

- **Barcode Scanning**: Scan product barcodes to automatically add foods
- **Food Search**: Text-based search for foods in NZ/AU database
- **Nutrition Tracking**: Daily calorie and macro tracking
- **Nutrition Optimization**: Personalized recommendations based on daily intake
- **Local Database**: SQLite storage for offline functionality

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Run on device:
- Install Expo Go app on your phone
- Scan QR code from terminal
- Or use `npx expo start --android` / `npx expo start --ios`

## Food Database

- Primary: OpenFoodFacts API (filtered for NZ/AU products)
- Fallback: Built-in common NZ/AU foods database
- Barcode scanning prioritizes products sold in New Zealand and Australia

## Key Components

- **HomeScreen**: Daily nutrition overview and navigation
- **BarcodeScannerScreen**: Camera-based barcode scanning
- **FoodSearchScreen**: Text search for foods
- **NutritionOptimizer**: Progress tracking and recommendations
- **Database Service**: SQLite for local food entry storage
- **Food API Service**: Integration with food databases

## Permissions Required

- Camera access for barcode scanning
- Storage for local database

## Next Steps

- Add portion size selection
- Implement meal planning
- Add exercise tracking integration
- Create nutrition charts and analytics
- Add user profile and goal setting