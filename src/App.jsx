import Input from "./Components/Input";
import Message from "./Components/Message";
import {ChatProvider} from './Context/ChatContext';

const App = () => {
  return (
    <ChatProvider>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-[70%] !p-2 rounded-2xl bg-[#ececec] shadow-lg">
          <h2 className="font-bold mb-4 text-2xl text-center">AI Text Processor</h2>
          <Message />
          <Input />
        </div>
      </div>
    </ChatProvider>
  );
};

export default App;
