import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ServicioDetalle {
  title: string;
  price: number;
}

interface Pedido {
  id: number;
  servicio_detalle: ServicioDetalle | null;
  fecha: string;
  estado: string;
  comprador: string;
  cantidad: number;
  total: number;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
}

export default function MyOrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [order, setOrder] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://mibackend-mchambas.onrender.com/api/ventas/${id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        } else {
          console.log("Error cargando pedido");
        }
      } catch (err) {
        console.error("Error de red:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ef4444" />
        <Text style={{ marginTop: 10 }}>Cargando pedido...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18, color: "#ef4444" }}>
          Pedido no encontrado
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {order.servicio_detalle?.title
          ? order.servicio_detalle.title
          : `Pedido #${order.id}`}
      </Text>

      <View style={styles.card}>
        <Text style={styles.item}>
          <Text style={styles.label}>Cliente:</Text> {order.comprador}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Fecha:</Text>{" "}
          {new Date(order.fecha).toLocaleString()}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Estado:</Text> {order.estado}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Cantidad:</Text> {order.cantidad}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Total:</Text> ${order.total}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Dirección:</Text>{" "}
          {order.address}, {order.city}, {order.state} {order.postal_code}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Teléfono:</Text> {order.phone}
        </Text>
      </View>

      {/* ESTADOS ESPECIALES */}
      {order.estado === "cancelado" && (
        <View style={styles.cancelBox}>
          <Text style={styles.cancelTitle}>El vendedor canceló el pedido</Text>
          <Text style={styles.cancelText}>
            Tu dinero será reembolsado en{" "}
            <Text style={{ fontWeight: "bold" }}>3 a 5 días hábiles.</Text>
          </Text>
        </View>
      )}

      {order.estado === "completado" && (
        <View style={styles.completeBox}>
          <Text style={styles.completeTitle}>Pedido completado</Text>
          <Text style={styles.completeText}>
            El servicio se finalizó correctamente. El pago ya fue liberado al
            vendedor.
          </Text>
        </View>
      )}

      {/* PAGO PROTEGIDO */}
      <View style={styles.rules}>
        <Text style={styles.rulesTitle}>Pago protegido</Text>
        <Text style={styles.ruleItem}>
          • Si el vendedor cancela, tu pago se reembolsa automáticamente.
        </Text>
        <Text style={styles.ruleItem}>
          • Si no responde, tu dinero regresa a tu cuenta.
        </Text>
        <Text style={styles.ruleItem}>
          • El pago se libera solo cuando el servicio se completa.
        </Text>
        <Text style={styles.ruleItem}>
          • Soporte: soporte@mrchambasmx.com
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ef4444",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
  },

  item: { fontSize: 17, marginBottom: 8, color: "#333" },
  label: { fontWeight: "bold" },

  cancelBox: {
    padding: 16,
    backgroundColor: "#ffe5e5",
    borderLeftColor: "#ef4444",
    borderLeftWidth: 4,
    borderRadius: 12,
    marginBottom: 20,
  },
  cancelTitle: { fontWeight: "bold", color: "#b91c1c", fontSize: 18 },
  cancelText: { marginTop: 6, fontSize: 15, color: "#7f1d1d" },

  completeBox: {
    padding: 16,
    backgroundColor: "#e7f9ed",
    borderLeftWidth: 4,
    borderLeftColor: "#22c55e",
    borderRadius: 12,
    marginBottom: 20,
  },
  completeTitle: { fontWeight: "bold", fontSize: 18, color: "#166534" },
  completeText: { marginTop: 6, fontSize: 15, color: "#14532d" },

  rules: {
    padding: 16,
    backgroundColor: "#fff4e6",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ffa94d",
    marginBottom: 30,
  },
  rulesTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 10 },
  ruleItem: { fontSize: 15, marginBottom: 4 },
});
