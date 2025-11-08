import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme(); // Detecta el tema del sistema (opcional)
  
  const [theme, setTheme] = useState<Theme>(systemScheme === "dark" ? "dark" : "light");

  useEffect(() => {
    // Cargar el tema guardado
    const loadTheme = async () => {
      try {
        const saved = (await AsyncStorage.getItem("theme")) as Theme | null;
        if (saved) setTheme(saved);
      } catch (e) {
        console.warn("Error loading theme:", e);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem("theme", newTheme);
    } catch (e) {
      console.warn("Error saving theme:", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
