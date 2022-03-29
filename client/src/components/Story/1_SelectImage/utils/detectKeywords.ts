const ComputerVisionClient =
  require("@azure/cognitiveservices-computervision").ComputerVisionClient;
const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;

const key = process.env.REACT_APP_AZURE_COMPUTER_VISION_KEY;
const endpoint = process.env.REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT;

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
);

export const detectKeywords = async (imageName: string) => {
  const tagsURL = `https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/${imageName}`;

  const tags = (
    await computerVisionClient.analyzeImage(tagsURL, {
      visualFeatures: ["Tags"],
    })
  ).tags;

  return tags;
};
