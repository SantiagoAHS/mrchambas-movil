// app/tabs/perfil.tsx
import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { authStyles, colors } from "@/app/styles/globalStyles";

export default function PerfilScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const bgColor = isDark ? colors.darkBg : colors.lightBg;
  const cardBg = isDark ? colors.cardDark : colors.cardLight;
  const textColor = isDark ? colors.textLight : colors.textDark;

  return (
    <ScrollView contentContainerStyle={[authStyles.scrollContainer, { backgroundColor: bgColor }]}>
      <View style={[authStyles.card, { backgroundColor: cardBg, borderColor: colors.red }]}>
        <Text style={[authStyles.title, { color: textColor, marginBottom: 32 }]}>Mi Perfil</Text>

        <TouchableOpacity
          onPress={() => router.push("/login/login")}
          style={[authStyles.button, { backgroundColor: colors.red, borderColor: colors.red, marginBottom: 16 }]}
        >
          <Text style={[authStyles.buttonText, { color: "#fff" }]}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/register/register")}
          style={[
            authStyles.button,
            {
              backgroundColor: "transparent", // sin relleno
              borderColor: colors.red,       // solo borde rojo
              borderWidth: 2,
            }
          ]}
        >
          <Text style={[authStyles.buttonText, { color: colors.red }]}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


