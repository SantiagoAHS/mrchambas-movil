import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { useTheme } from "@/context/ThemeContext";

const missionImg = require("@/assets/images/Mission.png");
const historyImg = require("@/assets/images/Values.png");
const visionImg = require("@/assets/images/Vision.png");

const AboutPage: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const accentColor = "#ff6600";
  const textMuted = isLight ? "#4b5563" : "#cccccc";

  const sections = [
    {
      title: "Nuestra Misión",
      content:
        "Crear oportunidades laborales accesibles para todos, conectando talento con empresas que valoran el crecimiento y la diversidad.",
      image: missionImg,
    },
    {
      title: "Nuestra Historia",
      content:
        "Tres amigos con experiencias frustrantes en la búsqueda de empleo decidieron crear una plataforma diferente.",
      image: historyImg,
    },
    {
      title: "Nuestra Visión",
      content:
        "Ser la comunidad laboral más confiable de Latinoamérica.",
      image: visionImg,
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: isLight ? "#fff" : "#3a3a3a" }}
      contentContainerStyle={{ paddingVertical: 16 }}
    >
      {sections.map((section, i) => (
        <View key={i} style={styles.section}>
          
          <Image source={section.image} style={styles.imageContainer} />

          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: accentColor }]}>
              {section.title}
            </Text>
            <Text style={{ color: textMuted }}>{section.content}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  section: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },

  imageContainer: {
    width: "80%",
    aspectRatio: 1,       // 🔥 Hace que sea cuadrado
    borderRadius: 12,
    marginBottom: 16,
  },

  textContainer: {
    width: "100%",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
