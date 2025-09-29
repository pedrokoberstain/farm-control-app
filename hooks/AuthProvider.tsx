import { useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../firebaseConfig';

// 1. Criamos o tipo para o nosso contexto
type AuthContextData = {
  user: User | null;
  loading: boolean;
  signOut: () => void;
};

// 2. Criamos o Contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// 3. Criamos o Hook customizado 'useAuth' para facilitar o uso
export const useAuth = () => {
  return useContext(AuthContext);
};

// 4. Criamos o Provedor (o componente que vai envolver nosso app)
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // "Ouvinte" do Firebase que verifica o estado do usuário em tempo real
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Marca o carregamento como concluído
    });
    // Limpa o "ouvinte" quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return; // Não faz nada enquanto o Firebase ainda está verificando

    const inAuthGroup = segments[0] === '(auth)';

    if (user && inAuthGroup) {
      // Se o usuário está logado e na tela de login, vai para o app
      router.replace('/(app)');
    } else if (!user && !inAuthGroup) {
      // Se o usuário não está logado e NÃO está no fluxo de auth, vai para o login
      router.replace('/(auth)/login');
    }
  }, [user, loading, segments, router]);

  return (
    <AuthContext.Provider value={{ user, signOut: () => auth.signOut(), loading }}>
      {children}
    </AuthContext.Provider>
  );
};