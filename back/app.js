import WolframAlphaAPI from "@wolfram-alpha/wolfram-alpha-api";
import { MathMLToLaTeX } from "mathml-to-latex";
// import xmlbuilder from "xmlbuilder";
import env from "dotenv";
import axios from "axios";

env.config();

const APPID = process.env.APPID;
const waApi = WolframAlphaAPI(APPID);

const getData = async () => {
  try {
    const input = "Limits of sin(x)/x as x approaches 0";
    const result = await waApi.getFull({
      input,
      format: "mathml",
    });
    console.log(result);
    const { pods } = result;
    return pods.map(({ subpods }) => {
      console.log(subpods);
      if (!subpods) return;
      return subpods.map((pods) => {
        if (pods.mathml) {
          const { subpods } = pods;
          console.log(pods.mathml);
          return {
            latex: MathMLToLaTeX.convert(pods.mathml),
            mathml: pods.mathml,
            subpods,
          };
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const MathPix = async () => {
  const headers = {
    app_id: process.env.MATHPIX_APP_ID,
    app_key: process.env.MATHPIX_APP_KEY,
  };
  const body = {
    src: "https://cdn.discordapp.com/attachments/1165004522331058286/1165182431964438528/ImageModel.jpg?ex=6545ebb3&is=653376b3&hm=1089c25cf99a90872935555b13a951d2e104747ddaa2605af6d67306818f0bbd",
    formats: ["latex_styled", "text"],
    data_options: {
      include_asciimath: true,
    },
  };
  try {
    const result = await axios.post("https://api.mathpix.com/v3/text", body, {
      headers,
    });
    console.log("Err", result.data);
    return result;
  } catch (err) {
    console.log(err);
  }
};

console.log(getData());
// console.log(MathPix());
