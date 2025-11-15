import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

interface Props {
  profile: {
    email: string;
    nombre: string;
    telefono: string;
    avatar: string | null;
    curp?: string;
    id_document?: string;
    is_verified?: boolean;
  };
  onUpdate: () => void;
}

const EditProfileFormMobile: React.FC<Props> = ({ profile, onUpdate }) => {
  const [nombre, setNombre] = useState(profile.nombre);
  const [telefono, setTelefono] = useState(profile.telefono);
  const [curp, setCurp] = useState(profile.curp || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No se encontró token");

      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("telefono", telefono);
      if (curp) formData.append("curp", curp);

      const res = await fetch(
        "https://mibackend-mchambas.onrender.com/api/user/profile/update/",
        {
          method: "PUT",
          headers: { Authorization: `Token ${token}` }, // NO Content-Type
          body: formData,
        }
      );

      if (res.ok) {
        alert("Perfil actualizado");
        onUpdate();
      } else {
        alert("Error al actualizar perfil");
      }
    } catch (err) {
      console.error(err);
      alert("Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      {/* Placeholder Avatar */}
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>Avatar</Text>
      </View>

      {/* Nombre */}
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      {/* Teléfono */}
      <Text style={styles.label}>Teléfono</Text>
      <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />

      {/* CURP */}
      <Text style={styles.label}>CURP</Text>
      <TextInput style={styles.input} value={curp} onChangeText={setCurp} />

      {/* Estado de verificación */}
      {profile.is_verified !== undefined && (
        <Text style={[styles.verification, profile.is_verified ? styles.verified : styles.pending]}>
          {profile.is_verified ? "✅ Cuenta verificada" : "⏳ En revisión"}
        </Text>
      )}

      {/* Botón */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Guardar cambios</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileFormMobile;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#ef4444", textAlign: "center" },
  label: { fontSize: 14, marginBottom: 4, color: "#333" },
  input: { borderWidth: 1, borderColor: "#ef4444", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12, color: "#111" },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#f3f3f3", justifyContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 20 },
  avatarText: { color: "#ef4444" },
  verification: { marginBottom: 16, fontWeight: "bold", textAlign: "center" },
  verified: { color: "green" },
  pending: { color: "orange" },
  button: { backgroundColor: "#ef4444", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
