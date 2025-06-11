import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddWorkoutScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [notes, setNotes] = useState('');

  const saveWorkout = async () => {
    if (!name || !sets || !reps) {
      Alert.alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const newWorkout = {
      id: Date.now().toString(),
      name,
      sets,
      reps,
      notes,
      date: new Date().toLocaleDateString(),
    };

    try {
      const stored = await AsyncStorage.getItem('workouts');
      const workouts = stored ? JSON.parse(stored) : [];

      const updatedWorkouts = [...workouts, newWorkout];
      await AsyncStorage.setItem('workouts', JSON.stringify(updatedWorkouts));

      Alert.alert('✅ Treino salvo com sucesso!');

      // Limpar campos:
      setName('');
      setSets('');
      setReps('');
      setNotes('');
      
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao salvar treino');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Treino</Text>

      <TextInput
        placeholder="Nome do exercício"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Séries"
        style={styles.input}
        keyboardType="numeric"
        value={sets}
        onChangeText={setSets}
      />
      <TextInput
        placeholder="Repetições"
        style={styles.input}
        keyboardType="numeric"
        value={reps}
        onChangeText={setReps}
      />
      <TextInput
        placeholder="Observações (opcional)"
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.button} onPress={saveWorkout}>
        <Text style={styles.buttonText}>Salvar Treino</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddWorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
