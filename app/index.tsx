import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// Esta é a tela de entrada oficial do app.
// O AuthProvider já cuida do redirecionamento baseado no estado de autenticação
const StartPage = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2e7d32" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
});

export default StartPage;