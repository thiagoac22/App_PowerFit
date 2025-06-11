import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const stored = await AsyncStorage.getItem('workouts');
        if (stored) {
          setWorkouts(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Erro ao carregar treinos', error);
      }
    };
    loadWorkouts();
  }, []);

  const lastWorkout = workouts.length > 0 ? workouts[workouts.length - 1] : null;

  return (
    <ImageBackground
      source={require('../assets/layout-academia-musculacao.png')} // certifique-se de que a imagem está nessa pasta
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.gymName}>Academia PowerFit</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddWorkout')}
        >
          <Text style={styles.buttonText}>Cadastrar Novo Treino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('WorkoutList')}
        >
          <Text style={styles.buttonTextSecondary}>Ver Lista de Treinos</Text>
        </TouchableOpacity>

        <Text style={styles.motivationalText}>Vamos treinar hoje? 💪</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // fundo escuro translúcido
    padding: 20,
    justifyContent: 'center',
  },
  gymName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1DB954',
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonSecondary: {
    borderColor: '#1DB954',
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonTextSecondary: {
    color: '#1DB954',
    fontSize: 18,
  },
  motivationalText: {
    color: '#1DB954',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default HomeScreen;
