import { LuSend } from "react-icons/lu";
import { useChatContext } from "../Context/ChatContext";
const Input = () => {
  const { setInput } = useChatContext();
  const { input } = useChatContext();
  const { setMessages } = useChatContext();

  const isAPIAvailable = () => {
    return window.ai && window.ai.languageDetector;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userInput = { text: input, type: "user" };
    setMessages((prev) => [...prev, userInput]);
    setInput("");

    try {
      if (!isAPIAvailable()) {
        console.log("error ooo");
        return;
      }
      const detectedLanguage = await window.ai.languageDetector.detect(input);
      const language = detectedLanguage?.language || "Unknown language";

      const response = { text: input, language, type: "bot" };
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.log("there was an error fetching the language", error);
    }
  };

  return (
    <div className="flex relative items-center">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-[#dcdcdc] w-full rounded-2xl resize-none outline-0 !p-1 shadow-lg"
        name=""
        id=""
        placeholder="Type your message here"
      >
        {input}
      </textarea>
      <button
        onClick={() => {
          sendMessage();
        }}
        className="absolute right-3 flex items-center justify-center text-gray-500 cursor-pointer hover:text-green-600"
      >
        <LuSend />
      </button>
    </div>
  );
};

export default Input;
