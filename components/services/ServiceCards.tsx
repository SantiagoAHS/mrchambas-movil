import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Star, MapPin, Clock } from "lucide-react-native";
import { useTheme } from "@/context/ThemeContext";

interface Service {
  id: number;
  title: string;
  description: string;
  image?: string;
  verified?: boolean;
  rating?: number;
  reviews?: number;
  location?: string;
  response_time?: string;
  price?: string;
  provider?: { nombre?: string };
}

export default function ServiceCard({ service }: { service: Service }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const colors = {
    text: isLight ? "#000" : "#e5e5e5",
    background: isLight ? "#fff" : "#1f1f1f",
    border: isLight ? "#ef4444" : "#b91c1c", // 🔴 red-500 tones
    accent: "#ef4444",
    secondary: isLight ? "#6b7280" : "#9ca3af",
  };

  const handleContact = () => {
    alert(`Contactando a ${service.provider?.nombre || "el proveedor"}...`);
  };

  return (
    <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.background }]}>
      <View>
        <Image
          source={{ uri: service.image || "https://via.placeholder.com/400x200" }}
          style={styles.image}
        />
        {service.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verificado</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.accent }]}>{service.title}</Text>

        <View style={styles.providerRow}>
          <View style={styles.avatar}>
            <Text style={{ fontWeight: "bold" }}>
              {service.provider?.nombre?.[0] || "?"}
            </Text>
          </View>
          <Text style={[styles.providerName, { color: colors.secondary }]}>
            {service.provider?.nombre || "Sin nombre"}
          </Text>
        </View>

        <Text style={[styles.description, { color: colors.text }]}>
          {service.description}
        </Text>

        <View style={styles.detailsRow}>
          <View style={styles.rowItem}>
            <Star size={16} color="#facc15" fill="#facc15" />
            <Text style={styles.detailText}>{service.rating || "5.0"}</Text>
            <Text style={[styles.detailSub, { color: colors.secondary }]}>
              ({service.reviews || 12})
            </Text>
          </View>
          <View style={styles.rowItem}>
            <MapPin size={16} color={colors.secondary} />
            <Text style={[styles.detailSub, { color: colors.secondary }]}>
              {service.location || "Ubicación"}
            </Text>
          </View>
        </View>

        <View style={[styles.rowItem, { marginBottom: 8 }]}>
          <Clock size={16} color={colors.secondary} />
          <Text style={[styles.detailSub, { color: colors.secondary }]}>
            Responde en {service.response_time || "1 hora"}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.price, { color: colors.accent }]}>
            {service.price || "$500"}
          </Text>

          <TouchableOpacity
            onPress={handleContact}
            style={[
              styles.button,
              { backgroundColor: colors.accent, borderColor: colors.border },
            ]}
          >
            <Text style={styles.buttonText}>Contactar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
  },
  verifiedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#22c55e",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  verifiedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  providerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  providerName: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontWeight: "bold",
  },
  detailSub: {
    fontSize: 13,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
