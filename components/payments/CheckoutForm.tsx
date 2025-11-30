import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

interface CheckoutData {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

interface CheckoutFormProps {
  userName: string;
  onSubmit: (data: CheckoutData) => void;
  theme?: "light" | "dark";
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ userName, onSubmit, theme = "light" }) => {
  const [formData, setFormData] = useState<CheckoutData>({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const isDark = theme === "dark";

  const handleChange = (field: keyof CheckoutData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validaciones simples
    if (
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode ||
      !formData.phone
    ) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}
      >
        {/* Nombre */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDark && styles.darkText]}>Nombre:</Text>
          <TextInput
            style={[styles.input, styles.disabledInput, isDark ? styles.darkInput : styles.lightInput]}
            value={userName}
            editable={false}
          />
        </View>

        {/* Dirección */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDark && styles.darkText]}>Dirección</Text>
          <TextInput
            style={[styles.input, isDark ? styles.darkInput : styles.lightInput]}
            placeholder="Calle y número"
            placeholderTextColor={isDark ? "#aaa" : "#888"}
            value={formData.address}
            onChangeText={(value) => handleChange("address", value)}
          />
        </View>

        {/* Ciudad */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDark && styles.darkText]}>Ciudad</Text>
          <TextInput
            style={[styles.input, isDark ? styles.darkInput : styles.lightInput]}
            placeholder="Ciudad"
            placeholderTextColor={isDark ? "#aaa" : "#888"}
            value={formData.city}
            onChangeText={(value) => handleChange("city", value)}
          />
        </View>

        {/* Estado/Provincia */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDark && styles.darkText]}>Estado/Provincia</Text>
          <TextInput
            style={[styles.input, isDark ? styles.darkInput : styles.lightInput]}
            placeholder="Estado o provincia"
            placeholderTextColor={isDark ? "#aaa" : "#888"}
            value={formData.state}
            onChangeText={(value) => handleChange("state", value)}
          />
        </View>

        {/* Código Postal */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDark && styles.darkText]}>Código Postal</Text>
          <TextInput
            style={[styles.input, isDark ? styles.darkInput : styles.lightInput]}
            placeholder="Código postal"
            placeholderTextColor={isDark ? "#aaa" : "#888"}
            value={formData.postalCode}
            onChangeText={(value) => handleChange("postalCode", value)}
            keyboardType="numeric"
          />
        </View>

        {/* Teléfono */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDark && styles.darkText]}>Teléfono</Text>
          <TextInput
            style={[styles.input, isDark ? styles.darkInput : styles.lightInput]}
            placeholder="Número de teléfono"
            placeholderTextColor={isDark ? "#aaa" : "#888"}
            value={formData.phone}
            onChangeText={(value) => handleChange("phone", value)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Botón */}
        <TouchableOpacity
          style={[styles.button, isDark ? styles.darkButton : styles.lightButton]}
          onPress={handleSubmit}
        >
          <Text style={[styles.buttonText, isDark && styles.darkButtonText]}>Completar Compra</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  darkContainer: {
    backgroundColor: "#2a2a2a",
  },
  lightContainer: {
    backgroundColor: "#f5f5f5",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 16,
    color: "#111",
  },
  darkText: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  lightInput: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    color: "#111",
  },
  darkInput: {
    backgroundColor: "#1f1f1f",
    borderColor: "#555",
    color: "#fff",
  },
  disabledInput: {
    opacity: 0.6,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
  },
  lightButton: {
    backgroundColor: "#E63946",
    borderColor: "#E63946",
  },
  darkButton: {
    backgroundColor: "#E63946",
    borderColor: "#E63946",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  darkButtonText: {
    color: "#fff",
  },
});

export default CheckoutForm;
