import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../../AuthContext';
import { ToastAndroid } from 'react-native';
import LottieView from 'lottie-react-native';

export default function BreedDetail() {
  const { cartProducts, setCartProducts } = useAuth();
  const route = useRoute();
  const { breed } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const handleAddToCart = (product) => {
    const newProduct = { ...product, name: product.breedName, image: product.imgThumb };

    const existingProductIndex = cartProducts.findIndex(item => item.id === newProduct.id);
    if (existingProductIndex === -1) {
      setCartProducts((prev) => [...prev, { ...newProduct, quantity: 1 }]);
    } else {
      const updatedCart = [...cartProducts];
      updatedCart[existingProductIndex].quantity += 1;
      setCartProducts(updatedCart);
    }

    ToastAndroid.show('Added to cart successfully!', ToastAndroid.SHORT);
  };


  const furColors = breed.furColor
    ? breed.furColor.split(',').map(color => color.trim())
    : [];

  if (isLoading) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
        <LottieView
          source={{ uri: 'https://lottie.host/436dce06-4c8b-4b7b-8195-678dc02a16b7/eKGwN0H9eH.lottie' }}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={{ uri: breed.imgThumb || 'https://via.placeholder.com/400' }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{breed.breedName || 'Unknown Breed'}</Text>
          <Text style={styles.subtitle}>{breed.breedType || 'Mixed Breed'}</Text>
          <Text style={styles.description}>
            {breed.breedDescription || 'No description available.'}
          </Text>
          <View style={styles.details}>
            <Text style={styles.info}>
              <Text style={{ fontWeight: 'bold' }}>Origin</Text> : {breed.origin || 'Unknown'}
            </Text>
            <Text style={styles.info}>
              <Text style={{ fontWeight: 'bold' }}>Height</Text> : {breed.minHeightInches} - {breed.maxHeightInches} inches
            </Text>
            <Text style={styles.info}>
              <Text style={{ fontWeight: 'bold' }}>Weight</Text> : {breed.minWeightPounds} - {breed.maxWeightPounds} lbs
            </Text>
            <Text style={styles.info}>
              <Text style={{ fontWeight: 'bold' }}>Lifespan</Text> : {breed.minLifeSpan} - {breed.maxLifeSpan} years
            </Text>
          </View>
          <View style={styles.badges}>
            {furColors.map(color => (
              <Text key={color} style={styles.badge}>
                {color}
              </Text>
            ))}
          </View>

          {/* Price Section */}
          <Text style={styles.price}>
            <Text style={{ fontWeight: 'bold' }}>Price:</Text> ${breed.price}
          </Text>

          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity style={[styles.cartButton]} onPress={() => {
              handleAddToCart(breed);
            }}>
              <Text style={styles.exploreText}>Want Later</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.exploreText}>Adopt Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F3F4F6',
  },
  wrapper: {
    borderRadius: 12,
    backgroundColor: '#FFF2F2',
    overflow: 'hidden',
    elevation: 4,
    padding: 16,
    marginBottom: 200,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    marginBottom: 12,
  },
  content: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 24,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    textAlign: 'center',
  },
  details: {
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 40,
    color: '#D84040',
    fontWeight: 'bold',
    marginTop: 12,
    fontStyle: 'italic',
  },
  badges: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  badge: {
    backgroundColor: '#E0E7FF',
    color: '#3730A3',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    margin: 4,
    fontSize: 20,
  },
  cartButton: {
    width: '45%',
    padding: 15,
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: '#F9CB43',
  },
  buyButton: {
    width: '45%',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#FF9D23',
    marginTop: 25,
    borderRadius: 10,
    elevation: 10,
  },
  exploreText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
