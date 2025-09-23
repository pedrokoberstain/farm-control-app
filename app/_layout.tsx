import { Stack } from "expo-router";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<null | {
  user: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
}>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default function RootLayout() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn: (token) => {
          console.log("✔️ Usuário autenticado!");
          setUser(token);
        },
        signOut: () => {
          console.log("❌ Usuário deslogado!");
          setUser(null);
        },
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="nova-propriedade" options={{ presentation: 'modal', title: 'Nova Propriedade' }} />
        <Stack.Screen name="nova-safra" options={{ presentation: 'modal', title: 'Nova Safra' }} />
      </Stack>
    </AuthContext.Provider>
  );
}