import { LuSend } from "react-icons/lu";
import { useChatContext } from "../Context/ChatContext";
const Input = () => {
  const { setInput } = useChatContext();
  const { input } = useChatContext();
  const { setMessages } = useChatContext();
  const { setDetectedLanguage } = useChatContext();

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userInput = { text: input, type: "user" };
    setMessages((prev) => [...prev, userInput]);
    setInput("");

    try {
      if (!self.ai || !self.ai.languageDetector) {
        console.error("Language detector API is not available.");
        return;
      }

      const languageDetectorCapabilities =
        await self.ai.languageDetector.capabilities();
      console.log(languageDetectorCapabilities.languageAvailable("es"));
      const canDetect = languageDetectorCapabilities.available;
      let detector;

      if (canDetect === "no") {
        console.log("The browser language detector is unstable");
        return;
      }
      if (canDetect === "readily") {
        console.log("The language detector is ready to be used");
        detector = await self.ai.languageDetector.create();
      } else {
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              console.log(`Download ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await detector.ready;
      }
     
      const detectLanguage = await detector.detect(input);
      for (const tex of detectLanguage) {
        if (tex.confidence >= 0.9) {
          console.log(tex.detectedLanguage);
        }
      }
      setDetectedLanguage(detectLanguage)
    } catch (error) {
      console.log(error);
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
