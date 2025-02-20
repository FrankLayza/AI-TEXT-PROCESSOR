import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [detectedLanguage, setDetectedLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('en');


  const translate = async (text) => {
    try {
      const baseText = await window.ai.translator.translate(text, detectedLanguage);
      setMessages((prev) => [...prev, { text: baseText, type: "bot" }]);
    } catch (error) {
      console.log("there was an error translating this text", error);
    }
  };

  return (
    <ChatContext.Provider value={{ input, setInput, messages, setMessages, translate, detectedLanguage, setDetectedLanguage,targetLanguage, setTargetLanguage }}>
      {children}
    </ChatContext.Provider>
  );
};
export const useChatContext = () => useContext(ChatContext);
ChatProvider.propTypes = {
  children: PropTypes.any,
};
