import { useChatContext } from "../Context/ChatContext";
import Summarize from "./SummarizeBtn";
import Translate from "./TranslateBtn";
const Message = () => {
  const { messages } = useChatContext();

  if (messages.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col items-end">
      {messages.map((message, index) => (
        <div className="flex items-center" key={index}>
          <Translate />
           {message.length > 250 ? <Summarize /> : ''} 
          <div
            key={index}
            className="bg-white text-sm md:text-lg self-end rounded-lg shadow-lg max-w-xs md:max-w-md break-words whitespace-pre-wrap font-semibold !px-5 !py-2 !my-4"
          >
            {message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
