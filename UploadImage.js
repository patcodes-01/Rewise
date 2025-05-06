import React from "react";
import Tesseract from "tesseract.js";

function UploadImage({ onExtracted }) {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const {
      data: { text },
    } = await Tesseract.recognize(file, "eng");
    const extractedQuestions = parseQuestions(text);
    onExtracted(extractedQuestions);
  };

  const parseQuestions = (text) => {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);
    let questions = [];

    lines.forEach((line) => {
      if (line.includes("?") || line.match(/^\d+[\.\)]/)) {
        questions.push({
          type: detectType(line),
          question: line,
        });
      }
    });

    return questions;
  };

  const detectType = (line) => {
    if (line.includes("a)") || line.includes("A.")) return "mcq";
    if (line.split(" ").length < 10) return "short";
    return "long";
  };

  return (
    <div>
      <h2>Upload Question Paper</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
}

export default UploadImage;
