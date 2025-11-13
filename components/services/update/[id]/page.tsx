"use client";
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Sidebar from "@/components/sidebar/Sidebar";
import ServicesUpdate from "@/components/services/Servicesupdate";
import { useLocalSearchParams } from "expo-router"; 
export default function UpdateServicePage() {
  const params = useLocalSearchParams();

  const serviceId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!serviceId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>ID del servicio no encontrado en la URL</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Sidebar para la movil */}
      <Sidebar />

      <ScrollView contentContainerStyle={styles.main}>
        <Text style={styles.title}>Actualizar servicio</Text>
        <ServicesUpdate serviceId={serviceId} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", 
  },
  main: {
    flexGrow: 1,
    padding: 16, 
  },
  title: {
    fontSize: 22, 
    fontWeight: "bold",
    color: "#1f2937", 
    marginBottom: 16,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
    fontSize: 16,
  },
});
