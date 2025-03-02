import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function ModalContent({ setNewUserDetail, userId, handleUpdateProfile }) {
    const [userData, setUserData] = useState({
        userId: userId,
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleUpdate = () => {
        setNewUserDetail(userData)
        setTimeout(() => {
            handleUpdateProfile();
        }, 1000); 
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Profile</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    placeholder='Write your name ...'
                    style={styles.input}
                    value={userData.fullName}
                    onChangeText={(text) => setUserData({ ...userData, fullName: text })}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder='New email...'
                    style={styles.input}
                    value={userData.email}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder='New password...'
                    style={styles.input}
                    secureTextEntry={true}
                    value={userData.password}
                    onChangeText={(text) => setUserData({ ...userData, password: text })}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    placeholder='Confirm password...'
                    style={styles.input}
                    secureTextEntry={true}
                    value={userData.confirmPassword}
                    onChangeText={(text) => setUserData({ ...userData, confirmPassword: text })}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 26,
        marginTop: -70,
        marginBottom: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 0,
        margin: 0,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15
    },
    label: {
        color: '#58bc82',
        fontWeight: '600',
        marginBottom: 5
    },
    input: {
        backgroundColor: '#9c9c9c60',
        padding: 12,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#707070'
    },
    button: {
        marginTop: 20,
        backgroundColor: '#3C3D37',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignItems: 'center',
        width: '100%'
    },
    buttonText: {
        color: '#efefef',
        fontWeight: '600',
        fontSize: 16
    },
    signupText: {
        marginTop: 20,
        color: '#707070'
    },
    signupLink: {
        color: '#58bc82',
        fontWeight: 'bold'
    },
});