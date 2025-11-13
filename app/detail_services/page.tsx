export default function datilPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Página de Detalles de servicios de MiProyecto
      </Text>
      <Text style={styles.paragraph}>
        Esta es la página principal. Puedes editar y mejorar esta sección.
      </Text>
    </View>
  );
}

import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    maxWidth: 600,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "#374151", 
  },
});
