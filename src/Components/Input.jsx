import { LuSend } from "react-icons/lu";
import { useChatContext } from "../Context/ChatContext";
import { detect } from "./languageDetect";
const Input = () => {
  const { setInput, input, setMessages, setDetectedLanguage } =
    useChatContext();

  const sendMessage = () => {
    if (!input.trim()) return;
    const userInput = { text: input, type: "user" };
    setMessages((prev) => [...prev, userInput]);
    setInput("");

    detect(input, setDetectedLanguage, setMessages);
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
