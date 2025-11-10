import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/services/api"; // <-- tu API configurada
import { authStyles, colors } from "@/app/styles/globalStyles";

export default function RegisterScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError("");
    try {
      const res = await api.post("user/register/", {
        nombre: name,
        email,
        password,
      });

      if (res.data.token) {
        await AsyncStorage.setItem("token", res.data.token); // guardar token
      }

      Alert.alert("Éxito", "Registro completado");
      router.push("/(tabs)/Inicio"); // redirigir al perfil
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      setError(err.response?.data?.detail || "Error al registrarse");
    }
  };

  const bgColor = isDark ? colors.darkBg : colors.lightBg;
  const cardBg = isDark ? colors.cardDark : colors.cardLight;
  const textColor = isDark ? colors.textLight : colors.textDark;
  const inputBg = isDark ? colors.inputDark : colors.inputLight;

  return (
    <ScrollView contentContainerStyle={[authStyles.scrollContainer, { backgroundColor: bgColor }]}>
      <View style={[authStyles.card, { backgroundColor: cardBg, borderColor: colors.red }]}>
        <Text style={[authStyles.title, { color: textColor }]}>Crear una cuenta</Text>

        {error ? <Text style={[authStyles.errorText, { color: colors.red }]}>{error}</Text> : null}

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Nombre"
          placeholderTextColor={isDark ? "#888" : "#aaa"}
          style={[authStyles.input, { backgroundColor: inputBg, borderColor: colors.red, color: textColor }]}
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Correo electrónico"
          placeholderTextColor={isDark ? "#888" : "#aaa"}
          keyboardType="email-address"
          style={[authStyles.input, { backgroundColor: inputBg, borderColor: colors.red, color: textColor }]}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor={isDark ? "#888" : "#aaa"}
          secureTextEntry
          style={[authStyles.input, { backgroundColor: inputBg, borderColor: colors.red, color: textColor }]}
        />

        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="••••••••"
          placeholderTextColor={isDark ? "#888" : "#aaa"}
          secureTextEntry
          style={[authStyles.input, { backgroundColor: inputBg, borderColor: colors.red, color: textColor, marginBottom: 24 }]}
        />

        <TouchableOpacity
          onPress={handleRegister}
          style={[authStyles.button, { backgroundColor: colors.red, borderColor: colors.red }]}
        >
          <Text style={[authStyles.buttonText, { color: "#fff" }]}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login/login")}>
          <Text style={[authStyles.linkText, { color: colors.red }]}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// register/register.tsx
export const screenOptions = {
  headerShown: false,
};
