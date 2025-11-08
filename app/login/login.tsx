import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";

export default function LoginScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    Alert.alert("Simulación", "Inicio de sesión correcto");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: isDark ? "#1f1f1f" : "#fff",
      }}
    >
      <View
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 24,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: "#ef4444", // red-500
          backgroundColor: isDark ? "#2a2a2a" : "#fff",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            color: isDark ? "#fff" : "#000",
            marginBottom: 24,
          }}
        >
          Iniciar Sesión
        </Text>

        <Text style={{ color: isDark ? "#ccc" : "#555", marginBottom: 6 }}>Correo electrónico</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="ejemplo@correo.com"
          placeholderTextColor={isDark ? "#888" : "#aaa"}
          style={{
            borderWidth: 2,
            borderColor: "#ef4444", // red-500
            borderRadius: 12,
            padding: 12,
            marginBottom: 16,
            color: isDark ? "#fff" : "#000",
            backgroundColor: isDark ? "#3a3a3a" : "#fff",
          }}
        />

        <Text style={{ color: isDark ? "#ccc" : "#555", marginBottom: 6 }}>Contraseña</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor={isDark ? "#888" : "#aaa"}
          secureTextEntry
          style={{
            borderWidth: 2,
            borderColor: "#ef4444", // red-500
            borderRadius: 12,
            padding: 12,
            marginBottom: 24,
            color: isDark ? "#fff" : "#000",
            backgroundColor: isDark ? "#3a3a3a" : "#fff",
          }}
        />

        {error ? <Text style={{ color: "#ef4444", marginBottom: 12, textAlign: "center" }}>{error}</Text> : null}

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#ef4444", // red-500
            padding: 14,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#ef4444",
            marginBottom: 16,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center", fontSize: 16 }}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => router.push("/register/register")}
        >
          <Text style={{ color: "#ef4444", textAlign: "center", fontWeight: "600" }}>
            ¿No tienes cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
