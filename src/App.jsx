import OutputBox from "./components/OutputBox";
import { MessageProvider } from "./context/MessageContext";
// import TextInput from "./components/TextInput";

const App = () => {
  return (
    <MessageProvider>
      <div className="w-full min-h-screen bg-gradient-to-r from-[#ddd0d9] via-[#d1d1ea] to-[#dedff1] p-0 m-0">
        <OutputBox />
      </div>
    </MessageProvider>
  );
};

export default App;
