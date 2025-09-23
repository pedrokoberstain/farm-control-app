import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { useAuth } from '../../app/_layout';

export default function AuthLayout() {
  const { user } = useAuth();
  console.log("Verificando porteiro do (auth)... Usuário:", user);

  if (user) {
    console.log("Porteiro (auth): Usuário logado! Redirecionando para /app...");
    return <Redirect href="/(app)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}