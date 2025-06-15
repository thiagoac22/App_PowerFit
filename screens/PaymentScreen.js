import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

export default function MonthlyPayment({ navigation }) {
  const plans = [
    { id: 1, title: 'Plano Básico', price: 'R$ 49,90/mês', description: 'Acesso à academia durante o horário comercial.' },
    { id: 2, title: 'Plano Premium', price: 'R$ 79,90/mês', description: 'Acesso 24 horas e aulas inclusas.' },
    { id: 3, title: 'Plano VIP', price: 'R$ 129,90/mês', description: 'Acesso total + personal trainer.' },
  ];

  function handleSubscribe(plan) {
    Alert.alert('Plano selecionado', `Você escolheu o ${plan.title}`);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔙 Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Tabs', { screen: 'Home'})}>
        <AntDesign name="arrowleft" size={28} color="#fff" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Escolha seu Plano</Text>


      {plans.map(plan => (
        <View key={plan.id} style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text style={styles.planTitle}>{plan.title}</Text>
            <FontAwesome5 name="dumbbell" size={24} color="#1DB954" />
          </View>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <Text style={styles.planDescription}>{plan.description}</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleSubscribe(plan)}
          >
            <Text style={styles.buttonText}>Assinar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flexGrow: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  planCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  planPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
