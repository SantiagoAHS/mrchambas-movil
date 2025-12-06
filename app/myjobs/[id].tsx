import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ServiceDetail() {
  const { id } = useLocalSearchParams();
  const ventaId = Number(id);

  const [contract, setContract] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const [successModal, setSuccessModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  // ============================
  // GET DETALLE DE LA VENTA
  // ============================
  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        setLoading(true);

        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Error", "No hay token guardado.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `https://mibackend-mchambas.onrender.com/api/ventas/mis-ventas/${ventaId}/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setContract(data);
          setNewStatus(data.estado ?? "");
        } else {
          Alert.alert("Error", "No se pudo cargar la venta.");
        }
      } catch (err) {
        Alert.alert("Error", "Problema de conexión.");
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(ventaId)) cargarDetalle();
  }, [ventaId]);

  // ============================
  // PUT CAMBIAR ESTADO
  // ============================
  const ejecutarCambioEstado = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

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
        const updated = await response.json();
        setContract(updated);

        setSuccessModal(true);
        setTimeout(() => setSuccessModal(false), 1500);
      } else {
        const errData = await response.json().catch(() => null);
        Alert.alert("Error", errData?.detail ?? "No se pudo actualizar el estado.");
      }
    } catch (error) {
      Alert.alert("Error", "Problema de conexión.");
    }
  };

  const cambiarEstado = () => {
    if (newStatus === contract.estado) {
      return Alert.alert("Sin cambios", "Seleccionaste el mismo estado.");
    }

    setConfirmModal(true);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando detalle del contrato...</Text>
      </View>
    );
  }

  if (!contract) {
    return (
      <View style={styles.center}>
        <Text>No existe la venta solicitada.</Text>
      </View>
    );
  }

  return (
    <>
      {/* Modal de éxito */}
      <Modal transparent visible={successModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Estado actualizado</Text>
          </View>
        </View>
      </Modal>

      {/* Modal confirmar */}
      <Modal transparent visible={confirmModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmTitle}>Confirmar cambio</Text>
            <Text style={{ marginBottom: 15, textAlign: "center" }}>
              ¿Deseas cambiar el estado a "{newStatus}"?
            </Text>

            <View style={styles.confirmBtns}>
              <TouchableOpacity
                style={[styles.confirmBtn, { backgroundColor: "#ccc" }]}
                onPress={() => setConfirmModal(false)}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmBtn, { backgroundColor: "#ef4444" }]}
                onPress={() => {
                  setConfirmModal(false);
                  ejecutarCambioEstado();
                }}
              >
                <Text style={{ color: "white" }}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* CONTENIDO */}
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          {contract.servicio_detalle?.title || "Título no disponible"}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.bold}>Descripción: </Text>
          {contract.servicio_detalle?.description || "Sin descripción"}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.bold}>Cliente: </Text>
          {contract.comprador}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.bold}>Fecha: </Text>
          {new Date(contract.fecha).toLocaleDateString()}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.bold}>Cantidad: </Text>
          {contract.cantidad}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.bold}>Total: </Text>${contract.total}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.bold}>Dirección: </Text>
          {contract.address}, {contract.city}, {contract.state} {contract.postal_code}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.bold}>Teléfono: </Text>
          {contract.phone}
        </Text>

        {/* ESTADO */}
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

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#ef4444" }}>
            Reglas de pago y seguridad
          </Text>

          <View style={{ paddingLeft: 15 }}>
            <Text style={{ marginBottom: 5 }}>• El pago se libera solo cuando el servicio se completa.</Text>
            <Text style={{ marginBottom: 5 }}>• Si el vendedor cancela, se realiza reembolso automático.</Text>
            <Text style={{ marginBottom: 5 }}>• Si no responde, el dinero regresa al comprador.</Text>

            <Text style={{ marginBottom: 5 }}>
              • Para soporte, escribe a{" "}
              <Text style={{ fontWeight: "bold", color: "#ef4444" }}>soporte@mrchambasmx.com</Text>.
            </Text>
          </View>
        </View>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#ef4444" },
  text: { fontSize: 16, marginVertical: 4 },
  bold: { fontWeight: "bold" },

  estadoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  picker: { width: 160, backgroundColor: "#eee" },
  statusBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  statusBtnText: { color: "#fff", fontWeight: "bold" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    minWidth: 160,
  },
  modalTitle: { color: "#22c55e", fontSize: 18, fontWeight: "bold" },

  confirmBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: 260,
  },
  confirmTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  confirmBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  confirmBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});
