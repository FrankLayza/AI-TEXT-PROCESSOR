import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [messages, setMessage] = useState([]);
  return (
    <ChatContext.Provider value={{ input, setInput, messages, setMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
export const useChatContext = () => useContext(ChatContext);
ChatProvider.propTypes = {
  children: PropTypes.any,
};
