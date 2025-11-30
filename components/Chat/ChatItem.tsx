import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Pin } from "lucide-react-native";

interface Props {
  id: number;
  nombre: string;
  avatar?: string;
  ultimoMensaje: string;
  hora: string;
  noLeidos: number;
  pinned?: boolean;
  onPress: () => void;
  themeColors: {
    text: string;
    card: string;
  };
}

export default function ChatItem({
  nombre,
  avatar,
  ultimoMensaje,
  hora,
  noLeidos,
  pinned,
  onPress,
  themeColors,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.chatCard, { backgroundColor: themeColors.card }]}
      onPress={onPress}
    >
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarLetter}>{nombre.charAt(0)}</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={[styles.name, { color: themeColors.text }]}>
          {nombre}
        </Text>

        <Text
          style={[styles.message, { color: themeColors.text + "99" }]}
          numberOfLines={1}
        >
          {ultimoMensaje}
        </Text>
      </View>

      {/* Derecha */}
      <View style={styles.rightSection}>
        <Text style={[styles.time, { color: themeColors.text + "88" }]}>
          {hora}
        </Text>

        <View style={styles.rightBottom}>
          {pinned && <Pin size={16} color="#999" style={{ marginRight: 6 }} />}

          {noLeidos > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{noLeidos}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatCard: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    elevation: 2,
  },

  avatarContainer: { marginRight: 12 },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },

  avatarPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#c50000",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarLetter: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },

  info: { flex: 1 },

  name: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 4,
  },

  message: {
    fontSize: 14,
  },

  rightSection: {
    alignItems: "flex-end",
  },

  time: {
    fontSize: 12,
    marginBottom: 6,
  },

  rightBottom: {
    flexDirection: "row",
    alignItems: "center",
  },

  badge: {
    backgroundColor: "#c50000",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
