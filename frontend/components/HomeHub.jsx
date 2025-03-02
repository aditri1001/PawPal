import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const PetServicesScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#FDE3A7", "#FFFFFF"]} style={styles.gradient}>
      <View style={styles.container}>
        {/* Pet Adoption Section */}
        <View style={[styles.card, styles.bgYellow]}>
          <Text style={styles.title}>🐶 Pet Adoption</Text>
          <Text style={styles.description}>
            Want to adopt a little furry friend?
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.bgOrange]}
            onPress={() => navigation.navigate("home-pages/adoption-form")}
          >
            <Text style={styles.buttonText}>Request Now</Text>
          </TouchableOpacity>
        </View>

        {/* Interactive Cat Toys Section */}
        <View style={[styles.card, styles.bgPurple]}>
          <Text style={styles.title}>🐱 Interactive Cat Toys</Text>
          <Text style={styles.description}>
            Wide array of cat toys to keep your feline entertained!
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.bgGreen]}
            onPress={() => navigation.navigate("services")}
          >
            <Text style={styles.buttonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>

        {/* Pet Supplies Section */}
        <View style={[styles.card, styles.border]}>
          <Text style={styles.subTitle}>🛍️ Pet Supplies & Accessories</Text>
          <Text style={styles.description}>
            Get premium quality items shipped right to your doorstep!
          </Text>
        </View>

        {/* Fast Delivery Section */}
        <View style={[styles.card, styles.border, styles.rowCenter]}>
          <FontAwesome5 name="shipping-fast" size={28} color="#facc15" />
          <Text style={styles.fastDeliveryText}>Fast Delivery</Text>
        </View>

        {/* Pet Grooming Section */}
        <View style={[styles.card, styles.border]}>
          <Text style={styles.subTitle}>✂️ Pet Grooming</Text>
          <Text style={styles.description}>
            Trust our professional grooming services for your pets.
          </Text>
          <TouchableOpacity style={[styles.button, styles.bgOrange]}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    marginBottom: 100,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 16,
    alignItems: "center",
  },
  bgYellow: {
    backgroundColor: "#FEF3C7",
  },
  bgPurple: {
    backgroundColor: "#E9D5FF",
  },
  border: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#4B5563",
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bgOrange: {
    backgroundColor: "#F97316",
  },
  bgGreen: {
    backgroundColor: "#22C55E",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  fastDeliveryText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default PetServicesScreen;
