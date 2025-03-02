import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Image, ActivityIndicator } from "react-native";
import { TextInput, Button, Text, Menu, Provider, DefaultTheme } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "black",
        background: "white",
    },
};

const PetAdoptionForm = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendEmail = async (formData, { resetForm }) => {
        setLoading(true);
        try {
            const response = await axios.post("http://192.168.101.10:5000/send-email", formData);
            console.log("Success:", response.data);
            alert("Email sent successfully!");
            resetForm();
        } catch (error) {
            console.log("Error sending email:", error);
            alert("Failed to send email. Please try again.");
        }
        setLoading(false);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Enter a valid WhatsApp number")
            .required("Phone number is required"),
        email: Yup.string().email("Enter a valid email").required("Email is required"),
        contactTime: Yup.string().required("Time of contact is required!"),
        address: Yup.string().required("Address is required"),
        notes: Yup.string(),
    });

    return (
        <Provider theme={theme}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.hero}>
                    <Image source={{ uri: 'https://png.pngtree.com/thumb_back/fw800/background/20240223/pngtree-funny-little-dog-sitting-beautiful-background-image_15629880.jpg' }} style={styles.heroImage} />
                    <View style={styles.heroTextContainer}>
                        <Text style={styles.heroTitle}>Bring Home Unconditional Love</Text>
                        <Text style={styles.heroSubtitle}>with a Pet from PawPal</Text>
                    </View>
                </View>
                <Text style={styles.header}>Pet Adoption Form</Text>
                <Formik
                    initialValues={{
                        name: "",
                        phone: "",
                        email: "",
                        contactTime: "",
                        address: "",
                        notes: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={sendEmail}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <TextInput
                                label="Your Name"
                                mode="outlined"
                                onChangeText={handleChange("name")}
                                onBlur={handleBlur("name")}
                                value={values.name}
                                style={styles.input}
                                error={touched.name && errors.name}
                            />
                            <TextInput
                                label="Phone / WhatsApp Number"
                                mode="outlined"
                                keyboardType="phone-pad"
                                onChangeText={handleChange("phone")}
                                onBlur={handleBlur("phone")}
                                value={values.phone}
                                style={styles.input}
                                error={touched.phone && errors.phone}
                            />
                            <TextInput
                                label="Your Email"
                                mode="outlined"
                                keyboardType="email-address"
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                value={values.email}
                                style={styles.input}
                                error={touched.email && errors.email}
                            />

                            <View style={styles.menuContainer}>
                                <Menu
                                    visible={menuVisible}
                                    onDismiss={() => setMenuVisible(false)}
                                    style={{ marginLeft: 150 }}
                                    anchor={
                                        <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.menuButton}>
                                            {values.contactTime || "Time to Contact!"}
                                        </Button>
                                    }
                                >
                                    <Menu.Item
                                        onPress={() => {
                                            setMenuVisible(false);
                                            handleChange("contactTime")("Anytime");
                                        }}
                                        title="Anytime"
                                    />
                                    <Menu.Item
                                        onPress={() => {
                                            setMenuVisible(false);
                                            handleChange("contactTime")("Morning");
                                        }}
                                        title="Morning"
                                    />
                                    <Menu.Item
                                        onPress={() => {
                                            setMenuVisible(false);
                                            handleChange("contactTime")("Evening");
                                        }}
                                        title="Evening"
                                    />
                                </Menu>
                            </View>

                            <TextInput
                                label="Address"
                                mode="outlined"
                                onChangeText={handleChange("address")}
                                onBlur={handleBlur("address")}
                                value={values.address}
                                style={styles.input}
                                error={touched.address && errors.address}
                            />
                            <TextInput
                                label="Notes"
                                mode="outlined"
                                onChangeText={handleChange("notes")}
                                onBlur={handleBlur("notes")}
                                value={values.notes}
                                style={[styles.input, { height: 250 }]}
                                multiline
                                numberOfLines={3}
                            />

                            {/* Button with Activity Indicator */}
                            <Button mode="contained" onPress={handleSubmit} style={styles.button} disabled={loading}>
                                {loading ? <ActivityIndicator color="#fff" /> : "Send"}
                            </Button>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 200,
        backgroundColor: "#fdfdfd", // Softer white for a clean UI
    },
    hero: {
        position: 'relative',
        alignItems: "center",
        marginBottom: 20,
    },
    heroImage: {
        width: '100%',
        height: 280,
        borderRadius: 15,
        opacity: 0.85,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    heroTextContainer: {
        position: 'absolute',
        top: '15%',
        left: 20,
    },
    heroTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    heroSubtitle: {
        color: '#ffffff',
        fontSize: 18,
        marginBottom: 10,
        fontStyle: 'italic',
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: "#444",
        letterSpacing: 1,
    },
    input: {
        marginBottom: 14,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },
    button: {
        marginTop: 14,
        backgroundColor: "#FF6F00",
        paddingVertical: 12,
        borderRadius: 12,
        elevation: 4,
    },
    menuContainer: {
        marginBottom: 14,
        alignSelf: "center",
    },
    menuButton: {
        width: 220,
        borderRadius: 10,
        borderColor: "#FF6F00",
        borderWidth: 1.5,
        backgroundColor: "#fff",
        textAlign: "center",
        paddingVertical: 8,
        elevation: 2,
    },
});


export default PetAdoptionForm;
