import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles";
import { ChatMessage } from "../types";
import { Ionicons } from "@expo/vector-icons";

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    text: "¡Hola! Soy tu asistente de fitness. ¿En qué puedo ayudarte hoy?",
    sender: "ai",
    timestamp: new Date().toISOString(),
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Simular respuesta de la IA
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: Date.now().toString(),
        text: "Esta es una respuesta simulada de la IA. Aquí iría la integración real con el backend.",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <View style={styles.chatContainer}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === "user" ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.sender === "user"
                  ? styles.userMessageText
                  : styles.aiMessageText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.chatInputContainer}>
        <View style={styles.chatInput}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe tu mensaje..."
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
