import axios from "axios";

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

  // is adult image
  const adult = (
    await computerVisionClient.analyzeImage(tagsURL, {
      visualFeatures: ["Adult"],
    })
  ).adult;
  if (adult.adultScore.toFixed(4) >= 0.5 && adult.racyScore.toFixed(4) >= 0.5) {
    console.log("adult image");
  } else {
    console.log("not adult image");
  }

  // Analyze URL image
  const tags = (
    await computerVisionClient.analyzeImage(tagsURL, {
      visualFeatures: ["Tags"],
    })
  ).tags;

  const tagsArray = await tags.map((tag: any) => {
    return tag.name;
  });
  console.log(tagsArray.join());

  return axios.post(
    "translation",
    { keywords: tagsArray.join() },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
};
