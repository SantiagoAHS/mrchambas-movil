import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function ConfiguracionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Configuracion 🛠️</Text>
      <Text>Aquí puedes ver la información general del usuario.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});