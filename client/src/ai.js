"use strict";

const async = require("async");
const fs = require("fs");
const https = require("https");
const path = require("path");
const createReadStream = require("fs").createReadStream;
const sleep = require("util").promisify(setTimeout);
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
          "https://w.namu.la/s/f8211f25147a509e952edb75c36dac8f4d69ca4dd1e08fabbeafe202b029da98ba00b372c604a9698723a26210ed58d8796260c5217d5e403f562ea4ecf74dbeb495387437076c2df36ed42d4007c2b156c55166dd7d25c217e873e524c1571d";

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
          return tags
            .map((tag) => `${tag.name} (${tag.confidence.toFixed(2)})`)
            .join(", ");
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
