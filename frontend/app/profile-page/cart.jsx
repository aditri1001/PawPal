import React, { useState } from "react";
import {
    View, Text, Image, FlatList, TouchableOpacity,
    StyleSheet, ToastAndroid, Modal,
    ActivityIndicator
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { useAuth } from "../../AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import LottieView from "lottie-react-native";

const ShoppingCart = () => {
    const navigation = useNavigation();
    const { cartProducts, setCartProducts, setCartAmount } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 2000);

    const handleIncrement = (id) => {
        setCartProducts(cartProducts.map(item =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    const handleDecrement = (id) => {
        setCartProducts(cartProducts.map(item =>
            item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ).filter(item => item.quantity > 0));
    };

    const handleDelete = (id) => {
        setCartProducts(cartProducts.filter(item => item.id !== id));
        ToastAndroid.show('Removed From Cart!', ToastAndroid.SHORT);
    };

    const subtotal = cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const freeShippingThreshold = 2199;
    const amountNeeded = freeShippingThreshold - subtotal;
    const progress = subtotal / freeShippingThreshold;

    setCartAmount(cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0));

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
        <View style={styles.container}>
            <Text style={styles.header}>Shopping Cart</Text>

            {cartProducts.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyContainerText}>Nothing In Cart!</Text>
                </View>
            ) : (
                <FlatList
                    data={cartProducts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.details}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.button}>
                                        <Text style={styles.buttonText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantity}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => handleIncrement(item.id)} style={styles.button}>
                                        <Text style={styles.buttonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.cartBadge} onPress={() => handleDelete(item.id)}>
                                <Text style={styles.cartBadgeText}>
                                    <Ionicons name="close-outline" />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            <View style={styles.footer}>
                <Text style={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</Text>
                {amountNeeded > 0 && (
                    <Text style={styles.freeShipping}>
                        Add ${amountNeeded.toFixed(2)} to your cart to get Free Shipping!
                    </Text>
                )}
                <ProgressBar progress={progress} color="#FF8000" style={styles.progress} />

                {cartProducts.length === 0 ? (
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.buttonText}>CHECKOUT</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate("profile-page/check-out")}>
                        <Text style={styles.buttonText}>CHECKOUT</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Oops!</Text>
                        <Text style={styles.modalText}>Your cart is empty.</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#EEEDEB", paddingBottom: "25%" },
    header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    itemContainer: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
    image: { width: 100, height: 100, marginRight: 10, borderRadius: 10 },
    details: { flex: 1 },
    title: { fontSize: 16, fontWeight: "bold" },
    price: { fontSize: 16, color: "#FF8000", marginTop: 5 },
    quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
    button: { backgroundColor: "#FF8000", padding: 8, borderRadius: 5, marginHorizontal: 5, width: 40, justifyContent: 'center', alignItems: 'center' },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: 'center' },
    quantity: { fontSize: 16, fontWeight: "bold" },
    footer: { marginTop: 20, paddingVertical: 10, borderTopWidth: 1, borderColor: "#ddd" },
    subtotal: { fontSize: 18, fontWeight: "bold", textAlign: "right" },
    freeShipping: { fontSize: 14, color: "#777", textAlign: "center", marginTop: 5 },
    progress: { height: 6, marginVertical: 10 },
    checkoutButton: { backgroundColor: "#FF8000", padding: 14, marginTop: 10, alignItems: "center", borderRadius: 5 },
    buttonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
    emptyContainer: { height: '74%', alignItems: 'center', justifyContent: 'center' },
    emptyContainerText: { fontSize: 30, opacity: 0.3 },
    cartBadge: { position: "absolute", top: 0, right: 0, backgroundColor: "#FF4500", width: 24, height: 24, borderRadius: 12, justifyContent: "center", alignItems: "center" },
    cartBadgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },

    // Modal Styles
    modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalContainer: { width: 300, backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" },
    modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    modalText: { fontSize: 16, marginBottom: 20, textAlign: "center" },
    modalButton: { backgroundColor: "#FF8000", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
    modalButtonText: { color: "white", fontWeight: "bold", fontSize: 16 }
});

export default ShoppingCart;
