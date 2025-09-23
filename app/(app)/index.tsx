import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DADOS_PROPRIEDADES = [
  { id: '1', nome: 'Fazenda Santa Maria', local: 'Dourados, MS', hectares: 350 },
  { id: '2', nome: 'Sítio Boa Esperança', local: 'Rio Brilhante, MS', hectares: 120 },
  { id: '3', nome: 'Fazenda Alvorada', local: 'Maracaju, MS', hectares: 800 },
];

// Definindo os tipos das propriedades para o TypeScript
type ItemProps = {
  id: string;
  nome: string;
  local: string;
  hectares: number;
};

// Componente reescrito de forma mais explícita
function ItemPropriedade({ id, nome, local, hectares }: ItemProps) {
  return (
    <Link href={`/(app)/fazenda/${id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardIcon}>
          <FontAwesome5 name="map-marked-alt" size={32} color="#2e7d32" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{nome}</Text>
          <Text style={styles.cardSubtitle}>{local}</Text>
        </View>
        <View style={styles.cardHectares}>
          <Text style={styles.hectaresText}>{hectares}</Text>
          <Text style={styles.hectaresLabel}>ha</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function TelaInicial() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={DADOS_PROPRIEDADES}
        renderItem={({ item }) => <ItemPropriedade {...item} />} // Passando todas as props do item de uma vez
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma propriedade cadastrada.</Text>}
      />
    </View>
  );
}

// Estilos continuam os mesmos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 20, marginVertical: 8, borderRadius: 12, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardIcon: { marginRight: 15 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 2 },
  cardHectares: { alignItems: 'center' },
  hectaresText: { fontSize: 20, fontWeight: 'bold', color: '#2e7d32' },
  hectaresLabel: { fontSize: 12, color: '#666' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
});
