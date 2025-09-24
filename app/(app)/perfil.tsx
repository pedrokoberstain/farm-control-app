import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../app/_layout';

// Componente reutilizável para cada item da lista
const ProfileListItem = ({ icon, text, onPress, isDestructive = false }) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress}>
    <View style={styles.listItemIcon}>
      <MaterialCommunityIcons name={icon} size={24} color={isDestructive ? '#d32f2f' : '#2e7d32'} />
    </View>
    <Text style={[styles.listItemText, isDestructive && { color: '#d32f2f' }]}>{text}</Text>
    {!isDestructive && <FontAwesome5 name="chevron-right" size={16} color="#ccc" />}
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const { signOut } = useAuth();

  // Dados de exemplo do usuário
  const userData = {
    name: 'Pedro Fazendeiro',
    email: 'pedro.fazendeiro@email.com',
    city: 'Dourados, MS',
    cpf: '***.123.456-**' // Importante: Sempre mascare dados sensíveis
  };
  
  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta", "Tem certeza que deseja encerrar a sessão?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: signOut },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho com informações do usuário */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <FontAwesome5 name="user-alt" size={40} color="#fff" />
        </View>
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
        <Text style={styles.userLocation}>{userData.city} - CPF: {userData.cpf}</Text>
      </View>

      {/* Seção de Conta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>
        <ProfileListItem icon="account-edit-outline" text="Editar Perfil" onPress={() => Alert.alert('Funcionalidade Futura', 'Aqui abriria a tela para editar o perfil.')} />
        <ProfileListItem icon="lock-outline" text="Alterar Senha" onPress={() => Alert.alert('Funcionalidade Futura', 'Aqui abriria a tela para alterar a senha.')} />
      </View>
      
      {/* Seção de Configurações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>
        <ProfileListItem icon="bell-outline" text="Notificações" onPress={() => Alert.alert('Funcionalidade Futura', 'Tela de configurações de notificação.')} />
        <ProfileListItem icon="theme-light-dark" text="Aparência" onPress={() => Alert.alert('Funcionalidade Futura', 'Tela para trocar tema do app.')} />
      </View>

      {/* Seção de Logout */}
      <View style={styles.section}>
        <ProfileListItem icon="logout" text="Sair" onPress={handleLogout} isDestructive />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    backgroundColor: '#2e7d32',
    padding: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  userLocation: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
  },
  section: {
    marginTop: -20, 
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    padding: 16,
    backgroundColor: '#f9f9f9',
    textTransform: 'uppercase',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listItemIcon: {
    width: 40,
    alignItems: 'center',
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
});