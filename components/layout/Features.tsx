import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { MaterialCommunityIcons, Feather, FontAwesome } from "@expo/vector-icons";
import { globalStyles } from "@/app/styles/globalStyles";

const Features: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const features = [
    {
      title: "Alta Calidad",
      description: "Solo ofrecemos servicios de la mejor calidad para nuestros clientes.",
      icon: <MaterialCommunityIcons name="star-circle" size={48} color="#ea580c" />,
    },
    {
      title: "Disponibilidad 24/7",
      description: "Nuestro equipo está siempre disponible para ayudarte cuando nos necesites.",
      icon: <Feather name="clock" size={48} color="#ea580c" />,
    },
    {
      title: "Fácil de Usar",
      description: "Interfaz intuitiva y diseño pensado en la mejor experiencia para el usuario.",
      icon: <FontAwesome name="check-circle" size={48} color="#ea580c" />,
    },
  ];

  return (
    <ScrollView
      style={[
        globalStyles.section,
        { backgroundColor: isLight ? "#f9fafb" : "#3a3a3a" },
      ]}
    >
      <View style={globalStyles.container}>
        {features.map((feature, index) => (
          <View
            key={index}
            style={[
              globalStyles.card,
              {
                backgroundColor: isLight ? "#fff" : "#2a2a2a",
                shadowColor: isLight ? "#000" : "#fff",
              },
            ]}
          >
            <View style={globalStyles.icon}>{feature.icon}</View>
            <Text
              style={[
                globalStyles.title,
                { color: isLight ? "#1f2937" : "#f3f4f6" },
              ]}
            >
              {feature.title}
            </Text>
            <Text
              style={[
                globalStyles.description,
                { color: isLight ? "#4b5563" : "#9ca3af" },
              ]}
            >
              {feature.description}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Features;
