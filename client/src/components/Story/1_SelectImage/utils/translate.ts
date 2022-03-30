import axios from "axios";

export const translate = async (word: string) => {
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  const URL = `https://www.googleapis.com/language/translate/v2`;

  const params = { key: API_KEY, source: "en", target: "ko", q: word };

  const result = await axios.get(URL, { params });
  console.log(result);
  // .then((res) => {
  //   return res.data.data.translations[0].translatedText;
  // })
  // .catch((err) => console.log(err));

  return result.data.data.translations[0].translatedText;
};
