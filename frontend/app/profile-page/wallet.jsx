import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ToastAndroid, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useAuth } from '../../AuthContext';
import LottieView from 'lottie-react-native';

export default function Wallet() {
  const { amount, setAmount, history, setHistory } = useAuth();
  const [writingAmount, setWritingAmount] = useState('');
  const [isCredit, setIsCredit] = useState('Credited');
  const navigation = useNavigation();

  const handleAddAmount = () => {
    if (!writingAmount) return;

    const numericAmount = parseInt(writingAmount);
    if (isNaN(numericAmount) || numericAmount === 0) return;

    const newAmount = (parseInt(amount) + numericAmount).toString();

    const transactionType = numericAmount > 0 ? 'Credited' : 'Debited';
    const transactionColor = numericAmount > 0 ? '#5CB338' : '#E52020';

    setAmount(newAmount);
    setHistory([...history, {
      amount: Math.abs(numericAmount),
      isCredit: transactionType,
      color: transactionColor,
      date: `${transactionType === "Credited" ? 'added' : 'withdraw'}    ~ ${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
    }]);

    setWritingAmount('');
    ToastAndroid.show(`${transactionType} $${Math.abs(numericAmount)} Successfully!`, ToastAndroid.SHORT);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'profile' }] })} style={styles.backButton}>
        <Ionicons name="arrow-back" size={26} color="#45474B" />
        <Text style={styles.backText}>Profile</Text>
      </TouchableOpacity>

      <View style={styles.walletContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.walletLabel}>Wallet Balance</Text>
          <LottieView
            source={{ uri: 'https://lottie.host/9d6ee52d-24a3-4e88-a702-f540f56be112/ujVHTy7epq.lottie' }}
            autoPlay
            loop
            style={{ width: 40, height: 40, marginTop: -12 , marginLeft: 10}}
          />
        </View>
        <Text style={styles.walletAmount}>${amount || '0'}</Text>

        <Text style={styles.historyHeaderText}>HISTORY</Text>
        <ScrollView style={{ height: 350 }}>
          {history.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyContainerText}>Empty Transaction Log!</Text>
            </View>
          ) : (
            history.map((item, index) => (
              <View key={index} style={styles.rewardContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.rewardAmount, { color: item.color }]}>
                    {item.isCredit} ${item.amount}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={[styles.historyButton, { color: item.color }]}>
                    {item.date}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>

        <TextInput
          placeholder='Enter Amount (Max. ₹125000)'
          style={styles.input}
          keyboardType='numeric'
          value={writingAmount}
          onChangeText={setWritingAmount}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddAmount}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>

        <View style={styles.quickAmountContainer}>
          {[100, 200, 500, 1000].map((amt) => (
            <TouchableOpacity key={amt} style={styles.quickAmountButton} onPress={() => { setWritingAmount(amt.toString()); setIsCredit('Credited ') }}>
              <Text style={styles.quickAmountText}>${amt}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ width: 150, fontSize: 18, marginTop: 10, fontWeight: '500' }}>Withdraw Amount :</Text>
          <View style={styles.quickAmountContainer}>
            {[-100, -200].map((amt) => (
              <TouchableOpacity
                key={amt}
                style={{ backgroundColor: '#FFB4A2', padding: 10, borderRadius: 8, marginHorizontal: 10 }}
                onPress={() => {
                  setWritingAmount(amt.toString());
                  setIsCredit('Debited');
                }}
              >
                <Text style={[styles.quickAmountText, { color: '#E52020' }]}>${amt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  backText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  emptyContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainerText: {
    fontSize: 30, opacity: 0.3
  },
  walletContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  walletLabel: {
    fontSize: 20,
    color: 'gray',
  },
  walletAmount: {
    fontSize: 34,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 10
  },
  rewardContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    padding: 10,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rewardAmount: {
    fontSize: 16,
  },
  historyButton: {
    fontWeight: 'bold'
  },
  historyHeaderText: {
    fontSize: 20,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 8,
    height: 50
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  quickAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  quickAmountButton: {
    backgroundColor: '#D3E671',
    padding: 10,
    borderRadius: 8,
  },
  quickAmountText: {
    fontWeight: 'bold'
  },
});