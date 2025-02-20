import { useChatContext } from "../Context/ChatContext";

const Message = () => {
  const { messages, setDetectedLanguage, detectedLanguage, translate } =
    useChatContext();

  if (messages.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col items-end">
      {messages.map((message, index) => (
        <div className="flex items-center" key={index}>
          <select
            value={detectedLanguage}
            onChange={(e) => setDetectedLanguage(e.target.value)}
            className="rounded !p-1 border text-xs"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
          </select>
          <button
            className="cursor-pointer !mx-2 bg-green-600 !p-2 rounded text-xs"
            onClick={() => translate(message.text)}
          >
            Translate
          </button>
          {message.text.length >= 150 ? <button>summarize</button> : ""}
          <div className="bg-white text-sm md:text-lg self-end rounded-lg shadow-lg max-w-xs md:max-w-md break-words whitespace-pre-wrap font-semibold !px-5 !py-2 !my-4">
            {message.text}
            {message.language && (
              <small className="text-xs">
                The language detected{message.language}
              </small>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
