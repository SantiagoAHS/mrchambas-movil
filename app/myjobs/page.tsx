import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

type Tab = "activos" | "inactivos";

const MyJobsScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>("activos");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Trabajos</Text>
        <View style={styles.tabsContainer}>
          {[
            { key: "activos", label: "Activos" },
            { key: "inactivos", label: "Inactivos" }
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
        {selectedTab === "activos" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>No hay servicios activos</Text>
          </View>
        )}

        {selectedTab === "inactivos" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>No hay servicios inactivos</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyJobsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
