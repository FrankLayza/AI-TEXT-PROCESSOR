import { createContext, useContext, useState } from "react";

const MessageContext = createContext();
export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [input, setInput] = useState("");

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        sourceLanguage,
        setSourceLanguage,
        input,
        setInput,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
