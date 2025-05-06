import React, { useState } from 'react';

function QuizGame({ questions, onComplete, onRestart }) {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = questions[index];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);
    if (option === currentQ.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const next = () => {
    const nextIndex = index + 1;
    if (nextIndex >= questions.length) {
      onComplete();
    } else {
      setIndex(nextIndex);
      setSelectedOption(null);
      setShowAnswer(false);
    }
  };

  return (
    <div className="card">
      <h2>Question {index + 1} of {questions.length}</h2>
      <p><strong>{currentQ.question}</strong></p>

      {currentQ.options.map((option, i) => (
        <button
          key={i}
          onClick={() => handleOptionClick(option)}
          disabled={showAnswer}
          style={{
            display: 'block',
            margin: '8px 0',
            padding: '10px',
            backgroundColor:
              showAnswer && option === currentQ.answer
                ? 'lightgreen'
                : showAnswer && option === selectedOption
                ? 'lightcoral'
                : ''
          }}
        >
          {option}
        </button>
      ))}

      {showAnswer && (
        <div>
          <p>
            {selectedOption === currentQ.answer
              ? '✅ Correct!'
              : `❌ Incorrect. Correct answer: ${currentQ.answer}`}
          </p>
          <button onClick={next}>
            {index === questions.length - 1 ? 'See Flashcards' : 'Next'}
          </button>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <strong>Score: {score} / {questions.length}</strong>
      </div>

      <button onClick={onRestart} style={{ marginTop: '15px' }}>
        🔄 Restart Revision
      </button>
    </div>
  );
}

export default QuizGame;
