import PedidoItem from "@/components/Contracts/ContractsDetail";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

type Tab = "activos" | "inactivos";

interface ServicioDetalle {
  title: string;
  price: number;
  description?: string;
}

interface Pedido {
  id: number;
  servicio_detalle: ServicioDetalle;
  fecha: string;
  estado: string;
  comprador: string;
  cantidad: number;
  total: number;
}

const MyOrdersScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>("activos");
  const [pedidosActivos, setPedidosActivos] = useState<Pedido[]>([]);
  const [pedidosInactivos, setPedidosInactivos] = useState<Pedido[]>([]);

  // Simulación de backend (mock)
  useEffect(() => {
    const mock = [
      {
        id: 1,
        servicio_detalle: { title: "Limpieza de casa", price: 300 },
        fecha: "2025-12-01",
        estado: "iniciado",
        comprador: "Carlos Ruiz",
        cantidad: 1,
        total: 300,
      },
      {
        id: 2,
        servicio_detalle: { title: "Electricista", price: 450 },
        fecha: "2025-11-20",
        estado: "completado",
        comprador: "Ana López",
        cantidad: 1,
        total: 450,
      },
      {
        id: 3,
        servicio_detalle: { title: "Plomería", price: 600 },
        fecha: "2025-11-10",
        estado: "pendiente",
        comprador: "Miguel Castro",
        cantidad: 1,
        total: 600,
      },
      {
        id: 4,
        servicio_detalle: { title: "Carpintería", price: 200 },
        fecha: "2025-11-05",
        estado: "cancelado",
        comprador: "Luis Pérez",
        cantidad: 1,
        total: 200,
      },
    ];

    // Separar activos vs inactivos
    setPedidosActivos(mock.filter((p) => p.estado !== "completado" && p.estado !== "cancelado"));
    setPedidosInactivos(mock.filter((p) => p.estado === "completado" || p.estado === "cancelado"));
  }, []);

  const renderPedido = (pedido: Pedido) => (
    <View key={pedido.id} style={styles.card}>
      <Text style={styles.cardTitle}>{pedido.servicio_detalle.title}</Text>

      <Text style={styles.cardText}>
        <Text style={styles.bold}>Cliente:</Text> {pedido.comprador}
      </Text>

      <Text style={styles.cardText}>
        <Text style={styles.bold}>Fecha:</Text>{" "}
        {new Date(pedido.fecha).toLocaleDateString()}
      </Text>

      <Text style={styles.cardText}>
        <Text style={styles.bold}>Estado:</Text>{" "}
        <Text style={[styles.estado, getEstadoStyle(pedido.estado)]}>
          {pedido.estado}
        </Text>
      </Text>

      <Text style={styles.cardText}>
        <Text style={styles.bold}>Total:</Text> ${pedido.total}
      </Text>
    </View>
  );

  const getEstadoStyle = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return { color: "#f59e0b" }; // amarillo
      case "iniciado":
        return { color: "#3b82f6" }; // azul
      case "procesando":
        return { color: "#0ea5e9" }; // celeste
      case "completado":
        return { color: "#10b981" }; // verde
      case "cancelado":
        return { color: "#ef4444" }; // rojo
      default:
        return { color: "#111" };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Pedidos</Text>

        <View style={styles.tabsContainer}>
          {[
            { key: "activos", label: "Activos" },
            { key: "inactivos", label: "Inactivos" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                selectedTab === tab.key && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab(tab.key as Tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.key && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === "activos" && (
          <View>
            {pedidosActivos.length > 0 ? (
              pedidosActivos.map((pedido) => (
                <PedidoItem key={pedido.id} pedido={pedido} />
              ))
            ) : (
              <Text style={styles.sectionTitle}>No hay servicios activos</Text>
            )}
          </View>
        )}

        {selectedTab === "inactivos" && (
          <View>
            {pedidosInactivos.length > 0 ? (
              pedidosInactivos.map((pedido) => (
                <PedidoItem key={pedido.id} pedido={pedido} />
              ))
            ) : (
              <Text style={styles.sectionTitle}>No hay servicios inactivos</Text>
            )}
          </View>
        )}

      </ScrollView>
    </View>
  );
};

export default MyOrdersScreen;

// ================= STYLES =======================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#ef4444",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  tabButtonActive: {
    backgroundColor: "#ef4444",
  },
  tabText: {
    fontSize: 16,
    color: "#111",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    padding: 16,
  },

  // Cards
  card: {
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ef4444",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  estado: {
    fontWeight: "bold",
  },

  // Sin contenido
  section: {
    padding: 16,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ef4444",
  },
});
