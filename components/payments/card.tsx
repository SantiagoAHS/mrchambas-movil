import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Tarjeta {
  id: number;
  nombre_titular: string;
  numero_enmascarado: string;
  exp_mes: number;
  exp_ano: number;
  default?: boolean;
}

interface TarjetasListProps {
  scrollEnabled?: boolean;
  horizontal?: boolean;
  style?: object;
}

const TarjetasList: React.FC<TarjetasListProps> = ({
  scrollEnabled = true,
  horizontal = false,  // 👈 LISTA VERTICAL
  style = {},
}) => {
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTarjetas = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const res = await fetch('https://mibackend-mchambas.onrender.com/api/pagos/tarjetas/', {
        headers: { Authorization: `Token ${token}` },
      });

      const data = await res.json();
      setTarjetas(data);
    } catch (err) {
      console.log('Error cargando tarjetas', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTarjetas();
  }, []);

  // 🗑️ Eliminar tarjeta
  const eliminarTarjeta = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem('token');

      await fetch(`https://mibackend-mchambas.onrender.com/api/pagos/tarjetas/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${token}` },
      });

      setTarjetas(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.log('Error eliminando tarjeta', err);
    }
  };

  // ⭐ Establecer como default
  const setDefaultCard = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await fetch(
        `https://mibackend-mchambas.onrender.com/api/pagos/tarjetas/${id}/set-default/`,
        {
          method: 'POST',
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (!res.ok) {
        Alert.alert("Error", "No se pudo establecer como predeterminada");
        return;
      }

      fetchTarjetas();
    } catch (err) {
      console.log("Error marcando como default", err);
    }
  };

  const renderItem = ({ item }: { item: Tarjeta }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.titular}>{item.nombre_titular}</Text>
        <Text style={styles.numero}>{item.numero_enmascarado}</Text>

        <Text style={styles.exp}>
          Expira {String(item.exp_mes).padStart(2, '0')}/
          {String(item.exp_ano).slice(-2)}
          {item.default ? '  (Por defecto)' : ''}
        </Text>
      </View>

      <View style={styles.actions}>
        {!item.default && (
          <TouchableOpacity
            style={styles.defaultButton}
            onPress={() => setDefaultCard(item.id)}
          >
            <Text style={styles.defaultText}>Por defecto</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => eliminarTarjeta(item.id)}
        >
          <Text style={styles.deleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading)
    return <ActivityIndicator size="large" color="#E63946" style={{ marginTop: 50 }} />;

  return (
    <FlatList
      data={tarjetas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      scrollEnabled={scrollEnabled}
      horizontal={false}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={[{ paddingBottom: 16 }, style]}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E63946',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 5,
  },
  titular: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  numero: {
    color: 'white',
    fontSize: 22,
    letterSpacing: 3,
    fontWeight: 'bold',
    marginTop: 4,
  },
  exp: {
    color: 'white',
    fontSize: 14,
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  defaultButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 10,
  },
  defaultText: {
    color: '#E63946',
    fontWeight: 'bold',
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  deleteText: {
    color: '#E63946',
    fontWeight: 'bold',
  },
});

export default TarjetasList;
