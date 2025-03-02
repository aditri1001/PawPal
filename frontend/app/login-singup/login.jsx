import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/AuthContext';

const LoginForm = ({ setIsLogin, setUserId }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setProfileDetail } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post('http://192.168.101.10:5000/login', { email, password });

      if (response.status === 200) {
        setUserId(response.data.user.id);

        setProfileDetail(prev => ({
          ...prev,
          name: response.data.user.fullName,
          email: response.data.user.email
        }));

        setShowVideo(true);
        setTimeout(() => {
          setIsLogin(prev => !prev);
        }, 1500);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Login Error:', error);
      alert(error.response?.data || 'Invalid credentials');
    }
  };

  return (
    <LinearGradient colors={['#F8E8EE', '#FBA518']} style={styles.gradientContainer}>
      {showVideo ? (
        <View style={styles.successContainer}>
          <LottieView
            source={{ uri: 'https://lottie.host/9e3396fb-4e45-4a4b-8382-917f02e87e6d/hYn9Ixlzqz.lottie' }}
            autoPlay
            loop
            style={styles.successAnimation}
          />
          <Text style={styles.successText}>Login Successful</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <LottieView
            source={{ uri: 'https://lottie.host/d46b80d0-8c14-49aa-a5f8-1c36d33f9edc/Vawy2DnMrY.lottie' }}
            autoPlay
            loop
            style={styles.logoAnimation}
          />
          <Text style={styles.title}>Welcome Back!</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
            <LinearGradient colors={['#FF7700', '#EB5B00']} style={styles.buttonGradient}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log in</Text>}
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
              Sign up
            </Text>
          </Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    paddingBottom: 40,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
  },
  inputContainer: {
    width: '85%',
    marginBottom: 20,
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
  title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 20
  },
  forgotPassword: {
    color: '#EB5B00',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  button: {
    width: '85%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  signupText: {
    marginTop: 20,
    color: '#707070',
    fontSize: 14,
  },
  signupLink: {
    color: '#EB5B00',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  successContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successAnimation: {
    width: 300,
    height: 300,
  },
  successText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
  },
  logoAnimation: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
});

export default LoginForm;
