import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useAuth } from '../../app/_layout';

export default function TabLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2e7d32',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        headerStyle: { backgroundColor: '#f5f5f5' },
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          headerTitle: 'Minhas Propriedades',
          tabBarIcon: ({ color }) => <FontAwesome5 size={26} name="tractor" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cadastrar"
        options={{
          title: 'Cadastrar',
          headerTitle: 'Novo Cadastro',
          tabBarIcon: ({ color }) => <FontAwesome5 size={26} name="plus-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="relatorios"
        options={{
          title: 'Relatórios',
          headerTitle: 'Relatório de Produtividade',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="chart-bar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          headerTitle: 'Meu Perfil',
          tabBarIcon: ({ color }) => <FontAwesome5 size={26} name="user-circle" color={color} />,
        }}
      />
      
      {}
      <Tabs.Screen
        name="fazenda/[id]"
        options={{
          href: null,
        }}
      />
      {}
      {}
      <Tabs.Screen
        name="editar-perfil"
        options={{
          href: null,
          headerShown: false,
          title: 'Editar Perfil',
        }}
      />
    </Tabs>
  );
}