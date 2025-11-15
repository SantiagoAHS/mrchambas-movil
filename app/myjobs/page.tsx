import React from "react";
import { View, StyleSheet } from "react-native";

const JobsScreen: React.FC = () => {
  return <View style={styles.container} />;
};

export default JobsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Cambia a "#121212" si quieres modo oscuro predeterminado
  },
});

