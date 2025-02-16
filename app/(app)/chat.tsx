import React, { useState, useRef, useCallback } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
  Platform,
  View,
  Alert,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { sendChatQuery, clearChatHistory } from "@/services/chatService";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export default function ChatScreen() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const { user } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const scrollToBottom = useCallback(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  const handleClearHistory = async () => {
    Alert.alert(
      "Limpiar historial",
      "¿Estás seguro de que quieres borrar todo el historial de chat?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Limpiar",
          style: "destructive",
          onPress: async () => {
            try {
              setClearing(true);
              if (!user) {
                throw new Error("Usuario no autenticado");
              }

              const token = await user.getIdToken();
              await clearChatHistory(token);

              setMessages([]);
              // Añadir mensaje de confirmación
              const systemMessage: Message = {
                id: generateId(),
                text: "El historial ha sido borrado",
                isUser: false,
                timestamp: new Date(),
              };
              setMessages([systemMessage]);
            } catch (error) {
              Alert.alert(
                "Error",
                `No se pudo limpiar el historial: ${(error as Error).message}`
              );
            } finally {
              setClearing(false);
            }
          },
        },
      ]
    );
  };

  const handleSend = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || loading) return;

    const userMessage: Message = {
      id: generateId(),
      text: trimmedQuery,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      if (!user) {
        throw new Error("Usuario no autenticado");
      }

      const token = await user.getIdToken();
      const data = await sendChatQuery(trimmedQuery, token);

      const aiMessage: Message = {
        id: generateId(),
        text: data.answer,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: generateId(),
        text: `Error: ${(error as Error).message}`,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const MessageBubble = ({ message }: { message: Message }) => (
    <View
      style={[
        styles.messageBubble,
        message.isUser ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          message.isUser ? styles.userMessageText : styles.aiMessageText,
        ]}
      >
        {message.text}
      </Text>
      <Text
        style={[
          styles.timestampText,
          message.isUser ? styles.userTimestampText : styles.aiTimestampText,
        ]}
      >
        {formatTime(message.timestamp)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat con FitAI</Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearHistory}
          disabled={clearing || messages.length === 0}
        >
          {clearing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.clearButtonText}>Limpiar</Text>
          )}
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          onContentSizeChange={scrollToBottom}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#4CAF50" />
              <Text style={styles.loadingText}>AI está pensando...</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { maxHeight: 100 }]}
            placeholder="Escribe tu pregunta..."
            value={query}
            onChangeText={setQuery}
            editable={!loading}
            multiline
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!query.trim() || loading) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!query.trim() || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.sendButtonText}>Enviar</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#4CAF50",
    borderBottomWidth: 1,
    borderBottomColor: "#3d8b40",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  clearButton: {
    backgroundColor: "#3d8b40",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  keyboardContainer: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 24,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userBubble: {
    backgroundColor: "#4CAF50",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: "#fff",
  },
  aiMessageText: {
    color: "#333",
  },
  timestampText: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
    alignSelf: "flex-end",
  },
  userTimestampText: {
    color: "#fff",
  },
  aiTimestampText: {
    color: "#666",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
