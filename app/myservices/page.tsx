import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import UserServices from "@/components/myservices/page"; 
import ServicesCreate from "@/components/services/create/page"; 
import ServicesUpdate from "@/components/services/update/page"; 

type Tab = "activos" | "crear" | "editar";

const MyOrdersScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>("activos");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Servicios</Text>
        <View style={styles.tabsContainer}>
          {[
            { key: "activos", label: "Activos" },
            { key: "crear", label: "Crear" },
            { key: "editar", label: "Editar" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                selectedTab === tab.key && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab(tab.key as Tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.key && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Lista de servicios */}
        {selectedTab === "activos" && (
          <UserServices />
        )}

        {/* Crear servicio */}
        {selectedTab === "crear" && (
          <View style={{ paddingBottom: 50 }}>
            <ServicesCreate /> 
          </View>
        )}

        {/* Editar servicio */}
        {selectedTab === "editar" && (
          <View style={{ paddingBottom: 50 }}>
            <ServicesUpdate /> 
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { paddingTop: 50, paddingHorizontal: 16, paddingBottom: 16, backgroundColor: "#ef4444", alignItems: "center" },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 12 },
  tabsContainer: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 8, overflow: "hidden" },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: "center", backgroundColor: "#f3f4f6" },
  tabButtonActive: { backgroundColor: "#ef4444" },
  tabText: { fontSize: 16, color: "#111" },
  tabTextActive: { color: "#fff", fontWeight: "bold" },
  content: { flex: 1, padding: 16 },
});
