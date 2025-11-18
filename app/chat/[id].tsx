// 🔹 Desactivar header automático de Expo Router
export const unstable_settings = {
  headerShown: false,
};

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Send } from "lucide-react-native";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
}

export default function ChatRoom() {
  const { id, nombre } = useLocalSearchParams();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("wss://echo.websocket.events");

    ws.current.onmessage = (event) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: event.data, sender: "other" },
      ]);
    };

    return () => ws.current?.close();
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = input.trim();

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: msg, sender: "me" },
    ]);

    ws.current?.send(msg);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* HEADER PERSONALIZADO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{nombre}</Text>
      </View>

      {/* MENSAJES */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.msgBubble,
              item.sender === "me" ? styles.me : styles.other,
            ]}
          >
            <Text
              style={[
                styles.msgText,
                item.sender === "me" && { color: "#fff" },
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* INPUT */}
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Send size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#c50000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    elevation: 4,
  },
  backBtn: {
    padding: 6,
    marginRight: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  msgBubble: {
    padding: 12,
    marginVertical: 6,
    maxWidth: "75%",
    borderRadius: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  me: {
    alignSelf: "flex-end",
    backgroundColor: "#c50000",
    borderBottomRightRadius: 4,
  },
  other: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 4,
  },
  msgText: {
    color: "#222",
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  inputBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    fontSize: 15,
    color: "#111",
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#c50000",
    padding: 12,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});
