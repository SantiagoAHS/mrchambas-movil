import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/services/api";
import { authStyles, colors } from "@/app/styles/globalStyles";

export default function PerfilScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const bgColor = isDark ? colors.darkBg : colors.lightBg;
  const cardBg = isDark ? colors.cardDark : colors.cardLight;
  const textColor = isDark ? colors.textLight : colors.textDark;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("user/profile/"); // https://mibackend-mchambas.onrender.com/api/user/profile/
        setUser(res.data);
      } catch (err) {
        console.log("Error al cargar perfil:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    router.replace("/login/login");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: bgColor }}>
        <ActivityIndicator size="large" color={colors.red} />
      </View>
    );
  }

  if (!user) {
    // No logeado
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
            style={[authStyles.button, { backgroundColor: "transparent", borderColor: colors.red, borderWidth: 2 }]}
          >
            <Text style={[authStyles.buttonText, { color: colors.red }]}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Usuario logeado
  return (
    <ScrollView contentContainerStyle={[authStyles.scrollContainer, { backgroundColor: bgColor }]}>
      <View style={[authStyles.card, { backgroundColor: cardBg, borderColor: colors.red }]}>
        <Text style={[authStyles.title, { color: textColor, marginBottom: 16 }]}>Mi Perfil</Text>

        {user.avatar && (
          <Image
            source={{ uri: `https://mibackend-mchambas.onrender.com${user.avatar}` }}
            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16 }}
          />
        )}

        <Text style={{ color: textColor, fontSize: 18, marginBottom: 8 }}>Nombre: {user.nombre}</Text>
        <Text style={{ color: textColor, fontSize: 16, marginBottom: 8 }}>Email: {user.email}</Text>
        <Text style={{ color: textColor, fontSize: 16, marginBottom: 16 }}>Teléfono: {user.telefono || "N/A"}</Text>

        {/* Botones adicionales */}
        <View style={{ marginTop: 16 }}>
          <TouchableOpacity
            onPress={() => router.push("/offers/page")}
            style={[authStyles.button, { backgroundColor: colors.red, borderColor: colors.red, marginBottom: 12 }]}
          >
            <Text style={[authStyles.buttonText, { color: "#fff" }]}>Ofertas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/myjobs/page")}
            style={[authStyles.button, { backgroundColor: colors.red, borderColor: colors.red, marginBottom: 12 }]}
          >
            <Text style={[authStyles.buttonText, { color: "#fff" }]}>Mis Trabajos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => alert("Esta sección aún no está disponible")}
            style={[authStyles.button, { backgroundColor: colors.red, borderColor: colors.red, marginBottom: 12 }]}
          >
            <Text style={[authStyles.buttonText, { color: "#fff" }]}>Mis Servicios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/myorders/page")}
            style={[authStyles.button, { backgroundColor: colors.red, borderColor: colors.red, marginBottom: 12 }]}
          >
            <Text style={[authStyles.buttonText, { color: "#fff" }]}>Mis Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/chats/page")}
            style={[authStyles.button, { backgroundColor: colors.red, borderColor: colors.red, marginBottom: 12 }]}
          >
            <Text style={[authStyles.buttonText, { color: "#fff" }]}>Mis Chats</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => alert("Esta sección aún no está disponible")}
            style={[authStyles.button, { backgroundColor: colors.red, borderColor: colors.red, marginBottom: 12 }]}
          >
            <Text style={[authStyles.buttonText, { color: "#fff" }]}>Ajustes</Text>
          </TouchableOpacity>
        </View>

        {/* Cerrar sesión */}
        <TouchableOpacity
          onPress={handleLogout}
          style={[authStyles.button, { backgroundColor: colors.red, borderColor: colors.red, marginTop: 24 }]}
        >
          <Text style={[authStyles.buttonText, { color: "#fff" }]}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
