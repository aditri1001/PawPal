import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Linking } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const sections = [
    { title: "Education", content: "B.Tech in IT - MMMUT (CGPA: 7.53)", icon: "school" },
    { title: "Experience", content: "Core Team Member - CSSE, Fashion Model Website", icon: "work" },
    { title: "Projects", content: "Student Management System, Weather App, Price Comparison Website", icon: "code" },
    { title: "Skills", content: "React, Redux, TypeScript, MongoDB, ExpressJS", icon: "build" },
    { title: "Achievements", content: "Solved 200+ LeetCode problems, 2nd Place at SIH", icon: "emoji-events" },
];

const socialLinks = [
    { name: "Gmail", icon: "mail", link: "mailto:adityatripathi1001@gmail.com" },
    { name: "Instagram", icon: "logo-instagram", link: "https://www.instagram.com/aditya.tripathi7" },
    { name: "LinkedIn", icon: "logo-linkedin", link: "https://www.linkedin.com/in/aditya-tripathi-85bb60257/" },
    { name: "GitHub", icon: "logo-github", link: "https://github.com/aditri1001" },
];

const HomeScreen = ({ navigation }) => {
    return (
        <LinearGradient colors={["#B7B1F2", "#ffffff"]} style={styles.container}>
            <ScrollView>
                <Image source={require("../../assets/mine.jpg")} style={styles.profileImage} />
                <Text style={styles.header}>Aditya Tripathi</Text>
                <Text style={styles.subHeader}>Full Stack Developer | React & Next.js Enthusiast</Text>

                <View style={styles.sectionContainer}>
                    {sections.map((section, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate("Detail", section)}>
                            <View style={styles.card}>
                                <MaterialIcons name={section.icon} size={24} color="#6A80B9" style={styles.icon} />
                                <Text style={styles.cardTitle}>{section.title}</Text>
                                <Ionicons name="chevron-forward" size={24} color="#666" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Contact Section */}
                <Text style={styles.contactHeader}>Connect with me</Text>
                <View style={styles.contactContainer}>
                    {socialLinks.map((social, index) => (
                        <TouchableOpacity key={index} onPress={() => Linking.openURL(social.link)}>
                            <Ionicons name={social.icon} size={38} color="#6A80B9" style={styles.contactCircle}/>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </LinearGradient>
    );
};

const DetailScreen = ({ route, navigation }) => {
    return (
        <View style={styles.detailContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={26} color="#4A90E2" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.detailTitle}>{route.params.title}</Text>
            <Text style={styles.detailContent}>{route.params.content}</Text>
        </View>
    );
};

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationIndependentTree>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Detail" component={DetailScreen} options={({ route }) => ({ title: route.params.title, headerShown: false })} />
            </Stack.Navigator>
        </NavigationIndependentTree>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignSelf: "center",
        marginBottom: 15,
        borderWidth: 3,
        borderColor: "#fff",
    },
    header: {
        fontSize: 36,
        fontWeight: "bold",
        textAlign: "center",
        color: "#2A3335",
        marginBottom: 5,
    },
    subHeader: {
        fontSize: 16,
        textAlign: "center",
        color: "#4A4947",
        marginBottom: 20,
    },
    sectionContainer: {
        marginHorizontal: 16,
    },
    card: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    icon: {
        marginRight: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        flex: 1,
    },
    contactHeader: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#5E686D",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    contactContainer: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 20,
    },
    contactCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4A90E2",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        margin: 5,
        elevation: 4,
    },
    contactCircle: {
        textShadowColor: '#000000',
        textShadowRadius: 0
    },
    contactIcon: {
        marginRight: 5,
    },
    contactText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    detailContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    backText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#4A90E2",
        marginLeft: 5,
    },
    detailTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    detailContent: {
        fontSize: 16,
        color: "#555",
        lineHeight: 22,
    },
});
