import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function ModalEditarPerfil() {
  const navigation = useNavigation();

  // No futuro, estes dados viriam do seu usuário logado
  const [nome, setNome] = useState('Pedro Fazendeiro');
  const [cidade, setCidade] = useState('Dourados, MS');
  // 1. ADICIONAMOS O E-MAIL (GERALMENTE NÃO É EDITÁVEL)
  const email = 'pedro.fazendeiro@email.com';
  const cpf = '***.123.456-**';

  const handleSalvar = () => {
    if (!nome || !cidade) {
      Alert.alert('Erro', 'Nome e cidade não podem ficar em branco.');
      return;
    }
    // TODO: Chamar a API do Firebase para atualizar os dados
    console.log({ nome, cidade });
    Alert.alert('Sucesso!', 'Perfil atualizado.');
    navigation.goBack(); // Fecha o modal
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Editar Perfil</Text>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      {/* 2. ADICIONAMOS O CAMPO DE E-MAIL (NÃO EDITÁVEL) */}
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={[styles.input, styles.inputDisabled]}
        value={email}
        editable={false}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={setCidade}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={[styles.input, styles.inputDisabled]}
        value={cpf}
        editable={false}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  inputDisabled: {
    backgroundColor: '#e0e0e0',
    color: '#888',
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});