import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from 'expo-router';
import HomeHub from '../components/HomeHub';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const categories = [
    { name: 'Cats', icon: 'paw-outline', products: 700, navigate: 'cats' },
    { name: 'Dogs', icon: 'paw', products: 419, navigate: 'dogs' },
    { name: 'Pet Services', icon: 'construct', products: 13, navigate: 'services' },
  ];

  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#ECCEAE", "#ffffff"]}>
      <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
          <Text style={styles.headerTitle}>PawPal🐾</Text>
        </Animatable.View>

        {/* Hero Section */}
        <Animatable.View animation="slideInUp" duration={1000} style={styles.hero}>
          <Image
            source={{
              uri: 'https://png.pngtree.com/thumb_back/fw800/background/20240223/pngtree-funny-little-dog-sitting-beautiful-background-image_15629880.jpg',
            }}
            style={styles.heroImage}
          />
          <View style={styles.overlay} />
          <Animatable.View animation="fadeIn" delay={500} style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Bring Home Unconditional Love</Text>
            <Text style={styles.heroSubtitle}>with a Pet from PawPal</Text>
          </Animatable.View>
        </Animatable.View>

        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Choose your Furry Friend</Text>
        <Text style={styles.sectionSubtitle}>Shop Supplies For</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((item, index) => (
            <Animatable.View key={index} animation="bounceIn" delay={index * 200}>
              <TouchableOpacity onPress={() => navigation.navigate(item.navigate)} style={styles.categoryCard}>
                <View style={styles.categoryIcon}>
                  <Ionicons name={item.icon} size={32} color="white" />
                </View>
                <Text style={styles.categoryName}>{item.name}</Text>
                <Text style={styles.categoryProducts}>{item.products} products</Text>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>

        {/* Membership Section */}
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.membership}>
          <Text style={styles.membershipTitle}>PawPal Prime Membership</Text>
          <Text style={styles.membershipSubtitle}>Super Saver</Text>
          <Text style={styles.membershipPrice}>Just ₹799/- for 365 days</Text>
          <TouchableOpacity style={styles.membershipButton}>
            <Text style={styles.membershipButtonText}>Subscribe Now</Text>
          </TouchableOpacity>
        </Animatable.View>

        <HomeHub />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    // backgroundColor: 'white',
    // flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#fef3c7',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f97316',
  },
  hero: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 280,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    opacity: 0.95
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  heroTextContainer: {
    position: 'absolute',
    top: '35%',
    left: 20,
  },
  heroTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 28,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    fontStyle: 'italic'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    color: '#374151',
  },
  sectionSubtitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#1f2937',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  categoryCard: {
    alignItems: 'center',
    margin: 12,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  categoryIcon: {
    backgroundColor: '#fb923c',
    padding: 18,
    borderRadius: 50,
    width: 70
  },
  categoryName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    color: '#333',
  },
  categoryProducts: {
    color: '#6b7280',
    fontSize: 14,
  },
  membership: {
    backgroundColor: '#fef9c3',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
  },
  membershipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  membershipSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  membershipPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 6,
    color: '#e11d48',
  },
  membershipButton: {
    backgroundColor: '#f97316',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  membershipButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
