import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const TelaEditProfileScreen = () => {
  const navigation = useNavigation(); // movido para o topo corretamente
  const route = useRoute();

  const { user } = route.params;

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(String(user.age));
  const [weight, setWeight] = useState(String(user.weight));
  const [height, setHeight] = useState(String(user.height));
  const [instagram, setInstagram] = useState(user.instagram || '');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'O nome não pode ficar vazio.');
      return;
    }

    const updatedUser = {
      ...user,
      name,
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      instagram,
    };

    // Chama callback para atualizar no ProfileScreen
    if (route.params.onUpdateUser) {
      route.params.onUpdateUser(updatedUser);
    }

    Alert.alert('Sucesso', 'Dados salvos com sucesso!', [
      {
         text: 'OK',
      onPress: () => navigation.goBack(),
    },
  ]);
};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Editar Perfil</Text>

      <Text style={styles.inputLabel}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome"
        placeholderTextColor="#999"
      />

      <Text style={styles.inputLabel}>Idade:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        placeholder="Idade"
        placeholderTextColor="#999"
      />

      <Text style={styles.inputLabel}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        placeholder="Peso"
        placeholderTextColor="#999"
      />

      <Text style={styles.inputLabel}>Altura (m):</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        placeholder="Altura"
        placeholderTextColor="#999"
      />

      <Text style={styles.inputLabel}>Instagram:</Text>
      <TextInput
        style={styles.input}
        value={instagram}
        onChangeText={setInstagram}
        placeholder="@usuario"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>💾 Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TelaEditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    padding: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1A1A1A',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
