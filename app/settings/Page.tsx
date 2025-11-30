import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Perfil from "@/components/settings/perfil"; 
import EditProfileFormMobile from "@/components/settings/editperfil";

type Tab = "perfil" | "config";

interface ProfileType {
  nombre: string;
  email: string;
  telefono: string;
  avatar: string | null;
  curp?: string;
  id_document?: string;
  is_verified?: boolean;
}

const SettingsScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>("perfil");
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Traer datos del usuario real
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

  const handleUpdate = (updatedProfile?: ProfileType) => {
    if (updatedProfile) setProfile(updatedProfile);
  };

  if (loadingProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ef4444" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ajustes</Text>
        <View style={styles.tabsContainer}>
          {[
            { key: "perfil", label: "Perfil" },
            { key: "config", label: "Configuración" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, selectedTab === tab.key && styles.tabButtonActive]}
              onPress={() => setSelectedTab(tab.key as Tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab.key && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === "perfil" && <Perfil />}
        {selectedTab === "config" && profile && (
          <EditProfileFormMobile profile={profile} onUpdate={handleUpdate} />
        )}
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#ef4444", // rojo
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  tabButtonActive: {
    backgroundColor: "#ef4444", // rojo activo
  },
  tabText: {
    fontSize: 16,
    color: "#111",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ef4444",
  },
});


