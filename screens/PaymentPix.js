import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function PaymentPix() {
  const handleCopyPix = () => {
    Alert.alert('PIX Copiado', 'Chave PIX copiada com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento via PIX</Text>

      <View style={styles.pixBox}>
        <Text style={styles.pixKey}>academia@pagamento.com</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCopyPix}>
        <Text style={styles.buttonText}>Copiar Chave PIX</Text>
      </TouchableOpacity>

      <Text style={styles.instructions}>
        Após o pagamento, envie o comprovante para (11) 99999-9999.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  title: { fontSize: 22, color: '#fff', marginBottom: 20 },
  pixBox: { backgroundColor: '#222', padding: 15, borderRadius: 10, marginBottom: 20 },
  pixKey: { color: '#1DB954', fontSize: 16 },
  button: { backgroundColor: '#1DB954', padding: 15, borderRadius: 10, width: '80%' },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  instructions: { color: '#aaa', marginTop: 20, textAlign: 'center', paddingHorizontal: 20 },
});
