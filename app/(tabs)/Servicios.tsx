import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import ServiceCard from "@/components/services/ServiceCards";
import axios from "axios";

export default function ServiciosScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [error, setError] = useState("");

  const isDark = theme === "dark";
  const textColor = isDark ? "#fff" : "#000";
  const bgColor = isDark ? "#121212" : "#fff";
  const accentColor = "#ef4444";

  // 🔹 Obtener servicios desde la API al cargar la pantalla
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("https://mibackend-mchambas.onrender.com/api/services/");
        console.log("✅ Servicios obtenidos:", res.data);
        setServices(res.data);
      } catch (err) {
        console.error("❌ Error al cargar servicios:", err);
        setError("No se pudieron cargar los servicios.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // 🔍 Filtro de búsqueda + tipo
  const filtered = services.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    if (filter === "verificados") return matchesSearch && s.verified;
    return matchesSearch;
  });

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
          {[
            { key: "todos", label: "Todos" },
            { key: "verificados", label: "Verificados" },
          ].map((btn) => (
            <TouchableOpacity
              key={btn.key}
              onPress={() => setFilter(btn.key)}
              style={{
                backgroundColor: filter === btn.key ? accentColor : isDark ? "#333" : "#e5e5e5",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: filter === btn.key ? "#fff" : textColor, fontWeight: "600" }}>
                {btn.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mostrar carga o error */}
        {loading ? (
          <ActivityIndicator size="large" color={accentColor} style={{ marginTop: 40 }} />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>{error}</Text>
        ) : filtered.length === 0 ? (
          <Text style={{ textAlign: "center", color: textColor, marginTop: 20 }}>
            No se encontraron servicios
          </Text>
        ) : (
          filtered.map((service) => (
            <TouchableOpacity
              key={service.id}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/detalles/[id]",
                  params: { id: service.id.toString() },
                })
              }
            >
              <ServiceCard service={service} />
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}
