// app/myservices/index.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

interface ServicioDetalle {
  title: string;
  price: number;
  description?: string;
}

interface Servicio {
  id: number;
  servicio_detalle: ServicioDetalle;
  fecha: string;
  estado: string;
  cliente: string;
  cantidad: number;
  total: number;
}

const MyServicesScreen = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [selectedTab, setSelectedTab] = useState<"activos" | "inactivos">(
    "activos"
  );

  useEffect(() => {
    setServicios([
      {
        id: 10,
        servicio_detalle: { title: "Reparación de lavadora", price: 500 },
        fecha: "2025-12-01",
        estado: "pendiente",
        cliente: "Roberto Díaz",
        cantidad: 1,
        total: 500,
      },
      {
        id: 11,
        servicio_detalle: { title: "Instalación eléctrica", price: 900 },
        fecha: "2025-11-22",
        estado: "iniciado",
        cliente: "Lucía Hernández",
        cantidad: 1,
        total: 900,
      },
      {
        id: 12,
        servicio_detalle: { title: "Pintura exterior", price: 1500 },
        fecha: "2025-11-10",
        estado: "completado",
        cliente: "Jesús Ortega",
        cantidad: 1,
        total: 1500,
      },
      {
        id: 13,
        servicio_detalle: { title: "Cambio de tubería", price: 700 },
        fecha: "2025-10-18",
        estado: "cancelado",
        cliente: "Ana Pérez",
        cantidad: 1,
        total: 700,
      },
    ]);
  }, []);

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
          style={[
            styles.tab,
            selectedTab === "activos" && styles.tabSelected,
          ]}
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
          style={[
            styles.tab,
            selectedTab === "inactivos" && styles.tabSelected,
          ]}
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
          <Text style={styles.title}>{servicio.servicio_detalle.title}</Text>

          <Text style={styles.text}>
            <Text style={styles.bold}>Cliente:</Text> {servicio.cliente}
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

  /* TABS */
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

  /* CARDS */
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
