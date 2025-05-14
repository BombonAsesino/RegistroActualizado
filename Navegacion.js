import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GuardarCliente from './Screens/GuardarCliente';
import ListarClientes from './Screens/ListarClientes';

const Stack = createNativeStackNavigator();

export default function Navegacion() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListarClientes">
        <Stack.Screen 
          name="ListarClientes" 
          component={ListarClientes} 
          options={{ title: 'Listar Clientes' }}
        />
        <Stack.Screen 
          name="GuardarCliente" 
          component={GuardarCliente}
          options={{ title: 'Guardar Cliente' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}