import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TelaCadastrar() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que você deseja cadastrar?</Text>
      
      <Link href="/nova-propriedade" asChild>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="map-marked-alt" size={24} color="white" />
          <Text style={styles.buttonText}>Nova Propriedade</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/nova-safra" asChild>
        <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
          <FontAwesome5 name="seedling" size={24} color="#2e7d32" />
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Nova Safra</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2e7d32',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonTextSecondary: {
    color: '#2e7d32',
  },
});