import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Modal } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import ModalContent from '../components/ModalContent'
import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from "../AuthContext";
import LogoutModal from '../components/LogoutModal';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function ProfileScreen() {
  const route = useRoute();
  const { userId } = route.params;
  const [showVideo, setShowVideo] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [newUserDetail, setNewUserDetail] = useState()
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const windowHeight = Dimensions.get('window').height;

  const { profileDetail } = useAuth();

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };


  const handleUpdateProfile = async () => {
    setIsLoading(true);
    if (!newUserDetail) {
      alert("No new user details provided!");
      return;
    }

    const { userId, email, fullName, password, confirmPassword } = newUserDetail;

    try {
      const response = await axios.post('http://192.168.125.232:5000/update-profile', {
        userId,
        email,
        fullName,
        password,
        confirmPassword
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
        // console.log(response.data.user);  // Updated user details
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile.');
    }
    setIsLoading(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
      <SafeAreaView style={styles.container}>
        {showVideo ? (
          <View style={styles.successContainer}>
            <LottieView
              source={{ uri: 'https://lottie.host/9e3396fb-4e45-4a4b-8382-917f02e87e6d/hYn9Ixlzqz.lottie' }}
              autoPlay
              loop
              style={styles.successAnimation}
            />
            <Text style={styles.successText}>Logged out successfully!</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.greeting}>Hey !</Text>
            <Text style={styles.name}>{profileDetail.name}</Text>
            <Text style={styles.email}>Logged in via {profileDetail.email}</Text>

            <TouchableOpacity style={styles.menuItem} onPress={handleOpenBottomSheet}>
              <MaterialIcons name="list-alt" size={24} color="#45474B" />
              <Text style={styles.menuText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'profile-page/wallet' }],
              })}
            >
              <FontAwesome5 name="wallet" size={24} color="#45474B" />
              <Text style={styles.menuText}>Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('dogs')}>
              <Ionicons name="paw-outline" size={24} color="#45474B" />
              <Text style={styles.menuText}>Dog Breeds</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('cats')}>
              <Ionicons name="paw" size={24} color="#45474B" />
              <Text style={styles.menuText}>Cat Breeds</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('profile-page/cart')}>
              <Ionicons name="cart" size={24} color="#45474B" />
              <Text style={styles.menuText}>Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('home-pages/adoption-form')}>
              <Ionicons name="cart-outline" size={24} color="#45474B" />
              <Text style={styles.menuText}>Pet Adoption</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("profile-page/about-me")}>
              <Ionicons name="person-outline" size={24} color="#45474B" />
              <Text style={styles.menuText}>About Me</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.exploreButton} onPress={toggleModal}>
              <Text style={styles.exploreText}>LOG OUT</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isBottomSheetOpen}
              onRequestClose={handleCloseBottomSheet} >

              <View style={[styles.bottomSheet, { height: windowHeight * 0.61 }]}>
                <View style={{ flex: 0, width: '100%', justifyContent: 'flex-end', flexDirection: 'row', margin: 0, padding: 0 }}>
                  <TouchableOpacity onPress={handleCloseBottomSheet} style={{ margin: 0, padding: 0 }}>
                    <Text style={{ width: 60, height: 40, backgroundColor: 'azure', borderRadius: 10, textAlign: 'center', paddingTop: 10 }}> Close</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ width: '100%', height: '100%' }}>
                  <ModalContent newUserDetail={newUserDetail} setNewUserDetail={setNewUserDetail} userId={userId} handleUpdateProfile={handleUpdateProfile} />
                </View>
              </View>
            </Modal>
            <View style={{ justifyContent: 'center', alignItems: "center" }}>
              <LogoutModal isModalVisible={isModalVisible} toggleModal={toggleModal} setShowVideo={setShowVideo} />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 20,
    // backgroundColor: '#EEEDEB',
  },
  scrollView: {
    paddingTop: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A3335',
  },
  name: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 10,
    fontStyle: 'italic',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
  },
  exploreButton: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#9B4444',
    marginTop: 30,
    borderRadius: 10,
  },
  exploreText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    borderColor: 'white'
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
    color: '#000000',
  },
});
