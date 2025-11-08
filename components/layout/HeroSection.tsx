import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router"; 
import { heroStyles as styles } from "@/app/styles/globalStyles";

const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const router = useRouter(); 

  const handleStart = () => {
    router.push("/Servicios"); 
  };

  return (
    <LinearGradient
      colors={["#b91c1c", "#ef4444"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: isLight ? "#ffffff" : "#000000" }]}
        >
          Bienvenido a Nuestra Plataforma
        </Text>

        <Text
          style={[
            styles.description,
            { color: isLight ? "#f3f4f6" : "#111827" },
          ]}
        >
          Aquí puedes encontrar las mejores soluciones para tus necesidades.{"\n"}
          Explora y descubre todo lo que tenemos preparado para ti.
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.button,
            {
              backgroundColor: isLight ? "#22c55e" : "#a855f7",
              borderColor: isLight ? "#22c55e" : "#a855f7",
            },
          ]}
          onPress={handleStart} 
        >
          <Text style={styles.buttonText}>Comenzar Ahora</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HeroSection;
