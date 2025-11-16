"use client";

import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, ActivityIndicator, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Service {
  id: number;
  title: string;
  description: string;
  image?: string; // opcional para evitar conflicto de tipos
  rating: number;
  reviews: number;
  location: string;
  response_time: string;
  price: string;
  verified: boolean;
  provider: {
    nombre: string;
  };
}

// Card para mostrar cada servicio
const ServiceCardUser: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <View style={styles.card}>
      {service.image && (
        <Image
          source={{ uri: `https://mibackend-mchambas.onrender.com${service.image}` }}
          style={styles.cardImage}
        />
      )}
      <Text style={styles.cardTitle}>{service.title}</Text>
      <Text style={styles.cardProvider}>Proveedor: {service.provider.nombre}</Text>
      <Text style={styles.cardPrice}>Precio: ${service.price}</Text>
      <Text style={styles.cardLocation}>Ubicación: {service.location}</Text>
      <Text style={styles.cardResponse}>Responde: {service.response_time}</Text>
      <Text style={styles.cardVerified}>
        {service.verified ? "✅ Verificado" : "⏳ Pendiente"}
      </Text>
    </View>
  );
};

export default function UserServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserServices() {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await fetch(
          "https://mibackend-mchambas.onrender.com/api/services/my-services/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("No autorizado o error al obtener servicios");

        const data = await res.json();
        setServices(data.map((s: Service) => ({ ...s, image: s.image ?? undefined })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserServices();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 }}>
        <ActivityIndicator size="large" color="#ef4444" />
      </View>
    );

  if (services.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 }}>
        <Text>No tienes servicios registrados.</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {services.map((service) => (
        <ServiceCardUser key={service.id} service={service} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: { width: "100%", height: 150, borderRadius: 8, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4, color: "#ef4444" },
  cardProvider: { fontSize: 14, marginBottom: 2 },
  cardPrice: { fontSize: 14, marginBottom: 2, fontWeight: "bold" },
  cardLocation: { fontSize: 12, marginBottom: 2, color: "#555" },
  cardResponse: { fontSize: 12, marginBottom: 2, color: "#555" },
  cardVerified: { fontSize: 12, marginTop: 4, fontWeight: "bold" },
});
