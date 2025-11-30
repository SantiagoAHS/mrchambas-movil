import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: number;
  nombre: string;
}

interface Message {
  id: number;
  chat: number;
  sender: User;
  content: string;
  timestamp: string;
}

interface Chat {
  id: number;
  participants: User[];
  messages: Message[];
}

export default function ChatMobile() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [chats, setChats] = useState<Chat[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  const scrollRef = useRef<ScrollView>(null);

  // 🔹 Cargar token y userId desde AsyncStorage
  useEffect(() => {
    const loadCredentials = async () => {
      const t = await AsyncStorage.getItem("token");
      const uid = await AsyncStorage.getItem("userId");
      setToken(t);
      if (uid) setUserId(parseInt(uid));
    };
    loadCredentials();
  }, []);

  // 🔹 Traer chats y actualizar automáticamente
  useEffect(() => {
    if (!token) return;

    const fetchChats = async () => {
      try {
        const res = await fetch(
          "https://mibackend-mchambas.onrender.com/api/chats/",
          { headers: { Authorization: `Token ${token}` } }
        );
        const data = await res.json();
        const newChats: Chat[] = data.chats || data;

        setChats((prev) => {
          // Actualizar chats existentes y agregar nuevos
          const merged = newChats.map((nc) => {
            const existing = prev.find((c) => c.id === nc.id);
            return existing ? { ...existing, ...nc, messages: nc.messages } : nc;
          });
          const newOnes = prev.filter((c) => !merged.some((m) => m.id === c.id));
          const combined = [...merged, ...newOnes];

          // Ordenar por último mensaje
          combined.sort((a, b) => {
            const aTime = a.messages.at(-1)?.timestamp || "";
            const bTime = b.messages.at(-1)?.timestamp || "";
            return bTime.localeCompare(aTime);
          });

          return combined;
        });
      } catch (err) {
        console.error("Error al obtener chats", err);
      }
    };

    fetchChats();
    const interval = setInterval(fetchChats, 10000); // cada 10s revisa nuevos chats
    return () => clearInterval(interval);
  }, [token]);

  // 🔹 Actualizar mensajes del chat activo y reordenar chats
  useEffect(() => {
    if (!token || !activeChat) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `https://mibackend-mchambas.onrender.com/api/chats/${activeChat.id}/`,
          { headers: { Authorization: `Token ${token}` } }
        );
        if (!res.ok) return;
        const updatedChat: Chat = await res.json();

        // 🔹 Actualizar activeChat si cambió
        setActiveChat((prev) => {
          if (!prev) return updatedChat;
          if (updatedChat.messages.length !== prev.messages.length) return updatedChat;
          return prev;
        });

        // 🔹 Actualizar lista de chats
        setChats((prev) => {
          const updated = prev.map((c) =>
            c.id === updatedChat.id ? updatedChat : c
          );

          updated.sort((a, b) => {
            const aTime = a.messages.at(-1)?.timestamp || "";
            const bTime = b.messages.at(-1)?.timestamp || "";
            return bTime.localeCompare(aTime);
          });

          return updated;
        });
      } catch (err) {
        console.error(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [token, activeChat?.id]);

  // 🔹 Enviar mensaje
  const handleSend = async () => {
    if (!newMessage.trim() || !activeChat || !token) return;
    try {
      const res = await fetch(
        `https://mibackend-mchambas.onrender.com/api/chats/${activeChat.id}/send/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ content: newMessage }),
        }
      );
      if (!res.ok) throw new Error("No se pudo enviar el mensaje");
      const newMsg = await res.json();

      // 🔹 Actualizar activeChat
      setActiveChat((prev) =>
        prev ? { ...prev, messages: [...prev.messages, newMsg] } : prev
      );

      // 🔹 Actualizar lista de chats
      setChats((prev) => {
        const updated = prev.map((c) =>
          c.id === activeChat.id
            ? { ...c, messages: [...c.messages, newMsg] }
            : c
        );

        updated.sort((a, b) => {
          const aTime = a.messages.at(-1)?.timestamp || "";
          const bTime = b.messages.at(-1)?.timestamp || "";
          return bTime.localeCompare(aTime);
        });

        return updated;
      });

      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Scroll automático cuando llegan mensajes
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [activeChat?.messages]);

  const getOtherParticipantName = (chat: Chat) => {
    if (!chat.participants.length || userId === null) return "Usuario";
    const other = chat.participants.find((u) => u.id !== userId);
    return other ? other.nombre : "Tú";
  };

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter((chat) =>
        getOtherParticipantName(chat)
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [searchText, chats]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: isDark ? "#3a3a3a" : "#f0f0f0" }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Buscador */}
      <TextInput
        placeholder="Buscar chat..."
        placeholderTextColor={isDark ? "#aaa" : "#777"}
        value={searchText}
        onChangeText={setSearchText}
        style={[
          styles.searchInput,
          { backgroundColor: isDark ? "#2f2f2f" : "#f2f2f2", color: isDark ? "#fff" : "#000" },
        ]}
      />

      {/* Lista de chats */}
      <ScrollView style={styles.chatList}>
        {filteredChats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={[
              styles.chatItem,
              {
                backgroundColor:
                  activeChat?.id === chat.id
                    ? "#ef4444"
                    : isDark
                    ? "#2f2f2f"
                    : "#fff",
              },
            ]}
            onPress={() => setActiveChat(chat)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {getOtherParticipantName(chat).charAt(0)}
              </Text>
            </View>
            <View style={styles.chatText}>
              <Text
                style={{
                  color: activeChat?.id === chat.id ? "#fff" : isDark ? "#fff" : "#000",
                  fontWeight: "bold",
                }}
              >
                {getOtherParticipantName(chat)}
              </Text>
              <Text
                style={{
                  color: activeChat?.id === chat.id ? "#fff" : "#777",
                  fontSize: 12,
                }}
                numberOfLines={1}
              >
                {chat.messages.at(-1)?.content || "Sin mensajes"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Chat activo */}
      {activeChat && (
        <View style={[styles.chatContainer, { backgroundColor: isDark ? "#1c1c1e" : "#fff" }]}>
          <Text style={[styles.chatTitle, { color: isDark ? "#fff" : "#000" }]}>
            {getOtherParticipantName(activeChat)}
          </Text>

          <ScrollView
            style={{ flex: 1 }}
            ref={scrollRef}
          >
            {activeChat.messages.slice(-50).map((msg) => {
              const mine = msg.sender.id === userId;
              return (
                <View
                  key={msg.id}
                  style={[
                    styles.messageBubble,
                    {
                      backgroundColor: mine ? "#ef4444" : isDark ? "#2f2f2f" : "#eee",
                      alignSelf: mine ? "flex-end" : "flex-start",
                    },
                  ]}
                >
                  <Text style={{ color: mine ? "#fff" : isDark ? "#fff" : "#000" }}>
                    {msg.content}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {/* Input flotante */}
          <View style={{ paddingBottom: 20 }}>
            <View style={[styles.sendContainer, { marginBottom: 10 }]}>
              <TextInput
                placeholder="Escribe un mensaje..."
                placeholderTextColor={isDark ? "#aaa" : "#777"}
                value={newMessage}
                onChangeText={setNewMessage}
                onSubmitEditing={handleSend}
                style={[
                  styles.input,
                  { backgroundColor: isDark ? "#2f2f2f" : "#f2f2f2", color: isDark ? "#fff" : "#000" },
                ]}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchInput: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  chatList: {
    maxHeight: 200,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#d0d0d0",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  chatText: { flex: 1 },
  chatContainer: { flex: 1, padding: 10 },
  chatTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  messageBubble: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 6,
    maxWidth: "70%",
  },
  sendContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  sendButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
});
