import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- DADOS DE EXEMPLO ---
const DADOS_RELATORIO = {
  'Soja': {
    '2025': { produtor: 65, regional: 61, top10: 72 },
    '2024': { produtor: 62, regional: 60, top10: 70 },
    '2023': { produtor: 58, regional: 59, top10: 68 },
  },
  'Milho': {
    '2025': { produtor: 180, regional: 172, top10: 195 },
    '2024': { produtor: 175, regional: 170, top10: 190 },
    '2023': { produtor: 182, regional: 175, top10: 198 },
  }
};

type Cultura = 'Soja' | 'Milho';
type Safra = '2025' | '2024' | '2023';

type SimpleBarChartProps = {
  data: {
    label: string;
    value: number;
  }[];
  selectedSafra: Safra;
};

const SimpleBarChart = ({ data, selectedSafra }: SimpleBarChartProps) => {
  const maxValue = Math.max(...data.map(item => item.value)) * 1.2;

  return (
    <View style={styles.chartContainer}>
      {data.map((item) => (
        <View key={item.label} style={styles.barWrapper}>
          <View style={styles.barValueContainer}>
            <Text style={styles.barValueText}>{item.value}</Text>
          </View>
          <View style={[styles.bar, { height: (item.value / maxValue) * 150 }, item.label === selectedSafra && styles.barSelected]} />
          <Text style={styles.barLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};


export default function TelaRelatorios() {
  const [cultura, setCultura] = useState<Cultura>('Soja');
  const [safra, setSafra] = useState<Safra>('2025');

  const dadosAtuais = DADOS_RELATORIO[cultura][safra];
  const historicoProdutor = Object.keys(DADOS_RELATORIO[cultura]).map((ano) => ({
    label: ano,
    value: DADOS_RELATORIO[cultura][ano as Safra].produtor,
  })).reverse();

  const diferenca = dadosAtuais.produtor - dadosAtuais.regional;

  return (
    <ScrollView style={styles.container}>
      {/* Filtros */}
      <View style={styles.filterContainer}>
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Cultura:</Text>
          <TouchableOpacity onPress={() => setCultura('Soja')} style={[styles.filterButton, cultura === 'Soja' && styles.filterButtonActive]}>
            <Text style={[styles.filterText, cultura === 'Soja' && styles.filterTextActive]}>Soja</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCultura('Milho')} style={[styles.filterButton, cultura === 'Milho' && styles.filterButtonActive]}>
            <Text style={[styles.filterText, cultura === 'Milho' && styles.filterTextActive]}>Milho</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card de Comparativo Principal */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Comparativo de Produtividade (sc/ha)</Text>
        <Text style={styles.cardSubtitle}>Safra {safra}</Text>
        <View style={styles.metricsContainer}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Sua Média</Text>
            <Text style={[styles.metricValue, { color: '#2e7d32' }]}>{dadosAtuais.produtor}</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Média Regional</Text>
            <Text style={styles.metricValue}>{dadosAtuais.regional}</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Top 10%</Text>
            <Text style={styles.metricValue}>{dadosAtuais.top10}</Text>
          </View>
        </View>
        <View style={[styles.insightBox, diferenca >= 0 ? styles.insightBoxGood : styles.insightBoxBad]}>
          <Text style={styles.insightText}>
            Você está <Text style={{ fontWeight: 'bold' }}>{Math.abs(diferenca)} sc/ha</Text> {diferenca >= 0 ? 'acima' : 'abaixo'} da média da região.
          </Text>
        </View>
      </View>

      {/* Card de Histórico */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Histórico de Produtividade - {cultura}</Text>
        <SimpleBarChart data={historicoProdutor} selectedSafra={safra} />
      </View>
    </ScrollView>
  );
}

// O resto do código (styles) continua o mesmo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 5
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  filterButtonActive: {
    backgroundColor: '#2e7d32',
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  filterTextActive: {
    color: 'white',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
  },
  metricValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  insightBox: {
    borderRadius: 8,
    padding: 12,
  },
  insightBoxGood: {
    backgroundColor: '#e8f5e9',
  },
  insightBoxBad: {
    backgroundColor: '#ffebee',
  },
  insightText: {
    fontSize: 14,
    color: '#333',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 180,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  barValueContainer: {
    position: 'absolute',
    top: -20
  },
  barValueText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333'
  },
  bar: {
    width: '50%',
    backgroundColor: '#a5d6a7',
  },
  barSelected: {
    backgroundColor: '#2e7d32',
  },
  barLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
});