import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function PerguntarIA() {
  const [pergunta, setPergunta] = useState('');
  const [respostaIA, setRespostaIA] = useState('');
  const [carregando, setCarregando] = useState(false);

  const perguntarIA = async () => {
  if (!pergunta.trim()) {
    alert('Digite uma pergunta antes de enviar');
    return;
  }

  setCarregando(true);
  setRespostaIA('');

  try {
    const response = await fetch('http://192.168.18.73:3000/perguntar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pergunta }),
    });

    if (!response.ok) {
      const erroTexto = await response.text();
      throw new Error(`Erro do servidor: ${response.status} - ${erroTexto}`);
    }

    const data = await response.json();
    setRespostaIA(data.resposta);
  } catch (error) {
    let mensagemErro = 'Erro ao consultar IA';

    if (error instanceof TypeError && error.message.includes('Network request failed')) {
      mensagemErro = 'Não foi possível conectar ao servidor. Verifique se ele está ligado e se o IP está correto.';
    } else if (error.message) {
      mensagemErro = error.message;
    }

    alert(mensagemErro);
    console.error('Erro completo:', error);
  } finally {
    setCarregando(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.iaTitle}>Pergunte algo à IA:</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ex: Qual o melhor treino para emagrecer?"
        placeholderTextColor="#888"
        value={pergunta}
        onChangeText={setPergunta}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={perguntarIA}
        disabled={carregando}
      >
        <Text style={styles.buttonText}>
          {carregando ? 'Consultando...' : 'Perguntar à IA'}
        </Text>
      </TouchableOpacity>

      {respostaIA ? (
        <View style={styles.respostaContainer}>
          <Text style={styles.iaTitle}>Resposta da IA:</Text>
          <Text style={styles.respostaTexto}>{respostaIA}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flex: 1,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    marginBottom: 15,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
  respostaContainer: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
  },
  iaTitle: {
    color: '#1DB954',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  respostaTexto: {
    color: '#ccc',
    fontSize: 15,
  },
});
