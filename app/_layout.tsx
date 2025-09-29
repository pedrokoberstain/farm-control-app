import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from '../hooks/AuthProvider';

export default function RootLayout() {
  return (
    // O SafeAreaProvider envolve todo o app
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Dizemos ao Stack para gerenciar os grupos de rotas */}
          <Stack.Screen name="(app)" />
          <Stack.Screen name="(auth)" />
          
          {/* E os modais */}
          <Stack.Screen name="nova-propriedade" options={{ presentation: 'modal', title: 'Nova Propriedade' }} />
          <Stack.Screen name="nova-safra" options={{ presentation: 'modal', title: 'Nova Safra' }} />
          <Stack.Screen name="editar-perfil" options={{ presentation: 'modal', title: 'Editar Perfil' }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}