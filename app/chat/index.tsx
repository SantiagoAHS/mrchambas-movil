import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { colors } from "@/app/styles/globalStyles";
import ChatItem from "@/components/Chat/ChatItem";

interface ChatData {
  id: number;
  nombre: string;
  avatar?: string;
  ultimoMensaje: string;
  hora: string;
  noLeidos: number;
  pinned?: boolean;
}

export default function ChatList() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bg = isDark ? colors.darkBg : "#f9f9f9";
  const text = isDark ? "#fff" : "#111";
  const card = isDark ? "#1c1c1e" : "#fff";

  const [chats, setChats] = useState<ChatData[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos" | "leidos" | "no-leidos">(
    "todos"
  );
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setChats([
      {
        id: 1,
        nombre: "Juan Pérez",
        ultimoMensaje: "Sí, mañana te entrego el trabajo.",
        hora: "4:21 PM",
        noLeidos: 2,
        pinned: true,
      },
      {
        id: 2,
        nombre: "Carla",
        ultimoMensaje: "¡Gracias! 😊",
        hora: "1:05 PM",
        noLeidos: 0,
      },
      {
        id: 3,
        nombre: "Cliente nuevo",
        ultimoMensaje: "¿Cuánto cobras?",
        hora: "Ayer",
        noLeidos: 1,
      },
    ]);
  }, []);

  const filteredChats = chats
    .filter((c) => c.nombre.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => {
      if (filter === "todos") return true;
      if (filter === "no-leidos") return c.noLeidos > 0;
      if (filter === "leidos") return c.noLeidos === 0;
    });

  const openChat = (id: number, nombre: string) =>
    router.push({
      pathname: `/chat/${id}`,
      params: { nombre },
    });

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {/* BUSCADOR + MENU */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Buscar chat..."
          placeholderTextColor={isDark ? "#aaa" : "#777"}
          value={search}
          onChangeText={setSearch}
          style={[
            styles.searchInput,
            { backgroundColor: card, color: text },
          ]}
        />

        <TouchableOpacity
          onPress={() => setMenuVisible(!menuVisible)}
          style={styles.menuButton}
        >
          <Text style={{ fontSize: 22, color: text }}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* MENU */}
      {menuVisible && (
        <View style={[styles.menuDropdown, { backgroundColor: card }]}>
          <TouchableOpacity
            onPress={() => {
              setFilter("todos");
              setMenuVisible(false);
            }}
            style={styles.menuItem}
          >
            <Text style={{ color: text }}>Todos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setFilter("no-leidos");
              setMenuVisible(false);
            }}
            style={styles.menuItem}
          >
            <Text style={{ color: text }}>No leídos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setFilter("leidos");
              setMenuVisible(false);
            }}
            style={styles.menuItem}
          >
            <Text style={{ color: text }}>Leídos</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* LISTA */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <ChatItem
            id={item.id}
            nombre={item.nombre}
            avatar={item.avatar}
            ultimoMensaje={item.ultimoMensaje}
            hora={item.hora}
            noLeidos={item.noLeidos}
            pinned={item.pinned}
            themeColors={{ text, card }}
            onPress={() => openChat(item.id, item.nombre)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  searchInput: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },

  menuButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  menuDropdown: {
    position: "absolute",
    top: 70,
    right: 12,
    width: 150,
    borderRadius: 12,
    paddingVertical: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: 20,
  },

  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
