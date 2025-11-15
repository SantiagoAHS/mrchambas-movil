import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqs = [
  {
    question: "¿Cómo puedo crear una cuenta?",
    answer:
      "Para crear una cuenta, haz clic en el botón de registro y sigue los pasos indicados con tu correo electrónico.",
  },
  {
    question: "¿Olvidé mi contraseña, qué hago?",
    answer:
      'En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?" para recibir un enlace de recuperación vía correo electrónico.',
  },
  {
    question: "¿Dónde puedo contactar soporte técnico?",
    answer:
      'Puedes enviar un correo a soporte@mi-proyecto.com o usar el formulario de contacto en la sección "Contacto".',
  },
];

export default function HelpScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const toggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(openIndex === index ? null : index);
  };

  const accentColor = "#ff6600";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isLight ? "#fff" : "#3a3a3a" }]}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text style={[styles.title, { color: accentColor }]}>
        Centro de Ayuda de MiProyecto
      </Text>
      <Text style={[styles.subtitle, { color: isLight ? "#000" : "#ddd" }]}>
        Aquí encontrarás respuestas a las preguntas más comunes. Si necesitas más ayuda, no dudes en contactarnos.
      </Text>

      {faqs.map((faq, index) => (
        <View
          key={index}
          style={[
            styles.faqCard,
            {
              backgroundColor: isLight ? "#f3f4f6" : "#444",
              borderColor: isLight ? "#ccc" : "#666",
            },
          ]}
        >
          <TouchableOpacity onPress={() => toggle(index)} style={styles.faqHeader}>
            <Text style={[styles.faqQuestion, { color: isLight ? "#111" : "#eee" }]}>
              {faq.question}
            </Text>
            <Text style={[styles.faqArrow, { color: isLight ? "#555" : "#ccc" }]}>
              {openIndex === index ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>
          {openIndex === index && (
            <View style={styles.faqContent}>
              <Text style={[styles.faqAnswer, { color: isLight ? "#000" : "#ddd" }]}>
                {faq.answer}
              </Text>
            </View>
          )}
        </View>
      ))}

      <View style={styles.contactContainer}>
        <Text style={[styles.contactText, { color: isLight ? "#000" : "#ddd" }]}>
          ¿No encontraste lo que buscas?
        </Text>
        <TouchableOpacity
          style={[styles.contactButton, { backgroundColor: accentColor }]}
          onPress={() => Linking.openURL("mailto:soporte@mi-proyecto.com")}
        >
          <Text style={styles.contactButtonText}>Contactar Soporte</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 12 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  faqCard: { borderWidth: 1, borderRadius: 8, marginBottom: 12, overflow: "hidden" },
  faqHeader: { flexDirection: "row", justifyContent: "space-between", padding: 12 },
  faqQuestion: { fontSize: 16, fontWeight: "500" },
  faqArrow: { fontSize: 16 },
  faqContent: { paddingHorizontal: 12, paddingBottom: 12 },
  faqAnswer: { fontSize: 14 },
  contactContainer: { marginTop: 24, alignItems: "center" },
  contactText: { marginBottom: 12, fontSize: 16 },
  contactButton: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  contactButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
