import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/services/api";
import { User, Phone, Mail } from "lucide-react-native";

const Perfil = () => {
  const [profile, setProfile] = useState<{
    email: string;
    nombre: string;
    telefono: string;
    avatar: string | null;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile/");
        setProfile(res.data);
      } catch (error) {
        console.log("Error obteniendo perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No se pudo cargar el perfil.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>

      {/* Avatar */}
      {profile.avatar ? (
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarInitial}>
          <Text style={styles.avatarLetter}>
            {profile.nombre ? profile.nombre.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>
      )}

      {/* Información */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <User size={20} color="#c50000" />
          <Text style={styles.text}>{profile.nombre}</Text>
        </View>

        <View style={styles.row}>
          <Mail size={20} color="#666" />
          <Text style={styles.text}>{profile.email}</Text>
        </View>

        <View style={styles.row}>
          <Phone size={20} color="#666" />
          <Text style={styles.text}>{profile.telefono}</Text>
        </View>
      </View>

    </View>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#c50000",
    marginBottom: 20,
  },

  // Avatar rojo con letra
  avatarInitial: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: "#c50000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarLetter: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
  },

  infoContainer: {
    width: "100%",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 18,
  },
  loaderContainer: {
    paddingTop: 40,
    alignItems: "center",
  },
});
