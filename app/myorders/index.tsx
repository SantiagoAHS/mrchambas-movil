// app/myorders/index.tsx
import PedidoItem from "@/components/Contracts/ContractsDetail";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

type Tab = "activos" | "inactivos";

interface ServicioDetalle {
  title: string;
  price: number;
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
  const [loading, setLoading] = useState(true);

  // ================================
  // 🚀 Llamar API real (ya igual que en web)
  // ================================
  const cargarPedidos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch(
        "https://mibackend-mchambas.onrender.com/api/ventas/mis-pedidos/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.error("Error cargando pedidos");
        setLoading(false);
        return;
      }

      const data = await res.json();

      // Separar activos e inactivos
      setPedidosActivos(
        data.filter(
          (p: Pedido) => p.estado !== "completado" && p.estado !== "cancelado"
        )
      );

      setPedidosInactivos(
        data.filter(
          (p: Pedido) => p.estado === "completado" || p.estado === "cancelado"
        )
      );

      setLoading(false);
    } catch (err) {
      console.error("Error de red:", err);
      setLoading(false);
    }
  };

  // ================================
  // 🔄 Cargar al entrar a la pantalla
  // ================================
  useFocusEffect(
    useCallback(() => {
      cargarPedidos();
    }, [])
  );

  // ================================
  // 🎨 Render Estado
  // ================================
  const getEstadoStyle = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return { color: "#f59e0b" };
      case "iniciado":
        return { color: "#3b82f6" };
      case "procesando":
        return { color: "#0ea5e9" };
      case "completado":
        return { color: "#10b981" };
      case "cancelado":
        return { color: "#ef4444" };
      default:
        return { color: "#111" };
    }
  };

  if (loading) {
    return (
      <View style={{ paddingTop: 80 }}>
        <Text style={{ textAlign: "center" }}>Cargando pedidos...</Text>
      </View>
    );
  }

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
              <Text style={styles.sectionTitle}>No hay pedidos activos</Text>
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
              <Text style={styles.sectionTitle}>
                No hay pedidos inactivos
              </Text>
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

  sectionTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#ef4444",
    marginTop: 20,
  },
});
