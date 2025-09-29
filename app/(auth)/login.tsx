import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { auth } from '../../firebaseConfig';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import GoogleIcon from '../../components/googleIcon';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '227069535731-257demkd2ffjm50hbv1lnbdi85nan9od.apps.googleusercontent.com',
    iosClientId: '227069535731-fm1sc6o505u20ns5is6kqs455u9umfac.apps.googleusercontent.com',
    androidClientId: '227069535731-8lrlht42hi62aiu1p3vo51e54j096vcf.apps.googleusercontent.com',
    webClientId: '227069535731-257demkd2ffjm50hbv1lnbdi85nan9od.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          // O AuthProvider já vai detectar a mudança do estado do usuário
          // e redirecionar automaticamente
        })
        .catch((error) => {
          Alert.alert('Erro', 'Falha na autenticação com Google');
        });
    } else if (response?.type === 'error') {
      Alert.alert('Erro no Login', 'Não foi possível autenticar com o Google.');
    }
  }, [response]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // O AuthProvider já vai detectar a mudança do estado do usuário
      // e redirecionar automaticamente
    } catch (error: any) {
      Alert.alert('Erro', 'Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = () => {
    promptAsync();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.divider} />
        </View>
        
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          <GoogleIcon width={20} height={20} />
          <Text style={styles.socialButtonText}>Continuar com Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.link} onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Seus estilos (styles) continuam os mesmos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  logo: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },
  input: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
  button: { width: '100%', height: 50, backgroundColor: '#2e7d32', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', marginVertical: 24 },
  divider: { flex: 1, height: 1, backgroundColor: '#ccc' },
  dividerText: { marginHorizontal: 16, color: '#888', fontWeight: 'bold' },
  socialButton: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 12, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderColor: '#ddd' },
  socialButtonText: { color: '#333', fontSize: 16, fontWeight: '600', marginLeft: 12 },
  link: { marginTop: 24 },
  linkText: { color: '#2e7d32', fontSize: 16 },
});