import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Unidade = 'Litros' | 'Kg';
type DatePickerTarget = 'plantio' | 'colheita';

export default function ModalNovaSafra() {
  const navigation = useNavigation();
  
  // Estados do formulário
  const [nomePlantio, setNomePlantio] = useState('');
  const [dataPlantio, setDataPlantio] = useState<Date | null>(null);
  const [dataColheita, setDataColheita] = useState<Date | null>(null);
  const [planoFertilizacao, setPlanoFertilizacao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState<Unidade>('Litros');
  const [descricao, setDescricao] = useState('');

  // Estados para controlar o Date Picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerTarget, setDatePickerTarget] = useState<DatePickerTarget>('plantio');

  const handleSalvar = () => {
    // Validação dos campos
    if (!nomePlantio || !dataPlantio || !dataColheita) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha o nome do plantio e as datas.');
      return;
    }

    const dadosDaSafra = {
      nomePlantio,
      dataPlantio: dataPlantio.toISOString(),
      dataColheita: dataColheita.toISOString(),
      planoFertilizacao,
      quantidade: `${quantidade} ${unidade}`,
      descricao,
    };
    
    // TODO: Chamar a API do Firebase para salvar os dados da safra
    console.log('Salvando Safra:', dadosDaSafra);
    Alert.alert('Sucesso!', 'Nova safra cadastrada e postada no feed.');
    navigation.goBack(); // Fecha o modal
  };

  // Funções para o Date Picker
  const openDatePicker = (target: DatePickerTarget) => {
    setDatePickerTarget(target);
    setShowDatePicker(true);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios'); // No iOS, o picker fica aberto
    if (selectedDate) {
      if (datePickerTarget === 'plantio') {
        setDataPlantio(selectedDate);
      } else {
        setDataColheita(selectedDate);
      }
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar style="light" />
      <Text style={styles.title}>Cadastrar Nova Safra</Text>

      {/* Seção Principal */}
      <Text style={styles.label}>Nome do Plantio</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Soja Safra Verão 24/25"
        value={nomePlantio}
        onChangeText={setNomePlantio}
      />

      {/* Seção Datas */}
      <Text style={styles.sectionTitle}>Datas</Text>
      <TouchableOpacity onPress={() => openDatePicker('plantio')}>
        <Text style={styles.label}>Data do Plantio</Text>
        <View style={styles.dateInput}>
          <Text style={dataPlantio ? styles.dateText : styles.datePlaceholder}>
            {dataPlantio ? dataPlantio.toLocaleDateString('pt-BR') : 'DD/MM/AAAA'}
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => openDatePicker('colheita')}>
        <Text style={styles.label}>Data da Colheita</Text>
        <View style={styles.dateInput}>
          <Text style={dataColheita ? styles.dateText : styles.datePlaceholder}>
            {dataColheita ? dataColheita.toLocaleDateString('pt-BR') : 'DD/MM/AAAA'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Seção Fertilização */}
      <Text style={styles.sectionTitle}>Fertilização</Text>
      <Text style={styles.label}>Plano de Fertilização</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Ex: NPK 10-20-20 na base..."
        value={planoFertilizacao}
        onChangeText={setPlanoFertilizacao}
        multiline
      />
      <Text style={styles.label}>Quantidade</Text>
      <View style={styles.quantityContainer}>
        <TextInput
          style={[styles.input, styles.quantityInput]}
          placeholder="Ex: 250"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />
        <View style={styles.unitSelector}>
          <TouchableOpacity onPress={() => setUnidade('Litros')} style={[styles.unitButton, unidade === 'Litros' && styles.unitButtonActive]}>
            <Text style={[styles.unitText, unidade === 'Litros' && styles.unitTextActive]}>Litros</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUnidade('Kg')} style={[styles.unitButton, unidade === 'Kg' && styles.unitButtonActive]}>
            <Text style={[styles.unitText, unidade === 'Kg' && styles.unitTextActive]}>Kg</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção Descrição */}
      <Text style={styles.sectionTitle}>Detalhes Adicionais</Text>
      <Text style={styles.label}>Descrição do Manejo</Text>
      <TextInput
        style={[styles.input, styles.multilineInput, { height: 120 }]}
        placeholder="Descreva aqui o manejo, condições climáticas, controle de pragas, etc."
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Publicar no Feed</Text>
      </TouchableOpacity>

      {/* Renderiza o Date Picker quando showDatePicker for true */}
      {showDatePicker && (
        <DateTimePicker
          value={datePickerTarget === 'plantio' ? dataPlantio || new Date() : dataColheita || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  dateInput: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  datePlaceholder: {
    color: '#aaa',
    fontSize: 16,
  },
  dateText: {
    color: '#333',
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    flex: 1,
    marginRight: 10,
  },
  unitSelector: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  unitButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  unitButtonActive: {
    backgroundColor: '#2e7d32',
  },
  unitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
  unitTextActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});