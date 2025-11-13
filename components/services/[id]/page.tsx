'use client';

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";


type RootStackParamList = {
  Chat: undefined;
  Checkout: { id: string | number };
  ServiceDetail: { id: string | number };
};


type NavigationProp = StackNavigationProp<RootStackParamList, "ServiceDetail">;


import ServicesReviews from "Servicesreviews"; // Ajustar la ruta si está en otro lugar // 

export default function ServiceDetailPage() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { id }: any = (route.params as { id?: string }) || {};
  const [service, setService] = useState<any>(null);
  const [error, setError] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`https://mibackend-mchambas.onrender.com/api/services/${id}/`, {
          cache: "no-store" as RequestCache,
        });

        if (!res.ok) {
          setError(true);
          return;
        }

        const data = await res.json();
        setService(data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    }

    if (id) fetchService();
  }, [id]);

  const handleContact = async () => {
    
    Alert.alert("Aviso", "Función de contacto pendiente de adaptación a móvil");
  };

  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Servicio no encontrado</Text>
      </View>
    );

  if (!service)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={isDark ? "#22c55e" : "#16a34a"} />
        <Text style={[styles.loadingText, { color: isDark ? "#e5e7eb" : "#374151" }]}>
          Cargando...
        </Text>
      </View>
    );

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#3a3a3a" : "#f9fafb" },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark ? "#2b2b2b" : "#ffffff",
            borderColor: isDark ? "#4b5563" : "#e5e7eb",
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: isDark ? "#f9fafb" : "#111827" },
          ]}
        >
          {service.title}
        </Text>

        <Text style={[styles.provider, { color: isDark ? "#d1d5db" : "#4b5563" }]}>
          Ofrecido por: <Text style={styles.bold}>{service.provider?.nombre}</Text>
        </Text>

        {service.image && (
          <Image
            source={{
              uri: `https://mibackend-mchambas.onrender.com${service.image}`,
            }}
            style={styles.image}
          />
        )}

        <Text style={[styles.description, { color: isDark ? "#e5e7eb" : "#374151" }]}>
          {service.description}
        </Text>

        <View style={styles.infoGrid}>
          {service.verified && (
            <Text style={styles.verified}>✅ Profesional verificado</Text>
          )}
          <Text style={styles.infoItem}>
            <Text style={styles.bold}>Ubicación:</Text> {service.location}
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.bold}>Responde en:</Text> {service.response_time}
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.bold}>Precio:</Text> ${service.price}
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.bold}>Valoración:</Text> {service.rating} ⭐ ({service.reviews} reseñas)
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: isDark ? "#15803d" : "#16a34a" }]}
            onPress={() => navigation.navigate("Chat")}
          >
            <Text style={styles.buttonText}>Contactar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: isDark ? "#1d4ed8" : "#2563eb" }]}
            onPress={() => navigation.navigate("Checkout", { id })}
          >
            <Text style={styles.buttonText}>Contratar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.reviewsContainer}>
        <Text style={[styles.reviewsTitle, { color: isDark ? "#f3f4f6" : "#111827" }]}>
          Comentarios
        </Text>
        <ServicesReviews serviceId={parseInt(id, 10)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderWidth: 1, borderRadius: 8, padding: 16, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 8 },
  provider: { marginBottom: 12 },
  bold: { fontWeight: "600" },
  image: { width: "100%", height: 220, borderRadius: 8, marginBottom: 12 },
  description: { marginBottom: 16, fontSize: 15, lineHeight: 22 },
  infoGrid: { gap: 6, marginBottom: 20 },
  infoItem: { fontSize: 14 },
  verified: { color: "#22c55e", fontWeight: "600" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  button: { flex: 1, paddingVertical: 10, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "600", textAlign: "center" },
  reviewsContainer: { marginTop: 24 },
  reviewsTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "#ef4444", fontWeight: "600" },
  loadingText: { marginTop: 8, fontSize: 14 },
});
