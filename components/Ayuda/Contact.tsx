import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import Ionicons from "react-native-vector-icons/Ionicons";

const contactDetails = [
  {
    icon: "call-outline",
    title: "Teléfono",
    value: "+52 (241) 176-4468",
  },
  {
    icon: "mail-outline",
    title: "Correo electrónico",
    value: "mrchambasmx@gmail.com",
  },
  {
    icon: "time-outline",
    title: "Horario de atención",
    value:
      "Lunes a Viernes: 9:00 AM - 6:00 PM\nSábado: 10:00 AM - 4:00 PM\nDomingo: Cerrado",
  },
];

export default function ContactScreen() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Enviar formulario:", form);
    // Aquí agregarías la lógica de envío
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isLight ? "#f9fafb" : "#3a3a3a" },
      ]}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Formulario */}
      <View style={{ marginBottom: 32 }}>
        <Text
          style={[styles.title, { color: isLight ? "#111" : "#ddd" }]}
        >
          Envíanos un mensaje
        </Text>
        <Text
          style={[styles.subtitle, { color: isLight ? "#111" : "#ddd" }]}
        >
          Llena el siguiente formulario y nos pondremos en contacto contigo.
        </Text>

        <TextInput
          placeholder="Nombre"
          placeholderTextColor={isLight ? "#6b7280" : "#aaa"}
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
          style={[
            styles.input,
            {
              backgroundColor: isLight ? "#fff" : "#1f1f1f",
              borderColor: isLight ? "#d1d5db" : "#4b5563",
              color: isLight ? "#111" : "#fff",
            },
          ]}
        />
        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor={isLight ? "#6b7280" : "#aaa"}
          value={form.email}
          keyboardType="email-address"
          onChangeText={(text) => handleChange("email", text)}
          style={[
            styles.input,
            {
              backgroundColor: isLight ? "#fff" : "#1f1f1f",
              borderColor: isLight ? "#d1d5db" : "#4b5563",
              color: isLight ? "#111" : "#fff",
            },
          ]}
        />
        <TextInput
          placeholder="Mensaje"
          placeholderTextColor={isLight ? "#6b7280" : "#aaa"}
          value={form.message}
          onChangeText={(text) => handleChange("message", text)}
          style={[
            styles.textarea,
            {
              backgroundColor: isLight ? "#fff" : "#1f1f1f",
              borderColor: isLight ? "#d1d5db" : "#4b5563",
              color: isLight ? "#111" : "#fff",
            },
          ]}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={[
            styles.button,
            {
              backgroundColor: isLight ? "#ef4444" : "#b91c1c", // rojo
            },
          ]}
        >
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      {/* Contacto */}
      <View>
        <Text style={[styles.title, { color: isLight ? "#111" : "#ddd" }]}>
          Contáctanos
        </Text>
        <Text
          style={[styles.subtitle, { color: isLight ? "#111" : "#ddd" }]}
        >
          También puedes comunicarte directamente por teléfono o correo.
        </Text>

        {contactDetails.map(({ icon, title, value }) => (
          <View key={title} style={styles.contactItem}>
            <Ionicons
              name={icon as any}
              size={24}
              color="#ef4444"
              style={{ marginRight: 12 }}
            />
            <View>
              <Text style={[styles.contactTitle, { color: isLight ? "#111" : "#ddd" }]}>
                {title}
              </Text>
              <Text style={{ color: isLight ? "#111" : "#ddd" }}>{value}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    textAlignVertical: "top",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  contactTitle: {
    fontWeight: "bold",
  },
});
