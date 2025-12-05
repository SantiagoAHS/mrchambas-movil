import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

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

export default function MyOrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [order, setOrder] = useState<Pedido | null>(null);

  useEffect(() => {
    // Aquí iría tu fetch real
    const mockPedidos: Pedido[] = [
      {
        id: 1,
        servicio_detalle: { title: "Electricista", price: 450 },
        fecha: "2025-12-01",
        estado: "completado",
        comprador: "Ana López",
        cantidad: 1,
        total: 450,
      },
      {
        id: 2,
        servicio_detalle: { title: "Plomería", price: 600 },
        fecha: "2025-11-20",
        estado: "pendiente",
        comprador: "Luis Torres",
        cantidad: 1,
        total: 600,
      },
    ];

    const found = mockPedidos.find((p) => p.id === Number(id));
    setOrder(found || null);
  }, [id]);

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18 }}>Pedido no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>{order.servicio_detalle.title}</Text>

      <View style={styles.card}>
        <Text style={styles.item}>
          <Text style={styles.label}>Cliente:</Text> {order.comprador}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Fecha:</Text>{" "}
          {new Date(order.fecha).toLocaleDateString()}
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
      </View>

      {/* Advertencias del sistema */}
      <View style={styles.rules}>
        <Text style={styles.rulesTitle}>Pago protegido</Text>
        <Text style={styles.ruleItem}>• Si el vendedor cancela, te reembolsamos automáticamente.</Text>
        <Text style={styles.ruleItem}>• Si el vendedor no responde, tu pago regresa a tu cuenta.</Text>
        <Text style={styles.ruleItem}>• Tu dinero es retenido hasta que el servicio se complete.</Text>
        <Text style={styles.ruleItem}>• Contacto soporte: soporte@mrchambasmx.com</Text>
      </View>
    </ScrollView>
  );
}

// ===================== ESTILOS ===================== //

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

  item: { fontSize: 18, marginBottom: 8, color: "#333" },
  label: { fontWeight: "bold" },

  rules: {
    padding: 16,
    backgroundColor: "#fff4e6",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ffa94d",
  },

  rulesTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 10 },
  ruleItem: { fontSize: 15, marginBottom: 4 },
});
