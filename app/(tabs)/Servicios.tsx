import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import ServiceCard from "@/components/services/ServiceCards";

export default function ServiciosScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const isDark = theme === "dark";
  const textColor = isDark ? "#fff" : "#000";
  const bgColor = isDark ? "#121212" : "#fff";
  const accentColor = "#ef4444"; // red-500

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

  const filtered = serviciosEjemplo.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: textColor, marginBottom: 12 }}>
          Servicios disponibles
        </Text>

        <TextInput
          placeholder="Buscar servicio..."
          placeholderTextColor={isDark ? "#888" : "#999"}
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: isDark ? "#1e1e1e" : "#f3f3f3",
            color: textColor,
            padding: 12,
            borderRadius: 10,
            marginBottom: 16,
          }}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 16 }}>
          <TouchableOpacity
            style={{ backgroundColor: accentColor, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Todos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: isDark ? "#333" : "#e5e5e5", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}
          >
            <Text style={{ color: textColor }}>Verificados</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: isDark ? "#333" : "#e5e5e5", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}
          >
            <Text style={{ color: textColor }}>Mejor valorados</Text>
          </TouchableOpacity>
        </View>

        {filtered.map((service) => (
          <TouchableOpacity
          key={service.id}
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/detalles/[id]",
              params: { id: service.id.toString() }, // solo pasamos id
            })
          }
        >
          <ServiceCard service={service} />
        </TouchableOpacity>

        ))}
      </View>
    </ScrollView>
  );
}
