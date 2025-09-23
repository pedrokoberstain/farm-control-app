import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function ModalNovaSafra() {
  const navigation = useNavigation();
  const [cultura, setCultura] = useState('');
  const [variedade, setVariedade] = useState('');
  const [dataPlantio, setDataPlantio] = useState('');
  const [produtividade, setProdutividade] = useState('');

  const handleSalvar = () => {
    if (!cultura || !dataPlantio) {
      Alert.alert('Erro', 'Cultura e Data de Plantio são obrigatórios.');
      return;
    }
    // TODO: Chamar a API para salvar a safra
    console.log({ cultura, variedade, dataPlantio, produtividade });
    Alert.alert('Sucesso!', 'Safra cadastrada.');
    navigation.goBack(); // Fecha o modal
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Cadastrar Nova Safra</Text>

      <Text style={styles.label}>Cultura</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Soja"
        value={cultura}
        onChangeText={setCultura}
      />

      <Text style={styles.label}>Variedade da Semente</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: TMG 7062 IPRO"
        value={variedade}
        onChangeText={setVariedade}
      />

      <Text style={styles.label}>Data de Plantio</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={dataPlantio}
        onChangeText={setDataPlantio}
      />

      <Text style={styles.label}>Produtividade (sacos/ha)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 65"
        value={produtividade}
        onChangeText={setProdutividade}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar Safra</Text>
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

