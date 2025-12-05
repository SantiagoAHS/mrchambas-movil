// app/myservices/[id].tsx
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ServiceDetail() {
  const { id } = useLocalSearchParams();
  const servicioId = Number(id);

  const [servicio, setServicio] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("pendiente");

  useEffect(() => {
    // Simulación de un backend
    const mock = [
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
    ];

    const encontrado = mock.find((s) => s.id === servicioId);
    if (encontrado) {
      setServicio(encontrado);
      setNewStatus(encontrado.estado);
    } else {
      setServicio(null);
    }
  }, []);

  const cambiarEstado = () => {
    if (!servicio) return;

    if (newStatus === servicio.estado) {
      return Alert.alert("Sin cambios", "Seleccionaste el mismo estado.");
    }

    Alert.alert(
      "Confirmar cambio",
      `¿Deseas cambiar el estado a "${newStatus}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Aceptar",
          onPress: () =>
            setServicio({
              ...servicio,
              estado: newStatus,
            }),
        },
      ]
    );
  };

  if (!servicio) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* TÍTULO */}
      <Text style={styles.title}>{servicio.servicio_detalle.title}</Text>

      {/* INFO DEL SERVICIO */}
      <Text style={styles.text}>Cliente: {servicio.cliente}</Text>
      <Text style={styles.text}>
        Fecha: {new Date(servicio.fecha).toLocaleDateString()}
      </Text>
      <Text style={styles.text}>Cantidad: {servicio.cantidad}</Text>
      <Text style={styles.text}>Total: ${servicio.total}</Text>

      {/* ESTADO + SELECTOR + BOTÓN */}
      <View style={styles.estadoRow}>
        <Text style={styles.bold}>Estado:</Text>

        <Picker
          selectedValue={newStatus}
          onValueChange={(value) => setNewStatus(value)}
          style={styles.picker}
        >
          <Picker.Item label="Pendiente" value="pendiente" />
          <Picker.Item label="Iniciado" value="iniciado" />
          <Picker.Item label="Procesando" value="procesando" />
          <Picker.Item label="Cancelado" value="cancelado" />
          <Picker.Item label="Completado" value="completado" />
        </Picker>

        <TouchableOpacity style={styles.statusBtn} onPress={cambiarEstado}>
          <Text style={styles.statusBtnText}>Cambiar</Text>
        </TouchableOpacity>
      </View>

      {/* REGLAS / ADVERTENCIAS */}
      <View style={styles.rulesBox}>
        <Text style={styles.rulesTitle}>Reglas de pago y seguridad</Text>

        <Text style={styles.rule}>
          • El pago se registra pero no se entrega al vendedor hasta que el servicio esté completado.
        </Text>
        <Text style={styles.rule}>
          • Si el vendedor cancela la transacción, el pago será reembolsado automáticamente.
        </Text>
        <Text style={styles.rule}>
          • Si el vendedor no responde en un tiempo razonable, el dinero será regresado.
        </Text>
        <Text style={styles.rule}>
          • Soporte: soporte@mrchambasmx.com
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ef4444",
    marginBottom: 10,
  },
  text: { fontSize: 16, marginVertical: 4 },
  bold: { fontWeight: "bold" },

  // ESTADO con selector y botón
  estadoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  picker: {
    width: 150,
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
  },
  statusBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  statusBtnText: { color: "#fff", fontWeight: "bold" },

  // REGLAS
  rulesBox: {
    backgroundColor: "#FFF4D6",
    padding: 16,
    marginTop: 30,
    borderRadius: 10,
  },
  rulesTitle: { fontWeight: "bold", marginBottom: 6, fontSize: 16 },
  rule: { fontSize: 14, marginVertical: 2 },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
