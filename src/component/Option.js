import React from "react";

export default function Option({ question, dispatch, answer }) {
   const hasAnswered = answer !== null
  function HandelAnswer(index) {
    dispatch({ type: "newAnswer", payload: index });
    console.log(question.correctOption);
  }
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
        disabled={hasAnswered}
          className={`btn btn-option ${index === answer ? " answer" : ""} ${
            hasAnswered?index === question.correctOption ? "correct" : "wrong":""
          }`}
          onClick={() => HandelAnswer(index)}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
