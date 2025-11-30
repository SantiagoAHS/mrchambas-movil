import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { useTheme } from "@/context/ThemeContext";
import { Star, MapPin, Clock, ArrowLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ServicesDetailScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const { theme } = useTheme();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const isLight = theme === "light";
  const colors = {
    text: isLight ? "#000" : "#e5e5e5",
    background: isLight ? "#fff" : "#121212",
    border: isLight ? "#ef4444" : "#b91c1c",
    accent: "#ef4444",
    secondary: isLight ? "#6b7280" : "#9ca3af",
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`https://mibackend-mchambas.onrender.com/api/services/${id}/`);
        setService(res.data);
      } catch (err) {
        setError("No se pudo cargar la información del servicio.");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`https://mibackend-mchambas.onrender.com/api/services/${id}/reviews/`);
        setReviews(res.data);
      } catch (err) {
        console.log("❌ Error reviews:", err);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchService();
    fetchReviews();
  }, [id]);

  const handleContact = async () => {
    try {
      // Obtener token desde AsyncStorage
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Debes iniciar sesión para contactar");
        return;
      }

      if (!service?.provider?.id) {
        Alert.alert("Error", "No se pudo obtener el proveedor del servicio.");
        return;
      }

      // 1️⃣ Crear chat
      const chatRes = await fetch(
        "https://mibackend-mchambas.onrender.com/api/chats/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ other_user_id: service.provider.id }),
        }
      );

      if (!chatRes.ok) throw new Error("No se pudo crear el chat");

      const chat = await chatRes.json();

      // 2️⃣ Enviar mensaje inicial
      await fetch(
        `https://mibackend-mchambas.onrender.com/api/chats/${chat.id}/send/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            content: "Hola, estoy interesado en tu servicio",
          }),
        }
      );

      Alert.alert("Éxito", "Se ha creado el chat y enviado el mensaje.");
      router.push("/chat"); // Redirigir a la pantalla de chats
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo contactar al proveedor.");
    }
  };

  const handleHire = () => {
    if (!service?.id) {
      Alert.alert("Error", "No se pudo obtener la información del servicio.");
      return;
    }

    router.push({
      pathname: '/payments/checkout/[id]',
      params: { id: String(service.id) },
    });
  };

  if (error || !service) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.retryButton}>
          <Text style={{ color: "#fff" }}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", margin: 16 }}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={colors.text} />
        <Text style={{ marginLeft: 8, color: colors.text }}>Volver</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: service.image || "https://via.placeholder.com/600x300" }}
        style={styles.image}
      />

      <View style={{ padding: 16 }}>
        {service.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verificado</Text>
          </View>
        )}

        <Text style={[styles.title, { color: colors.accent }]}>{service.title}</Text>

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <View style={styles.avatar}>
            <Text style={{ fontWeight: "bold" }}>{service.provider?.nombre?.[0] || "?"}</Text>
          </View>
          <Text style={{ color: colors.secondary }}>{service.provider?.nombre || "Sin nombre"}</Text>
        </View>

        <Text style={[styles.description, { color: colors.text }]}>{service.description}</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
          <View style={styles.rowItem}>
            <Star size={18} color="#facc15" fill="#facc15" />
            <Text style={{ color: colors.text, fontWeight: "bold" }}>{service.rating || "5.0"}</Text>
            <Text style={{ color: colors.secondary }}>({service.reviews || 0})</Text>
          </View>

          <View style={styles.rowItem}>
            <MapPin size={18} color={colors.secondary} />
            <Text style={{ color: colors.secondary }}>{service.location || "Ubicación"}</Text>
          </View>
        </View>

        <View style={[styles.rowItem, { marginTop: 8 }]}>
          <Clock size={18} color={colors.secondary} />
          <Text style={{ color: colors.secondary }}>
            Responde en {service.response_time || "1 hora"}
          </Text>
        </View>

        <Text style={[styles.price, { color: colors.accent }]}>
          {service.price || "$500"}
        </Text>

        {/* ✔ NUEVO BOTÓN CONTRATAR */}
        <TouchableOpacity
          onPress={handleHire}
          style={[
            styles.button,
            { backgroundColor: "#15803d", borderColor: "#15803d" },
          ]}
        >
          <Text style={styles.buttonText}>Contratar</Text>
        </TouchableOpacity>

        {/* ✔ BOTÓN CONTACTAR (YA EXISTENTE) */}
        <TouchableOpacity
          onPress={handleContact}
          style={[
            styles.button,
            { backgroundColor: colors.accent, borderColor: colors.border },
          ]}
        >
          <Text style={styles.buttonText}>Contactar</Text>
        </TouchableOpacity>

      </View>

      {/* RESEÑAS */}
      <View style={{ padding: 16, marginTop: 16 }}>
        <Text style={[styles.title, { color: colors.accent, fontSize: 20 }]}>Reseñas</Text>

        {loadingReviews ? (
          <ActivityIndicator size="small" color={colors.accent} style={{ marginTop: 8 }} />
        ) : reviews.length === 0 ? (
          <Text style={{ color: colors.text, marginTop: 8 }}>No hay reseñas aún.</Text>
        ) : (
          reviews.map((review, index) => (
            <View
              key={index}
              style={{
                backgroundColor: isLight ? "#f3f4f6" : "#1f2937",
                padding: 12,
                borderRadius: 8,
                marginTop: 8,
              }}
            >
              <Text style={{ color: colors.text, fontWeight: "bold" }}>
                {review.user?.nombre || "Usuario"}
              </Text>
              <Text style={{ color: colors.secondary, fontSize: 12 }}>
                {review.created_at}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                <Star size={16} color="#facc15" fill="#facc15" />
                <Text style={{ color: colors.text, marginLeft: 4 }}>{review.rating}</Text>
              </View>

              <Text style={{ color: colors.text, marginTop: 4 }}>
                {review.comment}
              </Text>
            </View>
          ))
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 250 },
  verifiedBadge: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  verifiedText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  description: { fontSize: 15, marginBottom: 8 },
  rowItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  price: { fontSize: 24, fontWeight: "bold", marginTop: 16 },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  retryButton: {
    marginTop: 16,
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 6,
  },
});
