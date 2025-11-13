import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useLocalSearchParams } from "expo-router"; // si usas expo-router (en RN reemplaza useParams)

export default function MyOrderDetailPage() {
  const { id } = useLocalSearchParams(); // reemplazo de useParams en RN
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const token = ""; // localStorage no existe en RN (se reemplaza por AsyncStorage si lo usas)
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`https://mibackend-mchambas.onrender.com/api/ventas/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        } else {
          console.error("Error cargando detalle de pedido");
        }
      })
      .catch((err) => console.error("Error de red:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const isDark = theme === "dark";
  const bg = isDark ? "#1f1f1f" : "#ffffff";
  const textColor = isDark ? "#e5e7eb" : "#1f2937";
  const borderColor = isDark ? "#9333ea" : "#16a34a";

  if (loading) {
    return <Text style={[styles.text, { color: textColor }]}>Cargando detalle del pedido...</Text>;
  }

  if (!order) {
    return (
      <Text style={[styles.text, { color: isDark ? "#f87171" : "#dc2626" }]}>
        No se encontró el pedido.
      </Text>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: bg, borderColor }]}
    >
      <Text style={[styles.title, { color: textColor }]}>
        {order.servicio_detalle?.title
          ? `Detalle del Pedido: ${order.servicio_detalle.title}`
          : `Detalle del Pedido #${order.id}`}
      </Text>

      <Text style={[styles.text, { color: textColor }]}>
        <Text style={styles.bold}>Cantidad:</Text> {order.cantidad}
      </Text>
      <Text style={[styles.text, { color: textColor }]}>
        <Text style={styles.bold}>Total:</Text> ${order.total}
      </Text>
      <Text style={[styles.text, { color: textColor }]}>
        <Text style={styles.bold}>Estado:</Text> {order.estado}
      </Text>
      <Text style={[styles.text, { color: textColor }]}>
        <Text style={styles.bold}>Fecha:</Text> {new Date(order.fecha).toLocaleString()}
      </Text>
      <Text style={[styles.text, { color: textColor }]}>
        <Text style={styles.bold}>Dirección:</Text> {order.address}, {order.city}, {order.state},{" "}
        {order.postal_code}
      </Text>
      <Text style={[styles.text, { color: textColor }]}>
        <Text style={styles.bold}>Teléfono:</Text> {order.phone}
      </Text>
      <Text style={[styles.text, { color: textColor }]}>
        <Text style={styles.bold}>Comprador:</Text> {order.comprador}
      </Text>

      {order.estado === "cancelado" && (
        <View
          style={[
            styles.alertBox,
            {
              backgroundColor: isDark ? "#7f1d1d" : "#fee2e2",
              borderLeftColor: "#ef4444",
            },
          ]}
        >
          <Text style={[styles.bold, { color: isDark ? "#fecaca" : "#991b1b" }]}>
            El vendedor canceló el pedido
          </Text>
          <Text style={{ color: isDark ? "#fecaca" : "#991b1b" }}>
            El vendedor no completó el servicio. Tu dinero será reembolsado en un plazo de{" "}
            <Text style={styles.bold}>3 a 5 días hábiles</Text>.
          </Text>
        </View>
      )}

      {order.estado === "completado" && (
        <View
          style={[
            styles.alertBox,
            {
              backgroundColor: isDark ? "#14532d" : "#dcfce7",
              borderLeftColor: "#22c55e",
            },
          ]}
        >
          <Text style={[styles.bold, { color: isDark ? "#bbf7d0" : "#166534" }]}>
            Pedido completado
          </Text>
          <Text style={{ color: isDark ? "#bbf7d0" : "#166534" }}>
            El servicio ha sido finalizado correctamente. El pago ya ha sido liberado al vendedor.
          </Text>
        </View>
      )}

      <View
        style={[
          styles.infoBox,
          {
            backgroundColor: isDark ? "#2a2a2a" : "#fff7ed",
            borderLeftColor: "#f97316",
          },
        ]}
      >
        <Text style={[styles.bold, { color: textColor }]}>Pago protegido</Text>
        <Text style={[styles.text, { color: textColor }]}>
          • Si el vendedor cancela la transacción, tu pago será reembolsado automáticamente.{"\n"}
          • Si el vendedor no responde, tu dinero será regresado.{"\n"}
          • Para soporte, contacta a soporte@mrchambasmx.com.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 600,
    alignSelf: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    marginBottom: 6,
  },
  bold: {
    fontWeight: "bold",
  },
  alertBox: {
    marginTop: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderRadius: 6,
  },
  infoBox: {
    marginTop: 16,
    padding: 12,
    borderLeftWidth: 4,
    borderRadius: 6,
  },
});
