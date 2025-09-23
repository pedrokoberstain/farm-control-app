import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 1. DEFINIMOS O TIPO EXATO DAS CULTURAS POSSÍVEIS
type Cultura = 'Soja' | 'Milho';

// Definimos o tipo para a estrutura dos dados de cada cultura
type DadosCultura = {
  produtor: number;
  regional: number;
};

export default function TelaRelatorios() {
  // 2. USAMOS O TIPO 'Cultura' AQUI NO ESTADO
  const [culturaSelecionada, setCulturaSelecionada] = useState<Cultura>('Soja');

  // 3. (OPCIONAL, MAS BOA PRÁTICA) USAMOS Record<Cultura, ...> PARA TIPAR O OBJETO
  const dadosRelatorio: Record<Cultura, DadosCultura> = {
    'Soja': {
      produtor: 65,
      regional: 61,
    },
    'Milho': {
      produtor: 180,
      regional: 172,
    }
  };

  // AGORA O ERRO DESAPARECE!
  // O TypeScript sabe que dadosRelatorio[culturaSelecionada] sempre será válido.
  const dadosAtuais = dadosRelatorio[culturaSelecionada];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comparativo de Produtividade</Text>
      <Text style={styles.subHeader}>Cultura: {culturaSelecionada} (Sacos/ha)</Text>
      
      <View style={styles.cardsContainer}>
        {/* Card Produtor */}
        <View style={styles.card}>
          <FontAwesome5 name="user-alt" size={30} color="#2e7d32" />
          <Text style={styles.cardTitle}>Sua Média</Text>
          <Text style={styles.cardValue}>{dadosAtuais.produtor}</Text>
        </View>

        {/* Card Regional */}
        <View style={styles.card}>
          <FontAwesome5 name="globe-americas" size={30} color="#f57c00" />
          <Text style={styles.cardTitle}>Média Regional</Text>
          <Text style={styles.cardValue}>{dadosAtuais.regional}</Text>
        </View>
      </View>
      
      <View style={styles.diferencaContainer}>
          <Text style={styles.diferencaTexto}>
              Sua produtividade está 
              <Text style={{fontWeight: 'bold', color: dadosAtuais.produtor > dadosAtuais.regional ? '#2e7d32' : '#d32f2f'}}>
                  {' '}{Math.abs(dadosAtuais.produtor - dadosAtuais.regional)} sc/ha
                  {dadosAtuais.produtor > dadosAtuais.regional ? ' acima ' : ' abaixo '}
              </Text>
              da média da sua região.
          </Text>
      </View>

      {/* Aqui entraria um seletor de cultura */}
    </View>
  );
}

// OS ESTILOS CONTINUAM OS MESMOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    marginTop: 5,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  cardValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  diferencaContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#2196f3',
  },
  diferencaTexto: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  }
});