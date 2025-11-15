import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";

const AboutPage: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const accentColor = "#ff6600";
  const bgCard = isLight ? "#f3f4f6" : "#2d2d2d";
  const textMuted = isLight ? "#4b5563" : "#cccccc";
  const borderColor = isLight ? "#e5e7eb" : "#444";

  const sections = [
    {
      title: "Nuestra Misión",
      content:
        "Crear oportunidades laborales accesibles para todos, conectando talento con empresas que valoran el crecimiento y la diversidad. En MChambas, creemos en un futuro laboral más justo e inclusivo.",
      image: "Animación / Imagen de Misión",
    },
    {
      title: "Nuestra Historia",
      content:
        "Tres amigos con experiencias frustrantes en la búsqueda de empleo decidieron crear una plataforma diferente: sin barreras, sin filtros injustos, con tecnología al servicio del talento. Así nació MChambas.",
      image: "Animación / Imagen de Historia",
    },
    {
      title: "Nuestra Visión",
      content:
        "Ser la comunidad laboral más confiable de Latinoamérica. Aspiramos a un mundo donde cada persona tenga acceso a un trabajo digno que reconozca su valor y potencial.",
      image: "Animación / Imagen de Visión",
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: isLight ? "#fff" : "#3a3a3a" }}
      contentContainerStyle={{ paddingVertical: 16 }}
    >
      {sections.map((section, i) => (
        <View key={i} style={styles.section}>
          {/* Imagen */}
          <View
            style={[
              styles.imageContainer,
              { backgroundColor: bgCard, borderColor: borderColor },
            ]}
          >
            <Text style={{ color: textMuted }}>{section.image}</Text>
          </View>

          {/* Texto */}
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
    width: "100%",
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
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
