// app/myservices/index.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Servicio {
  id: number;
  servicio_detalle: {
    title: string;
  };
  fecha: string;
  estado: string;
  comprador: string;
  total: number;
}

const MyServicesScreen = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [selectedTab, setSelectedTab] = useState<"activos" | "inactivos">(
    "activos"
  );

  // -------------------------
  // 🔄 FUNCIÓN PARA CARGAR SERVICIOS
  // -------------------------
  const cargarServicios = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(
        "https://mibackend-mchambas.onrender.com/api/ventas/mis-ventas/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.error("Error cargando servicios");
        return;
      }

      const data = await res.json();
      setServicios(data);
    } catch (err) {
      console.error("Error de red:", err);
    }
  };

  // -------------------------
  // 📌 CARGAR UNA VEZ AL INICIO
  // -------------------------
  useEffect(() => {
    cargarServicios();
  }, []);

  // -------------------------
  // 🔄 AUTO REFRESH CADA VEZ QUE ENTRES A LA PANTALLA
  // -------------------------
  useFocusEffect(
    useCallback(() => {
      cargarServicios(); // cargar al abrir

      // Intervalo para auto refresco cada 5 segundos
      const interval = setInterval(() => {
        cargarServicios();
      }, 5000);

      // limpiar al salir de pantalla
      return () => clearInterval(interval);
    }, [])
  );

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return { color: "#f59e0b" };
      case "iniciado":
        return { color: "#3b82f6" };
      case "procesando":
        return { color: "#6366f1" };
      case "completado":
        return { color: "#10b981" };
      case "cancelado":
        return { color: "#ef4444" };
      default:
        return { color: "#222" };
    }
  };

  const activos = servicios.filter(
    (s) =>
      s.estado === "pendiente" ||
      s.estado === "iniciado" ||
      s.estado === "procesando"
  );

  const inactivos = servicios.filter(
    (s) => s.estado === "completado" || s.estado === "cancelado"
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Mis trabajos</Text>

      {/* TABS */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "activos" && styles.tabSelected]}
          onPress={() => setSelectedTab("activos")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "activos" && styles.tabTextSelected,
            ]}
          >
            Activos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === "inactivos" && styles.tabSelected]}
          onPress={() => setSelectedTab("inactivos")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "inactivos" && styles.tabTextSelected,
            ]}
          >
            Inactivos
          </Text>
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      {(selectedTab === "activos" ? activos : inactivos).map((servicio) => (
        <TouchableOpacity
          key={servicio.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/myjobs/[id]",
              params: { id: servicio.id.toString() },
            })
          }
        >
          <Text style={styles.title}>
            {servicio.servicio_detalle?.title || "Sin título"}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.bold}>Cliente:</Text> {servicio.comprador}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.bold}>Fecha:</Text>{" "}
            {new Date(servicio.fecha).toLocaleDateString()}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.bold}>Estado:</Text>{" "}
            <Text style={[styles.bold, getEstadoColor(servicio.estado)]}>
              {servicio.estado}
            </Text>
          </Text>

          <Text style={styles.text}>
            <Text style={styles.bold}>Total:</Text> ${servicio.total}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MyServicesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ef4444",
    marginBottom: 20,
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  tabSelected: {
    backgroundColor: "#ef4444",
  },
  tabText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
  },
  tabTextSelected: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  text: { fontSize: 16, marginBottom: 4 },
  bold: { fontWeight: "bold" },
});
