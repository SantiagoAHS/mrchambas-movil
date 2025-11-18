"use client";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useTheme } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ServicesCreate() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [formData, setFormData] = useState({
    title: "",
    verified: false,
    description: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalcode: "",
    response_time: "",
    price: "",
  });

  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFilePick() {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["image/*"],
    });

    if (res.assets && res.assets.length > 0) {
      setFile(res.assets[0]);
    }
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = await AsyncStorage.getItem("token");

    if (!token) {
      setError("No autorizado. Inicia sesión.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("verified", String(formData.verified));
    data.append("description", formData.description);
    data.append("street", formData.street);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("country", formData.country);
    data.append("postalcode", formData.postalcode);
    data.append("response_time", formData.response_time);
    data.append("price", formData.price);

    if (file) {
      data.append("image", {
        uri: file.uri,
        name: file.name || "image.jpg",
        type: file.mimeType || "image/jpeg",
      } as any);
    }

    try {
      const res = await fetch("https://mibackend-mchambas.onrender.com/api/services/create/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        setError(JSON.stringify(err));
      } else {
        setSuccess(true);
        setFormData({
          title: "",
          verified: false,
          description: "",
          street: "",
          city: "",
          state: "",
          country: "",
          postalcode: "",
          response_time: "",
          price: "",
        });
        setFile(null);
      }
    } catch {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={[styles.container, isLight ? styles.light : styles.dark]}>
        <Text style={styles.title}>Nuevo Servicio</Text>
        <Text style={[styles.alert, isLight ? styles.alertLight : styles.alertDark]}>
          ⚠️ Asegúrate de que tu cuenta esté verificada antes de crear un servicio.
        </Text>
        {error && <Text style={styles.error}>{error}</Text>}
        {success && <Text style={styles.success}>Servicio creado con éxito</Text>}

        <TextInput
          placeholder="Título"
          value={formData.title}
          onChangeText={(v) => handleChange("title", v)}
          style={[styles.input, isLight ? styles.inputLight : styles.inputDark]}
        />

        <TouchableOpacity onPress={handleFilePick} style={styles.fileBtn}>
          <Text style={styles.fileBtnText}>
            {file ? "Imagen seleccionada" : "Seleccionar imagen"}
          </Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Descripción"
          value={formData.description}
          onChangeText={(v) => handleChange("description", v)}
          style={[styles.textarea, isLight ? styles.inputLight : styles.inputDark]}
          multiline
        />

        <TextInput
          placeholder="Calle y número"
          value={formData.street}
          onChangeText={(v) => handleChange("street", v)}
          style={[styles.input, isLight ? styles.inputLight : styles.inputDark]}
        />

        <TextInput
          placeholder="Ciudad"
          value={formData.city}
          onChangeText={(v) => handleChange("city", v)}
          style={[styles.input, isLight ? styles.inputLight : styles.inputDark]}
        />

        <TextInput
          placeholder="Estado"
          value={formData.state}
          onChangeText={(v) => handleChange("state", v)}
          style={[styles.input, isLight ? styles.inputLight : styles.inputDark]}
        />

        <TextInput
          placeholder="País"
          value={formData.country}
          onChangeText={(v) => handleChange("country", v)}
          style={[styles.input, isLight ? styles.inputLight : styles.inputDark]}
        />

        <TextInput
          placeholder="Código Postal"
          value={formData.postalcode}
          onChangeText={(v) => handleChange("postalcode", v)}
          style={[styles.input, isLight ? styles.inputLight : styles.inputDark]}
        />

        <TextInput
          placeholder="Tiempo de respuesta"
          value={formData.response_time}
          onChangeText={(v) => handleChange("response_time", v)}
          style={[styles.input, isLight ? styles.inputLight : styles.inputDark]}
        />

        <TextInput
          placeholder="Precio"
          value={formData.price}
          onChangeText={(v) => handleChange("price", v)}
          style={[styles.input, isLight ? styles.inputLight : styles.inputDark]}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Crear Servicio</Text>
          )}
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 16,
  },
  container: {
    padding: 16,
    borderRadius: 10,
  },
  light: {
    backgroundColor: "#fff",
  },
  dark: {
    backgroundColor: "#3a3a3a",
  },
  title: {
    fontSize: 22,
    color: "#ef4444",
    fontWeight: "bold",
    marginBottom: 12,
  },
  alert: {
    padding: 10,
    borderLeftWidth: 4,
    borderColor: "#ef4444",
    marginBottom: 16,
    borderRadius: 6,
  },
  alertLight: {
    backgroundColor: "rgba(239,68,68,0.2)",
    color: "#ef4444",
  },
  alertDark: {
    backgroundColor: "rgba(239,68,68,0.4)",
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  inputLight: {
    backgroundColor: "#fff",
    color: "#ef4444",
  },
  inputDark: {
    backgroundColor: "#333",
    color: "#ef4444",
  },
  textarea: {
    height: 100,
  },
  fileBtn: {
    padding: 10,
    backgroundColor: "#ef4444",
    borderRadius: 6,
    marginBottom: 12,
  },
  fileBtnText: {
    color: "#fff",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  success: {
    color: "green",
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
