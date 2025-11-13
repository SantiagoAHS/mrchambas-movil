import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useTheme } from "@/context/ThemeContext";
import { useLocalSearchParams } from "expo-router"; 

interface ServicioDetalle {
  title: string;
  price: number;
  description?: string;
}

interface ContractDetail {
  id: number;
  servicio_detalle: ServicioDetalle;
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

export default function ContractDetailPage() {
  const { id } = useLocalSearchParams();
  const [contract, setContract] = useState<ContractDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");

  const { theme } = useTheme();

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`https://mibackend-mchambas.onrender.com/api/ventas/mis-ventas/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setContract(data);
          setNewStatus(data.estado);
        } else {
          console.error("Error al cargar detalle del contrato");
        }
      })
      .catch((err) => console.error("Error de red:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChangeStatus = async () => {
    if (!contract || newStatus === contract.estado) return;

    const token = localStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "No autorizado");
      return;
    }

    const response = await fetch(
      `https://mibackend-mchambas.onrender.com/api/ventas/mis-ventas/${contract.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ estado: newStatus }),
      }
    );

    if (response.ok) {
      const updatedContract = await response.json();
      setContract(updatedContract);
      Alert.alert("Éxito", "Estado actualizado correctamente");
    } else {
      Alert.alert("Error", "Error al actualizar el estado");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.text}>Cargando detalle del contrato...</Text>
      </View>
    );
  }

  if (!contract) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Contrato no encontrado o no autorizado.</Text>
      </View>
    );
  }

  const isDark = theme === "dark";
  const bg = isDark ? "#1f1f1f" : "#ffffff";
  const text = isDark ? "#ffffff" : "#000000";
  const border = isDark ? "#6b21a8" : "#22c55e";

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>
      <View style={[styles.card, { borderColor: border }]}>
        <Text style={[styles.title, { color: text }]}>
          {contract.servicio_detalle?.title || "Título no disponible"}
        </Text>

        <Text style={[styles.text, { color: text }]}>
          <Text style={styles.bold}>Cliente:</Text> {contract.comprador}
        </Text>

        <Text style={[styles.text, { color: text }]}>
          <Text style={styles.bold}>Fecha:</Text>{" "}
          {new Date(contract.fecha).toLocaleDateString()}
        </Text>

        <View style={styles.row}>
          <Text style={[styles.text, { color: text, marginRight: 8 }]}>
            <Text style={styles.bold}>Estado:</Text>
          </Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={newStatus}
              onValueChange={(itemValue) => setNewStatus(itemValue)}
              style={{ color: text }}
            >
              <Picker.Item label="Pendiente" value="pendiente" />
              <Picker.Item label="Iniciado" value="iniciado" />
              <Picker.Item label="Procesando" value="procesando" />
              <Picker.Item label="Cancelado" value="cancelado" />
              <Picker.Item label="Completado" value="completado" />
            </Picker>
          </View>

          <TouchableOpacity
            onPress={handleChangeStatus}
            style={[
              styles.button,
              { backgroundColor: isDark ? "#9333ea" : "#22c55e" },
            ]}
          >
            <Text style={styles.buttonText}>Cambiar estado</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.text, { color: text }]}>
          <Text style={styles.bold}>Cantidad:</Text> {contract.cantidad}
        </Text>

        <Text style={[styles.text, { color: text }]}>
          <Text style={styles.bold}>Total:</Text> ${contract.total}
        </Text>

        <Text style={[styles.text, { color: text }]}>
          <Text style={styles.bold}>Dirección:</Text> {contract.address},{" "}
          {contract.city}, {contract.state}, {contract.postal_code}
        </Text>

        <Text style={[styles.text, { color: text }]}>
          <Text style={styles.bold}>Teléfono:</Text> {contract.phone}
        </Text>
      </View>

      {/* Reglas de seguridad */}
      <View
        style={[
          styles.rulesBox,
          {
            backgroundColor: isDark ? "#2a2a2a" : "#fff7ed",
            borderLeftColor: "#f97316",
          },
        ]}
      >
        <Text
          style={[
            styles.bold,
            { color: isDark ? "#fff" : "#000", marginBottom: 8 },
          ]}
        >
          Reglas de pago y seguridad
        </Text>
        <Text style={[styles.ruleText, { color: text }]}>
          • El pago se registra pero no se entrega al vendedor hasta que el
          servicio esté completado.
        </Text>
        <Text style={[styles.ruleText, { color: text }]}>
          • Si el vendedor cancela la transacción, el pago será reembolsado
          automáticamente.
        </Text>
        <Text style={[styles.ruleText, { color: text }]}>
          • Si el vendedor no responde en un tiempo razonable, el dinero será
          regresado.
        </Text>
        <Text style={[styles.ruleText, { color: text }]}>
          • Para más información o soporte, contacta a{" "}
          <Text style={styles.bold}>soporte@mrchambasmx.com</Text>.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginRight: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  rulesBox: {
    padding: 16,
    borderLeftWidth: 4,
    borderRadius: 8,
  },
  ruleText: {
    fontSize: 14,
    marginBottom: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
