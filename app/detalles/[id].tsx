import React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ServiceDetailScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const params = useLocalSearchParams(); // ✅ así obtienes los params

  const id = params.id;
  // 🔹 Datos de ejemplo
  const serviciosEjemplo = [
    {
      id: 1,
      title: "Plomería Profesional",
      description: "Reparación de fugas, instalación de tuberías y mantenimiento general.",
      verified: true,
      rating: 4.8,
      reviews: 32,
      location: "Tlaxcala",
      response_time: "2 horas",
      price: "$350",
      provider: { nombre: "Juan Pérez" },
      image: "https://images.unsplash.com/photo-1597007893761-f3d620a4c84f",
    },
    {
      id: 2,
      title: "Clases de Inglés",
      description: "Aprende inglés con un método divertido y práctico. Todos los niveles.",
      verified: false,
      rating: 4.6,
      reviews: 21,
      location: "Apizaco",
      response_time: "1 hora",
      price: "$200",
      provider: { nombre: "María López" },
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    },
  ];

  const service = serviciosEjemplo.find((s) => s.id.toString() === id);

  if (!service) return <Text style={{ color: isDark ? "#fff" : "#000", padding: 16 }}>Servicio no disponible</Text>;

  const handleContact = () => Alert.alert("Simulación", "Contactar al proveedor");
  const handleHire = () => Alert.alert("Simulación", "Ir a pagar / contratar servicio");

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: isDark ? "#1c1c1c" : "#f9fafb" }}>
      <View style={{ backgroundColor: isDark ? "#2a2a2a" : "#fff", borderRadius: 16, padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: isDark ? "#ff7f7f" : "#dc2626", marginBottom: 8 }}>
          {service.title}
        </Text>
        <Text style={{ marginBottom: 12, color: isDark ? "#e5e5e5" : "#111" }}>
          Ofrecido por: <Text style={{ fontWeight: "bold" }}>{service.provider.nombre}</Text>
        </Text>

        <Image source={{ uri: service.image }} style={{ width: "100%", height: 200, borderRadius: 12, marginBottom: 12 }} />

        <Text style={{ marginBottom: 12, color: isDark ? "#e5e5e5" : "#111", lineHeight: 22 }}>
          {service.description}
        </Text>

        <View style={{ marginBottom: 16 }}>
          {service.verified && <Text style={{ color: "#dc2626", fontWeight: "600", marginBottom: 4 }}>✅ Profesional verificado</Text>}
          <Text style={{ marginBottom: 4, color: isDark ? "#e5e5e5" : "#111" }}>📍 Ubicación: {service.location}</Text>
          <Text style={{ marginBottom: 4, color: isDark ? "#e5e5e5" : "#111" }}>⏱ Responde en: {service.response_time}</Text>
          <Text style={{ marginBottom: 4, color: "#dc2626", fontWeight: "600" }}>💰 Precio: {service.price}</Text>
          <Text style={{ marginBottom: 4, color: isDark ? "#e5e5e5" : "#111" }}>⭐ Valoración: {service.rating} ({service.reviews} reseñas)</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={handleContact}
            style={{ flex: 1, backgroundColor: "#dc2626", padding: 12, borderRadius: 12, marginRight: 8 }}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>Contactar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleHire}
            style={{ flex: 1, borderWidth: 2, borderColor: "#dc2626", padding: 12, borderRadius: 12 }}
          >
            <Text style={{ color: "#dc2626", textAlign: "center", fontWeight: "600" }}>Contratar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
  
}


