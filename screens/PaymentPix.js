import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, Linking } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function PaymentPix() {
  const chavePix = '11913695791'; // 🔑 Sua chave Pix
  const valor = 'R$ 100,00'; // 💰 Valor da mensalidade
  const descricao = 'Mensalidade';

  const handleCopyPix = () => {
    Clipboard.setStringAsync(chavePix);
    Alert.alert('PIX Copiado!', 'Chave PIX copiada com sucesso!');
  };

  const handleWhatsApp = () => {
    const telefone = '5511913695791'; // 📞 Número da academia (com DDI +55 e DDD)
    const mensagem = `Olá! Enviei o comprovante do pagamento da mensalidade via Pix.`;
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pague sua Mensalidade</Text>
      <Text style={styles.subTitle}>Via Pix — Rápido e Sem Taxas</Text>

      <Image
        source={require('../assets/QrCode.png')}
        style={styles.qrCode}
      />

      <View style={styles.pixBox}>
        <Text style={styles.label}>Chave Pix:</Text>
        <Text style={styles.pixKey}>{chavePix}</Text>

        <Text style={styles.label}>Valor:</Text>
        <Text style={styles.value}>{valor}</Text>

        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>{descricao}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCopyPix}>
        <Text style={styles.buttonText}>📋 Copiar Chave Pix</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonWhats} onPress={handleWhatsApp}>
        <Text style={styles.buttonText}>💬 Enviar Comprovante WhatsApp</Text>
      </TouchableOpacity>

      <Text style={styles.instructions}>
        Após o pagamento, envie o comprovante para a recepção ou pelo WhatsApp.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  qrCode: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
  },
  pixBox: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  label: {
    color: '#888',
    fontSize: 14,
    marginTop: 10,
  },
  pixKey: {
    color: '#1DB954',
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonWhats: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructions: {
    color: '#aaa',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
