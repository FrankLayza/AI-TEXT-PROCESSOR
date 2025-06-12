// import { useMessages } from "../context/MessageContext";
import { useState } from "react";
import { googleTranslate } from "../services/googleTranslate";
import { MdTranslate } from "react-icons/md";
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
];

const TextProcess = ({ text, onResult }) => {
  const [targetLanguage, setTargetLanguage] = useState("");

  const translateText = async () => {
    if (!targetLanguage || !text) {
      return;
    }
    try {
      const data = await googleTranslate(text, targetLanguage, "auto");
      onResult(data.trans);
    } catch (error) {
      console.log("error in processing this text", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2 text-sm mt-1">
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="border rounded px-1 py-1 cursor-pointer"
          name=""
          id=""
        >
          {languages.map((lang) => (
            <option value={lang.code} key={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <button
          onClick={translateText}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
        >
          <MdTranslate size={16} />
        </button>
      </div>
    </>
  );
};

export default TextProcess;
