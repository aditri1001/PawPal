import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../AuthContext';
import { useNavigation } from 'expo-router';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ShopScreen() {
  const { cartProducts, setCartProducts } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const navigation = useNavigation();

  const products = [
    { id: "-2", name: 'Oceanic Fish Tank', price: 149.99, originalPrice: '$170.00', discount: '12%', image: 'https://images.unsplash.com/photo-1739056656195-ba25ea0a7b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D' },
    { id: "-3", name: 'Natural Grass Litter', price: 85.50, originalPrice: '$100.00', discount: '15%', image: 'https://images.unsplash.com/photo-1738762389093-ea0e0e80cee8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D' },
    { id: "-4", name: 'Smart Cat Collar', price: 399.99, originalPrice: '$450.00', discount: '11%', image: 'https://images.unsplash.com/photo-1739611216836-53834bfec75b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D' },
    { id: "-5", name: 'Pet Grooming Kit', price: 499.00, originalPrice: '$520.00', discount: '4%', image: 'https://plus.unsplash.com/premium_photo-1734640921345-6037f1c70e20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D' },
    { id: "-6", name: 'Interactive Cat Toy', price: 199.75, originalPrice: '$230.00', discount: '13%', image: 'https://images.unsplash.com/photo-1739582814657-10931286d7a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8' },
    { id: "-7", name: 'Organic Fish Food', price: 225.30, originalPrice: '$240.00', discount: '6%', image: 'https://images.unsplash.com/photo-1739477021524-0266d3dabec9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4Mnx8fGVufDB8fHx8fA%3D%3D' },
    { id: "-8", name: 'Pet Cooling Mat', price: 599.00, originalPrice: '$650.00', discount: '8%', image: 'https://plus.unsplash.com/premium_photo-1737051561939-42ab3822b870?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D' },
    { id: "-9", name: 'Pet Stroller', price: 879.90, originalPrice: '$950.00', discount: '7%', image: 'https://images.unsplash.com/photo-1739715642309-04ea662522eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D' },
    { id: "-10", name: 'Catnip Spray', price: 89.99, originalPrice: '$100.00', discount: '10%', image: 'https://images.unsplash.com/photo-1737467034151-16e643c905c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D' },
    { id: "-11", name: 'Pet Backpack Carrier', price: 799.00, originalPrice: '$850.00', discount: '6%', image: 'https://images.unsplash.com/photo-1739705690223-0219a1f06a14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D' },
    { id: "-12", name: 'Bird Feeding Station', price: 319.50, originalPrice: '$350.00', discount: '9%', image: 'https://plus.unsplash.com/premium_photo-1738779001498-a1385f9b897d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D' },
    { id: "-13", name: 'Self-Cleaning Litter Box', price: 1099.00, originalPrice: '$1150.00', discount: '4%', image: 'https://images.unsplash.com/photo-1736821481668-2cb07ceed73b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D' },
    { id: "-14", name: 'Pet Car Seat Cover', price: 399.00, originalPrice: '$420.00', discount: '5%', image: 'https://plus.unsplash.com/premium_photo-1738779001491-1ed3a7e1affe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D' },
  ]



  const handleAddToCart = (product) => {
    const existingProductIndex = cartProducts.findIndex(item => item.id === product.id);
    if (existingProductIndex === -1) {
      setCartProducts((prev) => [...prev, { ...product, quantity: 1 }]);
    } else {
      const updatedCart = [...cartProducts];
      updatedCart[existingProductIndex].quantity += 1;
      setCartProducts(updatedCart);
    }
    ToastAndroid.show('Added to cart successfully!', ToastAndroid.SHORT);
  };

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
    <LinearGradient colors={["#ECCEAE", "#ffffff"]}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Services</Text>
          <TouchableOpacity style={styles.cartIconContainer} onPress={() => navigation.navigate('profile-page/cart')}>
            <Ionicons name="cart-outline" size={24} color="white" />
            {cartProducts.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartProducts.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {products.map((product) => (
            <View key={product.id} style={styles.card}>
              <Image source={{ uri: product.image }} style={styles.image} />
              <Text style={styles.discount}>{product.discount} OFF</Text>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.price}>
                <Text style={styles.originalPrice}>{product.originalPrice}</Text> ${product.price}
              </Text>
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => handleAddToCart(product)}>
                <Ionicons name="cart-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 120
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 8
  },
  discount: {
    backgroundColor: '#ff7f50',
    color: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 4
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginTop: 6
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27ae60'
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through'
  },
  cartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    padding: 6,
    borderRadius: 20
  },
  cartIconContainer: {
    position: "relative",
    padding: 8,
    backgroundColor: '#379777',
    borderRadius: 50
  },
  cartBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#FF4500",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center"
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold"
  }
});
