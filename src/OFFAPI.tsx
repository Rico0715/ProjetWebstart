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
    // Au chargement du composant, appelez la fonction fetchProductData pour récupérer les données du produit
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
    color: 'yellow', // Couleur jaune
    marginBottom: 10 // Espacement entre les textes
  },
  loadingText: {
    color: 'yellow', // Couleur jaune pour le texte de chargement
    fontSize: 18 // Taille de police pour le texte de chargement
  }
});
export default App;
