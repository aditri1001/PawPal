import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useAuth } from "../AuthContext";

function ModalModal({ isModalVisible, toggleModal, setShowVideo }) {
    const { setIsLogin } = useAuth();

    const handleVideo = () => {
        setShowVideo(true)
        setTimeout(() => {
            setShowVideo(false);
            setIsLogin(false)
        }, 1500);
    }

    return (
        <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
            <View style={styles.container}>
                <Text style={styles.title}>Are you sure you want to LOGOUT?</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton} onPress={() => {
                        handleVideo()
                    }}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default ModalModal;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        width: "85%",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // For Android shadow
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 15,
    },
    cancelButton: {
        backgroundColor: "#ccc",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
        alignItems: "center",
    },
    cancelText: {
        color: "#333",
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#D9534F",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
        flex: 1,
        marginLeft: 10,
        alignItems: "center",
    },
    logoutText: {
        color: "white",
        fontWeight: "bold",
    },
});
