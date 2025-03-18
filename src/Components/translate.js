export const translate = async (input, detectedLanguage, targetLanguage) => {
    try {
      if ("ai" in self && "translator" in self.ai) {
        console.log("the translator api is supported");
        return;
      }

      const translatorCapabilities = await self.ai.translator.capabilities();
      const canTranslate = translatorCapabilities.available;
      let translator;

      if (canTranslate === "no") {
        console.log("Translator is not supported by this browser");
        return;
      }
      if (canTranslate === "readily") {
        console.log("Translation is supported");
        translator = await self.ai.translator.create({
          sourceLanguage: detectedLanguage,
          targetLanguage:  targetLanguage,
        });
      } else {
        translator = await self.ai.translator.create({
          sourceLanguage: detectedLanguage,
          targetLanguage: targetLanguage,
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await translator.ready;
      } 
      const translatedLanguage = await translator.translate(input)
      console.log(translatedLanguage);
    } catch (error) {
      console.log(error);
    }
  };
