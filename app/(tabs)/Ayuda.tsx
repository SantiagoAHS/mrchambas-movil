import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import ContactScreen from "@/components/Ayuda/Contact";
import AboutPage from "@/components/Ayuda/About";
import HelpScreen from "@/components/Ayuda/Help"; 

type Tab = "contact" | "about" | "help";

const AyudaScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>("contact");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ayuda</Text>
        <View style={styles.tabsContainer}>
          {["contact", "about", "help"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab(tab as Tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.tabTextActive,
                ]}
              >
                {tab === "contact"
                  ? "Contacto"
                  : tab === "about"
                  ? "Acerca de"
                  : "FAQ"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === "contact" && <ContactScreen />}
        {selectedTab === "about" && <AboutPage />}
        {selectedTab === "help" && <HelpScreen />}
      </ScrollView>
    </View>
  );
};

export default AyudaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#ff6600",
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
    backgroundColor: "#ff6600",
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
});
