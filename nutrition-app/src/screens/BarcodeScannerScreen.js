import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { searchFoodByBarcode } from '../services/foodApi';
import { addFoodEntry } from '../services/database';

export default function BarcodeScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setLoading(true);

    try {
      const foodData = await searchFoodByBarcode(data);
      
      if (foodData) {
        Alert.alert(
          'Food Found',
          `${foodData.name}\nCalories: ${foodData.calories}/100g`,
          [
            { text: 'Cancel', onPress: () => setScanned(false) },
            { 
              text: 'Add to Log', 
              onPress: async () => {
                await addFoodEntry(foodData);
                navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'Food Not Found',
          'This product is not in our NZ/AU database. Try manual search.',
          [{ text: 'OK', onPress: () => setScanned(false) }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to lookup product');
      setScanned(false);
    }
    
    setLoading(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.overlay}>
        <View style={styles.scanArea} />
        <Text style={styles.instruction}>
          {loading ? 'Looking up product...' : 'Point camera at barcode'}
        </Text>
        
        {scanned && (
          <TouchableOpacity 
            style={styles.rescanButton} 
            onPress={() => setScanned(false)}
          >
            <Text style={styles.rescanText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent'
  },
  instruction: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center'
  },
  rescanButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20
  },
  rescanText: { color: 'white', fontSize: 16 }
});