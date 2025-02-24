import { useChatContext } from "../Context/ChatContext";

const Message = () => {
  const { messages, targetLanguage, translate, setTargetLanguage } =
    useChatContext();

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-end">
      {messages.map((message, index) => (
        <div className="flex items-center" key={index}>
          {message.type === "user" && (
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="rounded !p-1 border text-xs"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="pt">Portuguese</option>
              <option value="es">Spanish</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
            </select>
          )}

          {message.type === "user" && (
            <button
              className="cursor-pointer !mx-2 bg-green-600 !p-2 rounded text-xs"
              onClick={() => translate(message.text)}
            >
              Translate
            </button>
          )}

          {message.text.length >= 150 && <button>Summarize</button>}

          <div
            className={`bg-blue-200 text-sm md:text-lg self-end rounded-lg shadow-lg max-w-xs md:max-w-md break-words whitespace-pre-wrap font-semibold !px-5 !py-2 !my-4 ${
              message.type === "bot" ? "bg-green-200" : ""
            }`}
          >
            {message.text}
            {message.language}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
