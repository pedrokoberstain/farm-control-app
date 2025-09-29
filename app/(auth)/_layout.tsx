import { Slot } from 'expo-router';
import React from 'react';

// Este layout simplificado apenas renderiza a tela filha (login ou register)
// diretamente dentro do navegador Stack principal, sem criar um novo Stack.
export default function AuthLayout() {
  return <Slot />;
}