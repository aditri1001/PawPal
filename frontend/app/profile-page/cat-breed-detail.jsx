import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Linking, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../../AuthContext';
import { ToastAndroid } from 'react-native';
import LottieView from 'lottie-react-native';

export default function AsianSemiLonghair() {
    const { cartProducts, setCartProducts } = useAuth();
    const route = useRoute();
    const { breed } = route.params;
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 2000);

    const handleAddToCart = (product) => {
        const newProduct = { ...product, name: product.breed, image: product.img };

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
            <View style={styles.card}>
                <Image
                    source={{ uri: breed.img }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.content}>
                    <Text style={styles.title}>{breed.breed}</Text>
                    <Text style={styles.info}><Text style={{ fontWeight: 'bold' }}>Origin:</Text> {breed.origin || "Not Known"}</Text>
                    <Text style={styles.info}><Text style={{ fontWeight: 'bold' }}>Type :</Text> {breed.meta.type || "Not Known"}</Text>
                    <Text style={styles.info}><Text style={{ fontWeight: 'bold' }}>Body Type :</Text> {breed.meta.body_type || "Not Known"}</Text>
                    <Text style={styles.info}><Text style={{ fontWeight: 'bold' }}>Coat Type : </Text>{breed.meta.coat_type_and_length || "Not Known"}</Text>
                    <Text style={styles.info}><Text style={{ fontWeight: 'bold' }}>Coat Pattern :</Text> {breed.meta.coat_pattern || "Not Known"}</Text>
                    <Text style={styles.link} onPress={() => Linking.openURL(breed.url)}>
                        Learn more on Wikipedia...
                    </Text>

                    {/* Price Section */}
                    <Text style={styles.price}><Text style={{ fontWeight: 'bold' }}>Price: </Text> {`$${breed.price}` || "Not Available"}</Text>

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
        backgroundColor: '#f3f4f6',
    },
    card: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2
        },
        marginBottom: 200,
    },
    image: {
        width: '100%',
        height: 350,
        borderRadius: 12
    },
    content: {
        marginTop: 12
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold'
    },
    info: {
        fontSize: 18,
        color: '#555',
        marginBottom: 4
    },
    price: {
        fontSize: 40,
        color: '#D84040',
        fontWeight: 'bold',
        marginTop: 12,
        fontStyle: 'italic'
    },
    link: {
        fontSize: 18,
        color: '#3b82f6',
        marginTop: 8,
        textDecorationLine: 'underline',
        fontStyle: 'italic'
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
