import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Search, Filter, Grid, List } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";

export default function ServicesCatalog() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const colors = {
    border: isDark ? "#a855f7" : "#16a34a",
    background: isDark ? "#3a3a3a" : "#ffffff",
    textPrimary: isDark ? "#f3f4f6" : "#111827",
    textSecondary: isDark ? "#d1d5db" : "#6b7280",
    accent: isDark ? "#9333ea" : "#16a34a",
    gradientStart: isDark ? "#9333ea" : "#f97316",
    gradientEnd: isDark ? "#ea580c" : "#9333ea",
  };

  const fetchServices = async (filters: Record<string, any> = {}) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const query = new URLSearchParams();
      if (filters.location) query.append("location", filters.location);
      if (filters.verified) query.append("verified", "true");
      if (filters.priceRange) query.append("price", filters.priceRange);
      if (filters.min_rating) query.append("rating", String(filters.min_rating));

      const url = Object.keys(filters).length
        ? `https://mibackend-mchambas.onrender.com/api/services/filtered/?${query.toString()}`
        : "https://mibackend-mchambas.onrender.com/api/services/";

      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Token ${token}`;

      const response = await fetch(url, { headers });
      const data = await response.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.searchContainer}>
          <Search color={colors.textSecondary} size={20} style={styles.searchIcon} />
          <TextInput
            style={[
              styles.searchInput,
              { borderColor: colors.border, color: colors.textPrimary },
            ]}
            placeholder="Buscar servicios..."
            placeholderTextColor={colors.textSecondary}
            editable={false}
          />
        </View>
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: colors.accent }]}
          disabled
        >
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Servicios Disponibles
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {loading ? "Cargando..." : `${services.length} servicios encontrados`}
        </Text>
      </View>

      {/* Loading */}
      {loading && (
        <ActivityIndicator
          size="large"
          color={colors.accent}
          style={{ marginVertical: 20 }}
        />
      )}

      {/* Banner */}
      <View
        style={[
          styles.banner,
          { backgroundColor: colors.gradientStart },
        ]}
      >
        <Text style={styles.bannerTitle}>🌟 Servicios Destacados</Text>
        <Text style={styles.bannerText}>
          Encuentra los mejores profesionales verificados en tu área.
        </Text>
      </View>

      {/* Listado de Servicios */}
      <View style={styles.servicesList}>
        {services.map((service, index) => (
          <View
            key={index}
            style={[
              styles.serviceCard,
              { borderColor: colors.border, backgroundColor: colors.background },
            ]}
          >
            <Text style={[styles.serviceTitle, { color: colors.textPrimary }]}>
              {service.title}
            </Text>
            <Text style={[styles.serviceDescription, { color: colors.textSecondary }]}>
              {service.description || "Sin descripción"}
            </Text>
            <Text style={{ color: colors.accent, marginTop: 4 }}>
              {service.location || "Ubicación no disponible"}
            </Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <View
        style={[
          styles.ctaContainer,
          { borderColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        <Text style={[styles.ctaTitle, { color: colors.textPrimary }]}>
          ¿Eres un profesional?
        </Text>
        <Text style={[styles.ctaText, { color: colors.textSecondary }]}>
          Únete a nuestra plataforma y conecta con miles de clientes.
        </Text>
        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: colors.accent }]}
          disabled
        >
          <Text style={styles.ctaButtonText}>Registrar mi Servicio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 12,
  },
  searchContainer: {
    flex: 1,
    position: "relative",
    marginRight: 10,
  },
  searchIcon: {
    position: "absolute",
    top: 12,
    left: 10,
  },
  searchInput: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 36,
    paddingRight: 10,
    fontSize: 14,
  },
  searchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionHeader: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
  banner: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bannerText: {
    color: "#fef3c7",
  },
  servicesList: {
    gap: 12,
  },
  serviceCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  serviceDescription: {
    fontSize: 13,
    marginTop: 4,
  },
  ctaContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginTop: 24,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ctaText: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 12,
  },
  ctaButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
