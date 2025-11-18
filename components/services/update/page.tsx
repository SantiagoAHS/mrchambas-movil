"use client";

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

interface Service {
  id: number;
  title: string;
  description: string;
  location: string;
  response_time: string;
  price: string;
  image?: string;
}

export default function ServicesUpdate() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    response_time: "",
    price: "",
  });

  const [file, setFile] = useState<any | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ▶ Traer todos los servicios del usuario
  useEffect(() => {
    async function fetchServices() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw new Error("No autorizado");

        const res = await fetch(
          "https://mibackend-mchambas.onrender.com/api/services/my-services/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Error al cargar los servicios");
        const data: Service[] = await res.json();
        setServices(data);
      } catch (err) {
        setError("No se pudieron cargar los servicios");
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  useEffect(() => {
    async function fetchService() {
      if (!selectedServiceId) return;

      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw new Error("No autorizado");

        const res = await fetch(
          `https://mibackend-mchambas.onrender.com/api/services/${selectedServiceId}/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        if (!res.ok) throw new Error("Error al cargar el servicio");

        const data: Service = await res.json();
        setFormData({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          response_time: data.response_time || "",
          price: data.price || "",
        });
        setImage(data.image ? `https://mibackend-mchambas.onrender.com${data.image}` : null);
        setFile(null); 
      } catch (err) {
        setError("No se pudo cargar el servicio seleccionado");
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [selectedServiceId]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedServiceId) {
      Alert.alert("Error", "Selecciona un servicio primero");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No autorizado");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("response_time", formData.response_time);
      data.append("price", formData.price);

      if (file) {
        data.append("image", { uri: file.uri, type: "image/jpeg", name: "service.jpg" } as any);
      }

      const res = await fetch(
        `https://mibackend-mchambas.onrender.com/api/services/update/${selectedServiceId}/`,
        {
          method: "PUT",
          headers: { Authorization: `Token ${token}` },
          body: data,
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        setError(JSON.stringify(errData));
      } else {
        setSuccess(true);
        Alert.alert("Éxito", "Servicio actualizado correctamente.");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#ef4444" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Servicio</Text>

      {error && <Text style={styles.error}>{error}</Text>}
      {success && <Text style={styles.success}>Servicio actualizado correctamente</Text>}

      <Picker
        selectedValue={selectedServiceId}
        onValueChange={(value) => setSelectedServiceId(value)}
        style={{ marginBottom: 20 }}
      >
        <Picker.Item label="Selecciona un servicio" value={null} />
        {services.map((s) => (
          <Picker.Item key={s.id} label={s.title} value={s.id} />
        ))}
      </Picker>

      {selectedServiceId && (
        <>
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text>Seleccionar imagen</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Título"
            value={formData.title}
            onChangeText={(v) => handleChange("title", v)}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción"
            value={formData.description}
            multiline
            onChangeText={(v) => handleChange("description", v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Ubicación"
            value={formData.location}
            onChangeText={(v) => handleChange("location", v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Tiempo de respuesta"
            value={formData.response_time}
            onChangeText={(v) => handleChange("response_time", v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio"
            value={formData.price}
            onChangeText={(v) => handleChange("price", v)}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit} disabled={saving}>
            <Text style={styles.saveText}>{saving ? "Guardando..." : "Guardar Cambios"}</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", color: "#ef4444", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 15 },
  textArea: { height: 100, textAlignVertical: "top" },
  saveButton: { backgroundColor: "#ef4444", paddingVertical: 14, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  image: { width: "100%", height: 180, borderRadius: 10, marginBottom: 20 },
  imagePlaceholder: { width: "100%", height: 180, borderRadius: 10, backgroundColor: "#e5e7eb", justifyContent: "center", alignItems: "center", marginBottom: 20 },
  error: { color: "red", marginBottom: 15 },
  success: { color: "green", marginBottom: 15 },
});
