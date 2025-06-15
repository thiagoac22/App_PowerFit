import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import AddWorkoutScreen from './screens/AddWorkoutScreen';
import WorkoutListScreen from './screens/WorkoutListScreen';
import RestTimerScreen from './screens/RestTimerScreen';
import ProfileScreen from './screens/ProfileScreen';
import RecommendationScreen from './screens/RecommendationScreen';
import TelaEditProfileScreen from './screens/TelaEditProfileScreen';
import PaymentScreen from './screens/PaymentScreen';
import MonthlyPayment from './screens/MonthlyPayment'; 
import PaymentPix from './screens/PaymentPix';
import PaymentCard from './screens/PaymentCard';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="RestTimer" component={RestTimerScreen} options={{ tabBarLabel: 'Cronômetro' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Perfil' }} />
      <Tab.Screen name="Recommendation" component={RecommendationScreen} options={{ tabBarLabel: 'Recomendações' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} options={{ title: 'Adicionar Treino' }} />
        <Stack.Screen name="WorkoutList" component={WorkoutListScreen} options={{ title: 'Lista de Treinos' }} />
        <Stack.Screen name="TelaEditProfileScreen" component={TelaEditProfileScreen} options={{ title: 'Editar Perfil' }} />
        <Stack.Screen name="Pagamento" component={PaymentScreen} options={{ title: 'Pagamento' }} />
        <Stack.Screen name="PagarMensalidade" component={MonthlyPayment} options={{ title: 'Pagar Mensalidade' }} />
        <Stack.Screen name="PaymentPix" component={PaymentPix} options={{ title: 'Pagamento PIX' }} />
        <Stack.Screen name="PaymentCard" component={PaymentCard} options={{ title: 'Pagamento Cartão' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
