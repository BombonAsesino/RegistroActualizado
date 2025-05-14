import { StyleSheet, View, FlatList, Alert, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ListarClientes({ navigation }) {
  const [clientes, setClientes] = useState([]);

  const eliminarCliente = (index) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Está seguro que desea eliminar este cliente?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: () => {
            const nuevosClientes = [...clientes];
            nuevosClientes.splice(index, 1);
            setClientes(nuevosClientes);
          }
        }
      ]
    );
  };

  const agregarNuevoCliente = (nuevoCliente) => {
    setClientes([nuevoCliente, ...clientes]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Lista de Clientes</Text>
        <TouchableOpacity 
          style={styles.botonAgregar}
          onPress={() => navigation.navigate('GuardarCliente', { agregarNuevoCliente })}
        >
          <Entypo name="add-user" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      
      {clientes.length === 0 ? (
        <Text style={styles.mensaje}>No hay clientes registrados</Text>
      ) : (
        <FlatList
          data={clientes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Text style={styles.label}>Cédula: <Text style={styles.valor}>{item.cedula}</Text></Text>
              <Text style={styles.label}>Nombres: <Text style={styles.valor}>{item.nombres}</Text></Text>
              <Text style={styles.label}>Apellidos: <Text style={styles.valor}>{item.apellidos}</Text></Text>
              <Text style={styles.label}>Fecha Nac.: <Text style={styles.valor}>{item.fechaN}</Text></Text>
              <Text style={styles.label}>Sexo: <Text style={styles.valor}>{item.sexo}</Text></Text>
              
              <TouchableOpacity 
                style={styles.botonEliminar}
                onPress={() => eliminarCliente(index)}
              >
                <MaterialIcons name="delete" size={24} color="#f44336" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  botonAgregar: {
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 20,
  },
  mensaje: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#C8E6C9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    position: 'relative',
  },
  label: {
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  valor: {
    fontWeight: 'normal',
    color: '#2E7D32',
  },
  botonEliminar: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 0,  
  },
})