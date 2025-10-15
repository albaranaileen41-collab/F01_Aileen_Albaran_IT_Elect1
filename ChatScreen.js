import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim() !== "") {
      setMessages([
        ...messages,
        { id: Date.now().toString(), text, type: "text", sender: "user" },
      ]);
      setText("");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });
    if (!result.canceled) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          uri: result.assets[0].uri,
          type: "image",
          sender: "user",
        },
      ]);
    }
  };

  return (
    <ImageBackground
      source={require("./assets/Screen.jpg")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>💬ChatBox</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === "user"
                ? styles.messageRight
                : styles.messageLeft,
            ]}
          >
            {item.type === "text" ? (
              <Text
                style={[
                  styles.messageText,
                  item.sender === "user"
                    ? styles.userText
                    : styles.otherText,
                ]}
              >
                {item.text}
              </Text>
            ) : (
              <Image
                source={{ uri: item.uri }}
                style={[
                  styles.imageMessage,
                  item.sender === "user"
                    ? styles.imageRight
                    : styles.imageLeft,
                ]}
              />
            )}
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />

      {/* 🌸 Input Section */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.icon}>🖼️</Text>
        </TouchableOpacity>

        <View style={styles.textBox}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={text}
            onChangeText={setText}
          />
        </View>

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  header: {
    backgroundColor: "#f7c8e0",
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerText: {
    color: "#4a4a4a",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  messageList: {
    flexGrow: 1,
    padding: 10,
  },

  // 💬 Message bubbles
  messageContainer: {
    marginVertical: 6,
    maxWidth: "75%",
  },
  messageLeft: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  messageRight: {
    alignSelf: "flex-end",
    backgroundColor: "#d6c8ff",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: "#fff",
  },
  otherText: {
    color: "#333",
  },

  // 🖼️ Image messages
  imageMessage: {
    width: 180,
    height: 180,
    borderRadius: 15,
    marginVertical: 4,
  },
  imageLeft: {
    alignSelf: "flex-start",
  },
  imageRight: {
    alignSelf: "flex-end",
  },

  // 🌸 Input Box Design
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fffafc",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#f3d6e4",
  },
  icon: {
    fontSize: 26,
    marginRight: 8,
  },
  textBox: {
    flex: 1,
    backgroundColor: "#fde2f3",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#f7c8e0",
  },
  input: {
    height: 40,
    color: "#333",
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#f7aef8",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 8,
    elevation: 3,
  },
  sendText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});