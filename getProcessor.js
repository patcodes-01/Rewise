const express = require("express");
const multer = require("multer");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const ctext = `
Questions:
Options: 
Answer: 

`;

app.post("/ -process", upload.single("file"), async (req, res) => {
  try {
    console.log("Received   file:", req.file?.originalname || "No file");

    let extractedText = null;

    if (!extractedText) {
      extractedText = ctext;
    }

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
        },
        {
          role: "user",
        },
      ],
    });

    const gptOutput = response.data.choices[0].message.content;
    console.log("GPT Response:", gptOutput);

    res.json({
      success: true,
      message: "  process completed",
      data: gptOutput,
    });
  } catch (err) {
    console.error("  GPT Error:", err);
    res.status(500).json({ success: false, error: "  GPT call failed" });
  }
});

app.listen(4000, () => {
  console.log("  GPT processor listening on port 4000");
});

