const ComputerVisionClient =
  require("@azure/cognitiveservices-computervision").ComputerVisionClient;
const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;

const key = process.env.REACT_APP_AZURE_COMPUTER_VISION_KEY;
const endpoint = process.env.REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT;

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
);

export const detectAdultKeywords = async (imageName: string) => {
  const adultURLImage = `https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/${imageName}`;

  // Function to confirm racy or not
  const isIt = (flag: any) => (flag ? "is" : "isn't");

  // Analyze URL image
  console.log(
    "Analyzing image for racy/adult content...",
    adultURLImage.split("/").pop()
  );
  const adult = (
    await computerVisionClient.analyzeImage(adultURLImage, {
      visualFeatures: ["Adult"],
    })
  ).adult;
  console.log(
    `This probably ${isIt(
      adult.isAdultContent
    )} adult content (${adult.adultScore.toFixed(4)} score)`
  );
  console.log(
    `This probably ${isIt(
      adult.isRacyContent
    )} racy content (${adult.racyScore.toFixed(4)} score)`
  );

  return false;
};
