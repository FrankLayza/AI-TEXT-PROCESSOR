import axios from "axios";
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const googleTranslate = async (
  input,
  targetLanguage,
  sourceLanguage = "en"
) => {
  try {
    console.log("API Payload", {
      from: sourceLanguage,
      to: targetLanguage,
      text: input,
    });

    const response = await axios.post(
      "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
      new URLSearchParams({
        from: sourceLanguage || 'auto',
        to: targetLanguage,
        text: input,
      }), 
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-rapidapi-host": "google-translate113.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      }
    );
    console.log("Sending to API:", {
      from: sourceLanguage,
      to: targetLanguage,
      text: input,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in Google Translate service:",
      error.response?.data || error.message
    );
    throw error;
  }
};
