export async function detect (input, setDetectedLanguage, setMessages){
   try {
      if (!self.ai || !self.ai.languageDetector) {
        console.error("Language detector API is not available.");
        return;
      }

      const languageDetectorCapabilities =
        await self.ai.languageDetector.capabilities();
      console.log(languageDetectorCapabilities.languageAvailable("en"));
      const canDetect = languageDetectorCapabilities.available;
      let detector;

      if (canDetect === "no") {
        console.log("The browser language detector is unstable");
        return;
      }
      if (canDetect === "readily") {
        console.log("The language detector is ready to be used");
        detector = await self.ai.languageDetector.create();
      } else {
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              console.log(`Download ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await detector.ready;
      }
     
      const detectLanguage = await detector.detect(input);
     for(const language of detectLanguage){
      if(language.confidence >= 0.9){
        const possibleLanguage = language.detectedLanguage
        console.log(possibleLanguage);
        setDetectedLanguage(possibleLanguage)
        setMessages((prev) => [...prev, {text: input, type: 'bot', possibleLanguage}])
      }
     } 
    } catch (error) {
      console.log(error);
    }
} 
 