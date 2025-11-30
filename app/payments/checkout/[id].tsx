"use client";

import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useTheme } from "@/context/ThemeContext";
import CheckoutForm from "@/components/payments/CheckoutForm";

export default function CheckoutScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  const [service, setService] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState<any>(null);
  const [loadingService, setLoadingService] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingTarjeta, setLoadingTarjeta] = useState(true);

  const isLight = theme === "light";
  const colors = {
    text: isLight ? "#000" : "#e5e5e5",
    background: isLight ? "#fff" : "#2a2a2a",
    accent: "#E63946",
    secondary: isLight ? "#6b7280" : "#ccc",
  };

  // Traer servicio
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(
          `https://mibackend-mchambas.onrender.com/api/services/${id}/`
        );
        setService(res.data);
      } catch (err) {
        Alert.alert("Error", "No se pudo cargar el servicio.");
      } finally {
        setLoadingService(false);
      }
    };
    if (id) fetchService();
  }, [id]);

  // Traer perfil del usuario
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw new Error("No hay token");

        const res = await fetch(
          "https://mibackend-mchambas.onrender.com/api/user/profile/",
          { headers: { Authorization: `Token ${token}` } }
        );
        if (!res.ok) throw new Error("Error al obtener perfil");

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
        Alert.alert("Error al cargar perfil");
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  // Traer tarjeta por defecto
  useEffect(() => {
    const fetchTarjetaDefault = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          "https://mibackend-mchambas.onrender.com/api/pagos/tarjetas/",
          { headers: { Authorization: `Token ${token}` } }
        );
        if (!res.ok) return;

        const data = await res.json();
        const defaultCard = data.find((t: any) => t.default);
        setTarjetaSeleccionada(defaultCard || null);
      } catch (err) {
        console.error("Error cargando tarjetas:", err);
      } finally {
        setLoadingTarjeta(false);
      }
    };
    fetchTarjetaDefault();
  }, []);

  const handleHire = async (formData: any) => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
        Alert.alert("Debes iniciar sesión para continuar");
        return;
        }

        if (!service) {
        Alert.alert("Servicio no disponible");
        return;
        }

        // Crear venta
        const ventaPayload = {
        servicio: service.id,
        cantidad: 1,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postal_code: formData.postalCode,
        phone: formData.phone,
        };

        const ventaRes = await fetch(
        "https://mibackend-mchambas.onrender.com/api/ventas/",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
            },
            body: JSON.stringify(ventaPayload),
        }
        );

        if (!ventaRes.ok) {
        const err = await ventaRes.json();
        console.error("Error creando venta:", err);
        Alert.alert("Hubo un problema al crear la venta");
        return;
        }

        // Venta creada correctamente
        Alert.alert("Éxito", "Tu pedido se creó correctamente");
        router.push("/Inicio");
    } catch (err: any) {
        console.error(err);
        Alert.alert("Error", "No se pudo completar la compra");
    }
    };

  if (loadingService || loadingProfile || loadingTarjeta) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!service) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: "red" }}>No se encontró el servicio</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Resumen del servicio */}
      <View style={[styles.serviceCard, { borderColor: colors.accent }]}>
        <Text style={[styles.serviceTitle, { color: colors.accent }]}>
          {service.title}
        </Text>
        <Text style={[styles.serviceText, { color: colors.text }]}>
          Proveedor: {service.provider?.nombre || "Desconocido"}
        </Text>
        <Text style={[styles.serviceText, { color: colors.text }]}>
          Ubicación: {service.location || "-"}
        </Text>
        <Text style={[styles.serviceText, { color: colors.text }]}>
          Precio: {service.price || "$0"}
        </Text>
        <Text
          style={[styles.serviceText, { color: colors.text, marginTop: 8 }]}
        >
          {service.description}
        </Text>
      </View>

      {/* Tarjeta por defecto */}
      {tarjetaSeleccionada ? (
        <View
          style={[
            styles.cardBox,
            { backgroundColor: isLight ? "#fef2f2" : "#3a3a3a", marginHorizontal: 16, marginBottom: 16 },
          ]}
        >
          <Text style={[styles.cardText, { color: colors.text }]}>
            Tarjeta por defecto:
          </Text>
          <Text style={[styles.cardText, { color: colors.text }]}>
            {tarjetaSeleccionada.nombre_titular}
          </Text>
          <Text style={[styles.cardText, { color: colors.text }]}>
            {tarjetaSeleccionada.numero_enmascarado} - Exp:{" "}
            {String(tarjetaSeleccionada.exp_mes).padStart(2, "0")}/
            {String(tarjetaSeleccionada.exp_ano).slice(-2)}
          </Text>
        </View>
      ) : (
        <Text style={{ color: colors.accent, marginHorizontal: 16, marginBottom: 16 }}>
          No tienes tarjeta por defecto registrada
        </Text>
      )}

      {/* Formulario */}
      <CheckoutForm
        userName={profile?.nombre || ""} 
        onSubmit={handleHire}
        theme={theme}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  serviceCard: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 16,
    margin: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  serviceText: { fontSize: 16, marginBottom: 4 },
  cardBox: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E63946",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
