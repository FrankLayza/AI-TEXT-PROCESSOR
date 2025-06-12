import { Input } from "@mantine/core";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useMessages } from "../context/MessageContext";

const TextInput = () => {
  const { addMessage, input, setInput } = useMessages();

  const handleSubmit = () => {
    if (!input.trim()) return;
    addMessage({ role: "user", content: input });
    console.log(input);
    setInput("");
  };
  return (
    <>
      <Input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        radius={'md'}
        mt={"md"}
        rightSectionPointerEvents="all"
        placeholder="Enter your text here"
        rightSection={
          <button onClick={handleSubmit} className="flex items-center">
            <FaArrowAltCircleUp
              size={24}
              style={{ display: input ? undefined : "none", color: "zinc" }}
              className="cursor-pointer"
            />
          </button>
        }
        styles={{
          input: {
            outline: 'none',
            padding: '22px 15px',
            boxShadow: '5px 5px 5px gray'
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
    </>
  );
};

export default TextInput;
