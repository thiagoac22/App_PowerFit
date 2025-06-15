import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [user, setUser] = useState({
    name: 'Thiago Alves da Cruz',
    age: 33,
    weight: 70,
    height: 1.75,
    avatar: require('../assets/474075773_3148498045293217_7591452393564778811_n.jpg'),
    instagram: 'https://www.instagram.com/thiago.dev.js/',
  });

  // Atualiza o usuário quando voltar da tela de edição, se houver dados atualizados
  useFocusEffect(
    useCallback(() => {
      if (route.params?.updatedUser) {
        setUser(route.params.updatedUser);
        navigation.setParams({ updatedUser: undefined }); // Limpa para evitar loop
      }
    }, [route.params])
  );

  const handleEditProfile = () => {
    navigation.navigate('TelaEditProfileScreen', {
      user,
      onUpdateUser: (updatedUser) => {
        setUser(updatedUser);
      },
    });
  };
  const openInstagram = () => {
    Linking.openURL(user.instagram).catch(() =>
      alert('Não foi possível abrir o Instagram')
    );
  };

  const handleLogout = () => {
    alert('Sair do app');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Informações Pessoais</Text>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="calendar-account" size={22} color="#1DB954" />
          <Text style={styles.info}>Idade: {user.age} anos</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="weight-kilogram" size={22} color="#1DB954" />
          <Text style={styles.info}>Peso: {user.weight} kg</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="human-male-height" size={22} color="#1DB954" />
          <Text style={styles.info}>Altura: {user.height} m</Text>
        </View>

        <TouchableOpacity onPress={openInstagram} style={[styles.infoRow, { marginTop: 10 }]}>
          <FontAwesome name="instagram" size={20} color="#1DB954" />
          <Text style={styles.socialText}>@thiago.dev.js</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>✏️ Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Pagamento')}>
        <Text style={styles.buttonText}>🗓️ Planos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('PagarMensalidade')}>
        <Text style={styles.buttonText}>💰 Pagar Mensalidade</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={[styles.buttonText, { color: '#fff' }]}>🚪 Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#1DB954',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  info: {
    fontSize: 16,
    color: '#ccc',
  },
  socialText: {
    color: '#1DB954',
    marginLeft: 8,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#D72638',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
