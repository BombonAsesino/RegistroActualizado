import { StyleSheet, View, FlatList, Alert, TouchableOpacity, Text, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { collection, getFirestore, query, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import appFirebase from '../BASEDEDATOS/Firebase';

const db = getFirestore(appFirebase);

export default function ListarClientes({ navigation }) {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    LeerDatos();
  }, []);

  useEffect(() => {
    filtrarClientes();
  }, [busqueda, clientes]);

  const LeerDatos = async () => {
    const q = query(collection(db, "clientes"));
    const querySnapshot = await getDocs(q);
    const d = [];
    querySnapshot.forEach((doc) => {
      const datosBD = doc.data();
      d.push(datosBD);
    });
    setClientes(d);
    setClientesFiltrados(d);
  };

  const filtrarClientes = () => {
    if (busqueda === '') {
      setClientesFiltrados(clientes);
    } else {
      const filtrados = clientes.filter(cliente =>
        cliente.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.cedula.toLowerCase().includes(busqueda.toLowerCase())
      );
      setClientesFiltrados(filtrados);
    }
  };

  const eliminarCliente = (cedula) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Está seguro que desea eliminar este cliente?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: async() => {
            await deleteDoc(doc(db, "clientes", cedula));
            LeerDatos();
          }
        }
      ]
    );
  };

  const agregarNuevoCliente = async(nuevo) => {
    await setDoc(doc(db, "clientes", nuevo.cedula), nuevo);
    LeerDatos();
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

      {/* Barra de búsqueda */}
      <View style={styles.barraBusqueda}>
        <MaterialIcons name="search" size={20} color="#666" style={styles.iconoBusqueda} />
        <TextInput
          style={styles.inputBusqueda}
          placeholder="Buscar clientes..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
        {busqueda !== '' && (
          <TouchableOpacity onPress={() => setBusqueda('')} style={styles.botonLimpiar}>
            <MaterialIcons name="close" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {clientesFiltrados.length === 0 ? (
        <Text style={styles.mensaje}>
          {busqueda === '' ? 'No hay clientes registrados' : 'No se encontraron resultados'}
        </Text>
      ) : (
        <FlatList
          data={clientesFiltrados}
          keyExtractor={(item) => item.cedula}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>Cédula: <Text style={styles.valor}>{item.cedula}</Text></Text>
              <Text style={styles.label}>Nombres: <Text style={styles.valor}>{item.nombres}</Text></Text>
              <Text style={styles.label}>Apellidos: <Text style={styles.valor}>{item.apellidos}</Text></Text>
              <Text style={styles.label}>Fecha Nac.: <Text style={styles.valor}>{item.fechaN}</Text></Text>
              <Text style={styles.label}>Sexo: <Text style={styles.valor}>{item.sexo}</Text></Text>
              
              <View style={styles.contenedorBotones}>
                <TouchableOpacity 
                  style={styles.botonEditar}
                  onPress={() => navigation.navigate('GuardarCliente', {
                    agregarNuevoCliente,
                    clienteEditar: item
                  })}
                >
                  <MaterialIcons name='edit' size={24} color="#1976D2" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.botonEliminar}
                  onPress={() => eliminarCliente(item.cedula)}
                >
                  <MaterialIcons name="delete" size={24} color="#f44336" />
                </TouchableOpacity>
              </View>
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
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  barraBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#81C784',
  },
  iconoBusqueda: {
    marginRight: 8,
  },
  inputBusqueda: {
    flex: 1,
    height: 40,
    paddingVertical: 8,
  },
  botonLimpiar: {
    padding: 5,
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
  contenedorBotones: {
    position: 'absolute',
    right: 15,
    top: 15,
    flexDirection: 'row',
  },
  botonEditar: {
    marginRight: 10,
  },
  botonEliminar: {
  },
});