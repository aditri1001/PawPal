import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import prices from '../constants/Price';
import { useAuth } from '../AuthContext';
import LottieView from 'lottie-react-native';
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const navigation = useNavigation();
  const [dogsDetail, setDogsDetail] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const { cartProducts, setCartProducts } = useAuth();

  useEffect(() => {
    const fetchDogBreeds = async () => {
      try {
        const response = await axios.get('https://dogbreeddb.p.rapidapi.com/', {
          headers: {
            'x-rapidapi-key': '4146046a5dmsh3a5f153e5430ec1p1c6748jsn9fadd1afd1a5',
            'x-rapidapi-host': 'dogbreeddb.p.rapidapi.com',
          },
        });

        if (Array.isArray(response.data)) {
          const filteredDogs = response.data
            .filter(dog => dog.imgThumb && !dog.imgThumb.includes("dog-default"))
            .map((dog) => ({
              ...dog,
              price: prices[dog.id % prices.length],
            }));

          setDogsDetail(filteredDogs);
          setFilteredDogs(filteredDogs);
        }
      } catch (error) {
        console.error('Failed to fetch dog breeds:', error);
      }
    };

    fetchDogBreeds();
  }, []);

  const searchBreed = (text) => {
    setSearchQuery(text);
    setFilteredDogs(dogsDetail.filter(dog => dog.breedName.toLowerCase().includes(text.toLowerCase())));
  };

  const handleAddToCart = (product) => {
    const newProduct = { ...product, name: product.breedName, image: product.imgThumb }

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

  const handleNavigateToDetail = (breed) => {
    setIsLoading(true);
    navigation.navigate('profile-page/dog-breed-detail', { breed });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const getRandomDiscount = () => {
    return Math.floor(Math.random() * 21) + 10;
  };

  const BreedCard = ({ breed }) => {
    const discount = getRandomDiscount();
    const originalPrice = Math.round(breed.price / (1 - discount / 100));

    return (
      <View style={styles.breedCard}>
        <TouchableOpacity onPress={() => handleNavigateToDetail(breed)}>
          <Image source={{ uri: breed.imgThumb }} style={styles.breedImage} />
        </TouchableOpacity>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{discount}%</Text>
        </View>
        <Text style={styles.breedName}>{breed.breedName}</Text>
        <View style={{ justifyContent: 'center', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Text style={styles.originalPrice}>${originalPrice}</Text>
          <Text style={styles.breedPrice}>${breed.price}</Text>
        </View>
        <TouchableOpacity style={styles.cartButton} onPress={() => handleAddToCart(breed)}>
          <Ionicons name="cart-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    )

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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flexContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.flexContainer}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <View style={styles.searchBar}>
                <TextInput
                  placeholder="Search for a dog breed..."
                  value={searchQuery}
                  onChangeText={searchBreed}
                  style={styles.searchInput}
                />
                <TouchableOpacity onPress={() => searchBreed(searchQuery)}>
                  <Ionicons name='search' size={30} style={styles.searchButton} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.cartIconContainer} onPress={() => navigation.navigate('profile-page/cart')}>
                <Ionicons name="cart-outline" size={24} color="white" />
                {cartProducts.length > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartProducts.length}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.hero}>
              <Image
                source={{ uri: 'https://png.pngtree.com/thumb_back/fw800/background/20240223/pngtree-funny-little-dog-sitting-beautiful-background-image_15629880.jpg' }}
                style={styles.heroImage}
              />
              <View style={styles.heroTextContainer}>
                <Text style={styles.heroTitle}>A Furry Friend, A Lifetime of Love</Text>
                <Text style={styles.heroSubtitle}>with a DOG</Text>
              </View>
            </View>

            <FlatList
              data={filteredDogs}
              renderItem={({ item }) => <BreedCard breed={item} />}
              keyExtractor={(item) => item.id}
              numColumns={3}
              contentContainerStyle={{ paddingBottom: 120 }}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 50,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    fontSize: 16,
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 16,
  },
  searchButton: {
    width: 80,
    backgroundColor: '#3674B5',
    color: '#ffffff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 8,
    textAlign: 'center',
    height: 50
  },
  breedCard: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  breedImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  breedName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#333',
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    backgroundColor: '#F2F9FF',
    height: 30,
  },
  breedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27ae60'
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
    textDecorationLine: 'line-through'
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#ff7f50',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  discountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartButton: {
    position: 'absolute',
    top: 100,
    right: 0,
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 20,
    elevation: 5,
  },
  hero: {
    marginVertical: 10,
    position: 'relative',
    height: 200,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 256,
    borderRadius: 10,
    opacity: 0.75,
  },
  heroTextContainer: {
    position: 'absolute',
    top: 20,
    alignItems: 'center',
    width: '100%',
  },
  heroTitle: {
    color: '#003161',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroSubtitle: {
    color: '#1E201E',
    fontSize: 38,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  cartIconContainer: {
    position: 'relative',
    padding: 10,
    backgroundColor: '#379777',
    borderRadius: 50
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF4500',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});
