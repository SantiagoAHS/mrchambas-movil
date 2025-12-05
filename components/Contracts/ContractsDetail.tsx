import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

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

export default function PedidoItem({ pedido }: { pedido: Pedido }) {
  const router = useRouter();

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "#f59e0b";
      case "iniciado":
        return "#3b82f6";
      case "procesando":
        return "#0ea5e9";
      case "completado":
        return "#10b981";
      case "cancelado":
        return "#ef4444";
      default:
        return "#111";
    }
  };

  return (
    <TouchableOpacity
  style={styles.card}
  onPress={() =>
    router.push({
      pathname: "/myorders/[id]",
      params: { id: pedido.id.toString() },
    })
  }
>

      <View style={styles.row}>
        <Text style={styles.title}>{pedido.servicio_detalle.title}</Text>
        <Text style={[styles.estado, { color: getEstadoColor(pedido.estado) }]}>
          {pedido.estado}
        </Text>
      </View>

      <Text style={styles.info}>
        Vendedor: <Text style={styles.bold}>{pedido.comprador}</Text>
      </Text>

      <Text style={styles.info}>
        Fecha: {new Date(pedido.fecha).toLocaleDateString()}
      </Text>

      <Text style={styles.info}>
        Total: <Text style={styles.bold}>${pedido.total}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
  estado: {
    fontSize: 15,
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
});
