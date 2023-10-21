import WolframAlphaAPI from "@wolfram-alpha/wolfram-alpha-api";
import env from "dotenv";
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());
env.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});
const upload = multer({ storage: storage });

const port = 3000;

const APPID = process.env.APPID;
const waApi = WolframAlphaAPI(APPID);

const wolfram = async (input) => {
  const result = await waApi.getFull({
    input,
    format: "mathml",
  });
  // console.log(result);
  const { pods } = result;
  // return result;
  let ans = "";
  pods.map(({ subpods }) => {
    console.log(subpods);
    if (!subpods) return;
    subpods.map((pods) => {
      if (pods.mathml) {
        const { subpods } = pods;
        console.log(pods.mathml);
        ans += pods.mathml + "\\";
        // return {
        // latex: MathMLToLaTeX.convert(pods.mathml),
        // mathml: pods.mathml,
        // subpods,
        // };
      }
    });
  });
  return { mathml: ans };
};

const MathPix = async (file) => {
  const headers = {
    app_id: process.env.MATHPIX_APP_ID,
    app_key: process.env.MATHPIX_APP_KEY,
  };

  const imageBase64 = fs.readFileSync(file.path, { encoding: "base64" });

  const body = {
    src: `data:image/jpeg;base64,${imageBase64}`,
    formats: ["latex_styled", "text"],
    data_options: {
      include_asciimath: true,
    },
  };
  const { data } = await axios.post("https://api.mathpix.com/v3/text", body, {
    headers,
  });

  return data;
};

app.post("/wolfram/pic", async (req, res) => {
  const { input } = req.body;
  const data = await waApi.getSimple({ input, format: "image" });
  res.send(data);
});

app.post("/wolfram", async (req, res) => {
  try {
    const { format } = req.query;
    if (!["mathml", "latex"].includes(format)) {
      throw new Error("the format is not supported");
    }

    const { input } = req.body;
    let data = await wolfram(input);
    if (format === "latex") {
      data = (await axios.post("http://127.0.0.1:5000/convert", data)).data;
    }
    res.send(data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.post("/mathpix", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    console.log("file", file);
    const data = await MathPix(file);
    res.send(data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
