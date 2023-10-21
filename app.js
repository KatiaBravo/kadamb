import WolframAlphaAPI from "@wolfram-alpha/wolfram-alpha-api";
import pkg from "mathml-to-latex";
import env from "dotenv";

env.config();

const APPID = process.env.APPID;
const waApi = WolframAlphaAPI(APPID);
const { Mathml2latex } = pkg;

const getData = async () => {
  try {
    const input = "x^2-3x-5=0";
    const { pods } = await waApi.getFull({
      input,
      format: "mathml",
    });

    console.log(
      pods.map(({ subpods }) => {
        return subpods.map((pods) => {
          if (pods.mathml)
            return {
              latex: Mathml2latex.convert(pods.mathml),
              mathml: pods.mathml,
            };
        });
      })
    );
  } catch (err) {
    console.log(err);
  }
};

getData();
