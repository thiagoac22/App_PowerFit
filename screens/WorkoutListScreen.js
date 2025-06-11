import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const WorkoutListScreen = () => {
  const [workouts, setWorkouts] = useState([]);

  const loadWorkouts = async () => {
    try {
      const stored = await AsyncStorage.getItem('workouts');
      if (stored) {
        setWorkouts(JSON.parse(stored));
      } else {
        setWorkouts([]);
      }
    } catch (error) {
      console.error('Erro ao carregar treinos', error);
    }
  };

  const deleteWorkout = (id) => {
    Alert.alert(
      'Excluir treino',
      'Tem certeza que deseja excluir este treino?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const updated = workouts.filter((item) => item.id !== id);
              setWorkouts(updated);
              await AsyncStorage.setItem('workouts', JSON.stringify(updated));
            } catch (error) {
              console.error('Erro ao excluir treino', error);
            }
          },
        },
      ]
    );
  };

  // ✅ Recarrega os treinos sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>
        {item.sets} séries de {item.reps} repetições
      </Text>
      {item.notes ? <Text style={styles.notes}>📝 {item.notes}</Text> : null}
      <Text style={styles.date}>📅 {item.date}</Text>

      <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteWorkout(item.id)}>
        <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Treinos Cadastrados</Text>
      {workouts.length === 0 ? (
        <Text style={styles.empty}>Nenhum treino cadastrado ainda.</Text>
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default WorkoutListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  empty: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    color: '#aaa',
    marginTop: 5,
  },
  notes: {
    color: '#ccc',
    fontStyle: 'italic',
    marginTop: 5,
  },
  date: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
  deleteBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
    padding: 6,
    backgroundColor: '#ff4444',
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
  },
});
