import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SignupForm = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    const handleSignup = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('http://192.168.101.10:5000/register', userData);
            console.log('Response:', response.data);
            if (response.status === 200) {
                setShowVideo(true);
                setTimeout(() => {
                    setShowVideo(false);
                }, 1500);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <LinearGradient colors={['#F8E8EE', '#FF8383']} style={styles.container}>
                <View style={styles.form}>
                    {showVideo ? (
                        <View style={styles.animationContainer}>
                            <LottieView
                                source={{ uri: 'https://lottie.host/9e3396fb-4e45-4a4b-8382-917f02e87e6d/hYn9Ixlzqz.lottie' }}
                                autoPlay
                                loop
                                style={styles.lottie}
                            />
                            <Text style={styles.successText}>Account Created</Text>
                        </View>
                    ) : (
                        <>
                            <LottieView
                                source={{ uri: 'https://lottie.host/8e220ecf-6a6a-4cd1-9684-0615cfb05215/gT4KJQWV9f.lottie' }}
                                autoPlay
                                loop
                                style={styles.topAnimation}
                            />
                            <Text style={styles.title}>Create an Account</Text>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Full Name</Text>
                                <TextInput
                                    placeholder='Full Name'
                                    style={styles.input}
                                    value={userData.fullName}
                                    onChangeText={(text) => setUserData({ ...userData, fullName: text })}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    placeholder='Email'
                                    style={styles.input}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={userData.email}
                                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    placeholder='Password'
                                    style={styles.input}
                                    secureTextEntry={true}
                                    value={userData.password}
                                    onChangeText={(text) => setUserData({ ...userData, password: text })}
                                />
                            </View>
                            <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={isLoading}>
                                <LinearGradient colors={['#ff6b6b', '#ff8e53']} style={styles.gradientButton}>
                                    {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
                                </LinearGradient>
                            </TouchableOpacity>
                            <Text style={styles.signupText}>
                                Already have an account?
                                <Text style={styles.signupLink} onPress={() => navigation.goBack()}> Log in</Text>
                            </Text>
                        </>
                    )}
                </View>
            </LinearGradient>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        overflow: 'hidden'
    },
    animationContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    lottie: {
        width: 250,
        height: 250,
    },
    successText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333'
    },
    topAnimation: {
        width: 210,
        height: 210,
        marginBottom: 20,
        marginLeft: 50,
    },
    form: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15
    },
    label: {
      color: '#EB5B00',
      fontWeight: '700',
      marginBottom: 5,
      fontSize: 16,
    },
    input: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 3
    },
    button: {
        width: '100%',
        borderRadius: 30,
        marginTop: 10
    },
    gradientButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16
    },
    signupText: {
        marginTop: 20,
        color: '#333',
        textAlign: 'center'
    },
    signupLink: {
        color: '#ff6b6b',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default SignupForm;
