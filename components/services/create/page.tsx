"use client";
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Sidebar from "@/components/sidebar/Sidebar";
import Servicescreate from "@/components/services/Servicescreate";
import { useTheme } from "@/context/ThemeContext";

export default function CreateServicePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? styles.bgDark : styles.bgLight;
  const textColor = isDark ? styles.textLight : styles.textDark;

  return (
    <View style={[styles.container, bgColor]}>
      {/* Sidebar (solo si se requiere en móvil) */}
      <Sidebar />

      <ScrollView contentContainerStyle={styles.main}>
        <Text style={[styles.title, textColor]}>Crear nuevo servicio</Text>
        <Servicescreate />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    transition: "background-color 0.3s", // equivalente de transition-colors
  },
  bgLight: {
    backgroundColor: "#f3f4f6", 
  bgDark: {
    backgroundColor: "#1f1f1f",
  },
  main: {
    flexGrow: 1,
    padding: 16, 
  },
  title: {
    fontSize: 22, 
    fontWeight: "bold",
    marginBottom: 16, 
  },
  textDark: {
    color: "#1f2937", 
  },
  textLight: {
    color: "#f3f4f6", 
  },
});
