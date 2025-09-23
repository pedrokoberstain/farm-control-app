import { FontAwesome5 } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- DADOS DE EXEMPLO ATUALIZADOS ---
// No futuro, isso virá do seu banco de dados (Firebase)
const DADOS_PROPRIEDADES = [
  { id: '1', nome: 'Fazenda Santa Maria', local: 'Dourados, MS', hectares: 350 },
  { id: '2', nome: 'Sítio Boa Esperança', local: 'Rio Brilhante, MS', hectares: 120 },
  { id: '3', nome: 'Fazenda Alvorada', local: 'Maracaju, MS', hectares: 800 },
];

const DADOS_PLANTIOS = {
  '1': {
    nomePlantio: 'Soja Safra Verão 24/25',
    dataPlantio: '2024-10-15',
    dataColheita: '2025-02-20',
    planoFertilizacao: 'NPK 10-20-20 na base + Cobertura de Potássio',
    quantidadeFertilizante: 250, // litros/ha
    descricao: 'Plantio realizado em ótimas condições de umidade do solo. A emergência foi uniforme em toda a área. Acompanhamento semanal de pragas e doenças.',
    images: ['https://placehold.co/400x300/a8e0b0/333?text=Soja', 'https://placehold.co/400x300/e0d8a8/333?text=Colheita', 'https://placehold.co/400x300/a8cde0/333?text=Trator']
  },
  '2': {
    nomePlantio: 'Milho Safrinha 2025',
    dataPlantio: '2025-02-25',
    dataColheita: '2025-07-15',
    planoFertilizacao: 'Adubação nitrogenada em cobertura',
    quantidadeFertilizante: 180, // litros/ha
    descricao: 'Plantio logo após a colheita da soja. Necessitou de irrigação suplementar durante a fase de pendoamento devido a veranico.',
    images: ['https://placehold.co/400x300/f0e68c/333?text=Milho', 'https://placehold.co/400x300/add8e6/333?text=Irriga%C3%A7%C3%A3o', 'https://placehold.co/400x300/f08080/333?text=Campo']
  },
  '3': {
    nomePlantio: 'Feijão de Inverno 2025',
    dataPlantio: '2025-05-10',
    dataColheita: '2025-08-05',
    planoFertilizacao: 'Fosfatagem e adubação orgânica pré-plantio',
    quantidadeFertilizante: 90, // litros/ha
    descricao: 'Cultivo irrigado por pivô central. Excelente controle de plantas daninhas, resultando em um estande limpo e produtivo.',
    images: ['https://placehold.co/400x300/90ee90/333?text=Feij%C3%A3o', 'https://placehold.co/400x300/b0c4de/333?text=Piv%C3%B4', 'https://placehold.co/400x300/9acd32/333?text=Vagem']
  }
};
// --- FIM DOS DADOS DE EXEMPLO ---

// Função para calcular a duração entre duas datas
function calcularDuracao(dataInicio: string, dataFim: string): string {
  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);
  if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
    return 'N/D';
  }
  const diffTime = Math.abs(fim.getTime() - inicio.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return `${diffDays} dias`;
}

export default function TelaDetalheFazenda() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const fazenda = DADOS_PROPRIEDADES.find(item => item.id === id);
  const plantio = DADOS_PLANTIOS[id];

  if (!fazenda || !plantio) {
    return <Text style={styles.notFound}>Detalhes da fazenda não encontrados!</Text>;
  }

  const duracao = calcularDuracao(plantio.dataPlantio, plantio.dataColheita);

  return (
    <>
      <Stack.Screen options={{ title: fazenda.nome, headerBackTitle: 'Voltar' }} />
      <ScrollView style={styles.container}>
        <FlatList
          data={plantio.images}
          renderItem={({ item }) => <Image source={{ uri: item }} style={styles.carouselImage} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.carousel}
          contentContainerStyle={{ paddingVertical: 10 }}
        />

        <View style={styles.content}>
          <Text style={styles.title}>{plantio.nomePlantio}</Text>
          <Text style={styles.subtitle}>Relatório de Campo da {fazenda.nome}</Text>

          <View style={styles.divider} />

          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Plantio</Text>
              <Text style={styles.gridValue}>{new Date(plantio.dataPlantio).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Colheita</Text>
              <Text style={styles.gridValue}>{new Date(plantio.dataColheita).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</Text>
            </View>
            <View style={styles.gridItemFull}>
              <Text style={styles.gridLabel}>Duração do Ciclo</Text>
              <Text style={styles.gridValue}>{duracao}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Plano de Fertilização</Text>
            <Text style={styles.detailText}>{plantio.planoFertilizacao}</Text>
            <Text style={styles.detailText}><Text style={{fontWeight: 'bold'}}>Quantidade:</Text> {plantio.quantidadeFertilizante} litros/ha</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Descrição do Manejo</Text>
            <Text style={styles.detailText}>{plantio.descricao}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.aboutButton}>
          <FontAwesome5 name="info-circle" size={18} color="#555" />
          <Text style={styles.aboutButtonText}>Sobre a {fazenda.nome}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notFound: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
  carousel: {
    backgroundColor: '#f5f5f5',
  },
  carouselImage: {
    width: screenWidth * 0.9,
    height: 220,
    marginHorizontal: screenWidth * 0.05,
    borderRadius: 12,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  gridItemFull: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  gridLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  gridValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  aboutButton: {
    marginHorizontal: 20,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    flexDirection: 'row',
  },
  aboutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginLeft: 10,
  },
});
