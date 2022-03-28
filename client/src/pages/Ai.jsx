import React, { useState } from "react";

export default function Ai() {
  const [keywords, setKeywords] = useState([]);

  const async = require("async");
  // const fs = require("fs");
  // const https = require("https");
  // const path = require("path");
  // const createReadStream = require("fs").createReadStream;
  // const sleep = require("util").promisify(setTimeout);
  const ComputerVisionClient =
    require("@azure/cognitiveservices-computervision").ComputerVisionClient;
  const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;

  /**
   * AUTHENTICATE
   * This single client is used for all examples.
   */
  const key = "32d0f03624d14f1f874927def4412b65";
  const endpoint = "https://sayeon.cognitiveservices.azure.com/";

  const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
    endpoint
  );

  function computerVision() {
    async.series(
      [
        async function () {
          console.log("-------------------------------------------------");
          console.log("DETECT TAGS");
          console.log();

          // Image of different kind of dog.
          const tagsURL =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcim2Ja_r-sDjbgCM4d8SSMiZ-4d0zHWnIevXi8u1cxPzk4rpQREHyXxtbWc8PNmItfU&usqp=CAU";

          // Analyze URL image
          console.log("Analyzing tags in image...", tagsURL.split("/").pop());
          const tags = (
            await computerVisionClient.analyzeImage(tagsURL, {
              visualFeatures: ["Tags"],
            })
          ).tags;
          console.log(`Tags: ${formatTags(tags)}`);

          // Format tags for display
          function formatTags(tags) {
            setKeywords(
              tags
                .map((tag) => `${tag.name} (${tag.confidence.toFixed(2)})`)
                .join(", ")
            );
          }
        },
        function () {
          return new Promise((resolve) => {
            resolve();
          });
        },
      ],
      (err) => {
        throw err;
      }
    );
  }

  computerVision();

  return <>{keywords}</>;
}
