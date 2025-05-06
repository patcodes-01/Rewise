import React, { useState } from "react";

function FlashcardViewer({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [revisionComplete, setRevisionComplete] = useState(false);

  const totalCards = cards.length;
  const currentCard = cards[index];

  const nextCard = () => {
    if (index < totalCards - 1) {
      setIndex((prev) => prev + 1);
      setFlipped(false);
    } else {
      setRevisionComplete(true);
    }
  };

  const restartRevision = () => {
    setIndex(0);
    setFlipped(false);
    setRevisionComplete(false);
  };

  const isLastCard = index === totalCards - 1;

  if (!cards || cards.length === 0) {
    return <p>No flashcards available.</p>;
  }

  return (
    <div
      className="card flashcard"
      style={{
        background: "linear-gradient(135deg, #c8e6c9, #a5d6a7)",
        textAlign: "center",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out",
        perspective: "1000px",
      }}
    >
      <h2 style={{ color: "#2e7d32" }}>
        Flashcard {index + 1} of {totalCards}
      </h2>

      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          position: "relative",
          width: "100%",
          minHeight: "150px",
          transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            padding: "1.5rem",
            backgroundColor: "#ffffff",
            border: "2px dashed #00796b",
            borderRadius: "1rem",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.1rem",
            color: "#004d40",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {currentCard?.question}
          <p style={{ fontSize: "0.85rem", color: "#555", marginTop: "1rem" }}>
            (Click to reveal answer)
          </p>
        </div>
        {flipped && currentCard?.answer && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              backgroundColor: "#ffffff",
              border: "2px dashed #00796b",
              borderRadius: "1rem",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1rem",
              color: "#388e3c",
              fontWeight: "500",
              transform: "rotateY(180deg)",
              padding: "1.5rem",
              whiteSpace: "pre-wrap",
              textAlign: "center",
            }}
          >
            {currentCard.answer}
            <p
              style={{ fontSize: "0.85rem", color: "#555", marginTop: "1rem" }}
            >
              (Click to see question)
            </p>
          </div>
        )}
      </div>

      <button
        onClick={nextCard}
        disabled={isLastCard && !flipped}
        style={{
          background: "#00796b",
          color: "#fff",
          border: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "background 0.3s ease",
          marginTop: "1.5rem",
        }}
      >
        {isLastCard ? (flipped ? "Finish Revision" : "Next") : "Next"}
      </button>

      {revisionComplete && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f0fff0",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            textAlign: "center",
          }}
        >
          <h2>Yayyy!!🎉</h2>
          <p>Your revision is done! All the best for your paper! </p>
          <button onClick={restartRevision} style={{ marginTop: "1rem" }}>
            Revise flashcards again
          </button>
        </div>
      )}
    </div>
  );
}

export default FlashcardViewer;
