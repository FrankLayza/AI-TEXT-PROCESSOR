import TextInput from "./TextInput";
import { useMessages } from "../context/MessageContext";
import TextProcess from "./TextProcess";
const OutputBox = () => {
  const { messages, addMessage } = useMessages();
  return (
    <>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full sm:w-1/2 px-4 py-2 mb-2 border-t border-gray-300">
        <div className="mb-2 max-h-64 overflow-y-auto flex flex-col">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 items-end rounded-2xl mb-1 ${
                message.role == "user"
                  ? "self-end"
                  : "self-start"
              }`}
            >
              <div>{message.content}</div>
              {message.role == 'user' && (
                <TextProcess
                  text={message.content}
                  onResult={(translated) => {
                    addMessage({
                      role: 'bot',
                      content: translated
                  })
                }}
                />
              )}
            </div>
          ))}
        </div>
        <TextInput />
      </div>
    </>
  );
};

export default OutputBox;