import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import dingSound from '../assets/som.mp3';

export default function RestTimer({ duration = 15 }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsRunning(false);
      playSound();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(dingSound);
    await sound.playAsync();

    // Para automaticamente após 10 segundos
    setTimeout(async () => {
      await sound.stopAsync();      
    }, 10000); // 10.000 ms = 10 segundos
  }

  function startTimer() {
    setTimeLeft(duration);
    setIsRunning(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tempo de Descanso</Text>

      <View style={styles.timerCircle}>
        <Text style={styles.timerText}>{timeLeft}s</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isRunning && styles.buttonDisabled]}
        onPress={startTimer}
        disabled={isRunning}
      >
        <Text style={styles.buttonText}>
          {isRunning ? 'Contando...' : 'Iniciar Descanso'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  timerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#E8F5E9',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
