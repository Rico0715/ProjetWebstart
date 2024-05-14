import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';


interface ProductData {
    product_name: string;
    categories: string;
    brands: string;
  }

const App = () => {
    const [productData, setProductData] = useState<ProductData | null>(null);

    const fetchProductData = async () => {
        try {
          const response = await axios.get('https://world.openfoodfacts.org/api/v0/product/3268840001008.json');
          console.log('Response data:', response.data);
          const product = response.data.product;
          console.log('Product:', product);
          setProductData(product);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {productData ? (
        <>
          <Text style={styles.text}>Nom du produit : {productData.product_name}</Text>
          <Text style={styles.text}>Catégorie : {productData.categories}</Text>
          <Text style={styles.text}>Marque : {productData.brands}</Text>
        </>
      ) : (
        <Text style={styles.loadingText}>Chargement des données du produit...</Text>
      )}
    </View>
  );

};
const styles = StyleSheet.create({
  text: {
    color: 'yellow', 
    marginBottom: 10 
  },
  loadingText: {
    color: 'yellow',
    fontSize: 18 
  }
});
export default App;
