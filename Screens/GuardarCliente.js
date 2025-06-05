import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';

export default function GuardarCliente({ navigation, route }) {
  const { agregarNuevoCliente, clienteEditar } = route.params;


const [cliente, setCliente] = useState(
  route.params.clienteEditar || {
    cedula: '',
    nombres: '',
    apellidos: '',
    fechaN: '',
    sexo: ''
  }
);


  const validarCampos = () => {
    if (!cliente.cedula || !cliente.nombres || !cliente.apellidos) {
      Alert.alert('Error', 'Cédula, nombres y apellidos son obligatorios');
      return false;
    }
    return true;
  };

  const guardar = () => {
  if (!validarCampos()) return;
  
  if (route.params.clienteEditar) {
    // Modo edición - actualizar el cliente existente
    route.params.agregarNuevoCliente(cliente);
    Alert.alert('Cliente actualizado correctamente');
  } else {
    // Modo creación - agregar nuevo cliente
    route.params.agregarNuevoCliente(cliente);
    Alert.alert('Cliente guardado correctamente');
  }
  navigation.goBack();
};

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Datos del Cliente</Text>

      <Text style={styles.label}>Cédula:</Text>
      <TextInput
        style={styles.input}
        value={cliente.cedula}
        placeholder="Ej: 365-220904-1012A"
        onChangeText={(text) => setCliente({...cliente, cedula: text})}
        editable={!clienteEditar}
      />

      <Text style={styles.label}>Nombres:</Text>
      <TextInput
        style={styles.input}
        value={cliente.nombres}
        placeholder="Ej: Juan Carlos"
        onChangeText={(text) => setCliente({...cliente, nombres: text})}
      />

      <Text style={styles.label}>Apellidos:</Text>
      <TextInput
        style={styles.input}
        value={cliente.apellidos}
        placeholder="Ej: Perez Lopez"
        onChangeText={(text) => setCliente({...cliente, apellidos: text})}
      />

      <Text style={styles.label}>Fecha Nacimiento:</Text>
      <TextInput
        style={styles.input}
        value={cliente.fechaN}
        placeholder="DD/MM/AAAA"
        onChangeText={(text) => setCliente({...cliente, fechaN: text})}
      />

      <Text style={styles.label}>Sexo:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={cliente.sexo}
          onValueChange={(value) => setCliente({...cliente, sexo: value})}
        >
          <Picker.Item label="Seleccione..." value="" />
          <Picker.Item label="Femenino" value="Femenino" />
          <Picker.Item label="Masculino" value="Masculino" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.boton} onPress={guardar}>
        <Text style={styles.textoBoton}>Guardar Cliente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2E7D32',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#81C784',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#81C784',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  boton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});