import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Animated,
  Easing,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/services/api";
import { colors } from "@/app/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";

export default function PerfilScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const bgColor = isDark ? colors.darkBg : colors.lightBg;
  const cardBg = "#fff";
  const textColor = isDark ? colors.textLight : colors.textDark;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);

  // ---------- ANIMACIÓN (solo una fuente: slideAnim) ----------
  // slideAnim: -300 (cerrado) -> 0 (abierto)
  const slideAnim = useRef(new Animated.Value(-300)).current;

  // Interpolamos la misma animación para la flecha:
  // cuando slideAnim va de -300 a 0, arrowTranslate irá de 0 a 300
  const arrowTranslate = slideAnim.interpolate({
    inputRange: [-300, 0],
    outputRange: [0, 300],
    extrapolate: "clamp",
  });

  const openMenu = () => {
    setMenuOpen(true); // marca abierto de inmediato (cambia icono)
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setMenuOpen(false);
    });
  };

  const openPage = (path: string) => {
    closeMenu();
    router.push(path);
  };

  // Cargar perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("user/profile/");
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
    router.replace("/login/login");
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: bgColor,
        }}
      >
        <ActivityIndicator size="large" color={colors.red} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      {/* ---------------- FLECHA ANIMADA (centrada verticalmente) ---------------- */}
      <Animated.View
        style={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: [{ translateY: -20 }, { translateX: arrowTranslate }],
          zIndex: 20,
        }}
      >
        <TouchableOpacity onPress={menuOpen ? closeMenu : openMenu}>
          <Ionicons
            name={menuOpen ? "chevron-back" : "chevron-forward"}
            size={38}
            color={textColor}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* ---------------- MENU LATERAL ---------------- */}
      <Modal transparent visible={menuOpen}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            flexDirection: "row",
          }}
        >
          <Animated.View
            style={{
              width: 300,
              height: "100%",
              backgroundColor: cardBg,
              paddingTop: 60,
              paddingHorizontal: 20,
              transform: [{ translateX: slideAnim }],
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 20,
                color: textColor,
              }}
            >
              Menú
            </Text>

            {[
              { label: "Ofertas", path: "/offers/page" },
              { label: "Mis Trabajos", path: "/myjobs/page" },
              { label: "Mis Servicios", path: "/myservices/page" },
              { label: "Mis Pedidos", path: "/myorders/page" },
              { label: "Mis Chats", path: "/chats/page" },
              { label: "Ajustes", path: "/settings/page" },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => openPage(item.path)}
                style={{
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text style={{ color: textColor, fontSize: 18 }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={handleLogout}
              style={{ marginTop: 30, paddingVertical: 14 }}
            >
              <Text style={{ color: colors.red, fontSize: 18 }}>
                Cerrar Sesión
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Cerrar tocando fuera */}
          <TouchableOpacity style={{ flex: 1 }} onPress={closeMenu} />
        </View>
      </Modal>

      {/* ---------------- TARJETA DE PERFIL ---------------- */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 16,
            alignItems: "center",
            marginBottom: 20,
            elevation: 4,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
          }}
        >
          <View
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
              backgroundColor: "#c50000",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 36,
                fontWeight: "bold",
              }}
            >
              {user?.nombre ? user.nombre.charAt(0).toUpperCase() : "U"}
            </Text>
          </View>

          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#111" }}>
            {user?.nombre}
          </Text>

          <Text style={{ fontSize: 16, color: "#555", marginBottom: 8 }}>
            {user?.email}
          </Text>

          {user?.telefono && (
            <Text style={{ fontSize: 14, color: "#444" }}>
              Teléfono: {user.telefono}
            </Text>
          )}

          <View style={{ marginTop: 14 }}>
            <Text
              style={{
                color: "#fff",
                paddingVertical: 6,
                paddingHorizontal: 14,
                borderRadius: 12,
                backgroundColor: user?.is_verified ? "#16a34a" : "#e11d48",
                fontWeight: "bold",
              }}
            >
              {user?.is_verified ? "Cuenta Verificada" : "No Verificada"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
