import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function PaymentCard() {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    Alert.alert('Pagamento', 'Pagamento realizado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento com Cartão</Text>

      <TextInput placeholder="Nome no Cartão" style={styles.input} onChangeText={setName} value={name} placeholderTextColor="#aaa"/>
      <TextInput placeholder="Número do Cartão" style={styles.input} onChangeText={setCardNumber} value={cardNumber} keyboardType="numeric" placeholderTextColor="#aaa"/>
      <TextInput placeholder="Validade (MM/AA)" style={styles.input} onChangeText={setExpiry} value={expiry} placeholderTextColor="#aaa"/>
      <TextInput placeholder="CVV" style={styles.input} onChangeText={setCvv} value={cvv} keyboardType="numeric" secureTextEntry placeholderTextColor="#aaa"/>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  title: { fontSize: 22, color: '#fff', marginBottom: 30 },
  input: { backgroundColor: '#222', color: '#fff', width: '80%', padding: 10, borderRadius: 8, marginVertical: 5 },
  button: { backgroundColor: '#1DB954', padding: 15, borderRadius: 10, marginTop: 20, width: '80%' },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
});
