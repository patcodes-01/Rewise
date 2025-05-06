import "./App.css";
import React, { useState } from "react";
import QuizGame from "./Components/QuizGame";
import FlashcardViewer from "./Components/FlashcardViewer";

const questions = [
  {
    type: "mcq",
    question: "(a) The data type of the object D = 10, is ______________.",
    options: ["int", "float", "string", "bool"],
    answer: "int",
  },
  {
    type: "mcq",
    question: '(b) print(print(4, end = "")) is ______________.',
    options: ["4", "None", "Error", "44"],
    answer: "None",
  },
  {
    type: "mcq",
    question: '(c) print(str(i) for i in "Hello") is ______________.',
    options: ["Hello", "<generator object>", "str", "Error"],
    answer: "<generator object>",
  },
  {
    type: "mcq",
    question: "(d) print(chr(ord('F') + 12)) is ______________.",
    options: ["R", "G", "H", "M"],
    answer: "R",
  },
  {
    type: "mcq",
    question:
      "(e) The def keyword in Python is used to define a ______________ name.",
    options: ["class", "variable", "function", "module"],
    answer: "function",
  },
];

const flashcards = [
  {
    question: "(a) Write five rules for writing valid identifiers in Python.",
    answer:
      "1. Can contain letters, digits, and underscores.\n2. Cannot start with a digit.\n3. Cannot use Python keywords.\n4. Case-sensitive.\n5. No special characters like $, %, etc.",
  },
  {
    question:
      "(b) Name three programming paradigms that are supported by Python language.",
    answer:
      "1. Object-Oriented Programming\n2. Procedural Programming\n3. Functional Programming",
  },
  {
    question: "(c) List four differences between list and tuple.",
    answer:
      "1. Lists are mutable, tuples are immutable.\n2. Lists use [], tuples use ().\n3. Lists have more built-in methods.\n4. Tuples are generally faster than lists.",
  },
  {
    question: "(d) What are function annotations?",
    answer:
      "Function annotations provide metadata about the types used in a function.\nExample:\ndef add(x: int, y: int) -> int:\n    return x + y\nAdvantages: Improves code clarity, helps with type checking.",
  },
  {
    question: "(e) What is a class in Python? Syntax? Passing arguments?",
    answer:
      "A class is a blueprint for objects.\nSyntax:\nclass MyClass:\n    def __init__(self, arg):\n        self.arg = arg\nArguments are passed using the __init__ constructor.",
  },
  {
    question: "(f) What is short-circuiting? How is 'False and 3/0' evaluated?",
    answer:
      "Short-circuiting skips evaluation if result is already determined.\nIn 'False and 3/0', since False is first, Python skips 3/0 (avoids ZeroDivisionError).",
  },
];

function App() {
  const [quizDone, setQuizDone] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [showQuiz, setShowQuiz] = useState(false); 

  const simulateUpload = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      console.log("Uploaded file:", file.name); 
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowQuiz(true); 
    }, 3000);
  };

  const restart = () => {
    setQuizDone(false);
    setShowQuiz(false);
    setLoading(false);
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div className="card">
        <h1>Rewise: Your end-moment saviour!</h1>

        {}
        {!showQuiz && !loading && (
          <div style={{ marginTop: "30px" }}>
            <h3>Kindly upload your question paper (PDF/Image)</h3>
            <input
              type="file"
              accept=".pdf, image/*"
              style={{ display: "none" }}
              id="fileInput"
              onChange={simulateUpload}
            />
            <button
              onClick={() => document.getElementById("fileInput").click()}
            >
              Upload File
            </button>
          </div>
        )}

        {}
        {loading && (
          <div style={{ marginTop: "20px" }}>
            <p>Processing...</p>
            <p>
              <em>Please wait while we generate your revision set!</em>
            </p>
          </div>
        )}

        {}
        {showQuiz && !quizDone && (
          <QuizGame
            questions={questions}
            onComplete={() => setQuizDone(true)}
          />
        )}

        {}
        {showQuiz && quizDone && (
          <>
            <h1>Flashcards for Short/Long Questions</h1>
            <FlashcardViewer cards={flashcards} />
            <p style={{ fontSize: "12px", color: "gray", marginTop: "10px" }}>
            </p>
            <button onClick={restart} style={{ marginTop: "20px" }}>
              🔄 Restart Revision
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
