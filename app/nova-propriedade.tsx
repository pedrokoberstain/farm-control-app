import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function ModalNovaPropriedade() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [solo, setSolo] = useState('');
  const [altitude, setAltitude] = useState('');

  const handleSalvar = () => {
    if (!nome || !local) {
      Alert.alert('Erro', 'Nome da fazenda e localização são obrigatórios.');
      return;
    }
    // TODO: Chamar a API para salvar os dados
    console.log({ nome, local, solo, altitude });
    Alert.alert('Sucesso!', 'Propriedade cadastrada.');
    navigation.goBack(); // Fecha o modal
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Cadastrar Propriedade</Text>

      <Text style={styles.label}>Nome da Fazenda</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Fazenda Santa Maria"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Localização (Cidade/Município)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Dourados, MS"
        value={local}
        onChangeText={setLocal}
      />

      <Text style={styles.label}>Tipo de Solo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Argiloso"
        value={solo}
        onChangeText={setSolo}
      />

      <Text style={styles.label}>Altitude (metros)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 430"
        value={altitude}
        onChangeText={setAltitude}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar Propriedade</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
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

