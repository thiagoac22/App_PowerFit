import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function MonthlyPayment({ navigation }) {
  return (
    <View style={styles.container}>

      {/* 🔙 Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Tabs', { screen:'Home'})}>
        <AntDesign name="arrowleft" size={28} color="#fff" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Escolha a forma de pagamento</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('PaymentCard')}
      >
        <Text style={styles.buttonText}>Cartão de Crédito</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('PaymentPix')}
      >
        <Text style={styles.buttonText}>PIX</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#121212', 
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 6,
  },
  title: { 
    fontSize: 24, 
    color: '#1DB954', 
    marginBottom: 40, 
    fontWeight: 'bold', 
    textAlign: 'center',
  },
  button: { 
    backgroundColor: '#1DB954', 
    padding: 15, 
    borderRadius: 10, 
    marginVertical: 10, 
    width: '80%',
  },
  buttonText: { 
    color: '#121212', 
    fontSize: 18, 
    textAlign: 'center', 
    fontWeight: 'bold',
  },
});
