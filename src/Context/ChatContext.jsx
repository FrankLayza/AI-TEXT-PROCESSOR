import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [detectedLanguage, setDetectedLanguage] = useState(" ");
  const [targetLanguage, setTargetLanguage] = useState("en");

   const translate = async () => {
    try {
      if (!self.ai || !self.ai.translator ){
        console.log('the language translator api is not available');
        return;
      }

      if ('ai' in self && 'translator' in self.ai) {
       console.log('the translator api is supported');
      }

      // const translatorCapabilities = await self.ai.translator.capabilities();
      // const canTranslate = translatorCapabilites.
    } catch (error) {
      console.log(error);
    }
   }

  return (
    <ChatContext.Provider
      value={{
        input,
        setInput,
        messages,
        setMessages,
        translate,
        detectedLanguage,
        setDetectedLanguage,
        targetLanguage,
        setTargetLanguage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const useChatContext = () => useContext(ChatContext);
ChatProvider.propTypes = {
  children: PropTypes.any,
};
 
 
 