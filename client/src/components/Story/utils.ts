const dataUrlToFile = (url: string, fileName: string) => {
  const [mediaType, data] = url.split(",");

  const mime = mediaType.match(/:(.*?);/)?.[0];

  var n = data.length;

  const arr = new Uint8Array(n);

  while (n--) {
    arr[n] = data.charCodeAt(n);
  }

  return new File([arr], fileName, { type: mime });
};

const dataUrlToFileUsingFetch = async (
  url: string,
  fileName: string,
  mimeType: string
) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  return new File([buffer], fileName, { type: mimeType });
};

export { dataUrlToFile, dataUrlToFileUsingFetch };
