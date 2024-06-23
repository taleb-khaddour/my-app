import React from "react";

export default function NextButton({ index, numQuestion, answer, dispatch }) {
  if (answer === null) return null;
  if (index < numQuestion - 1){
      return (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      );

  }else if(index === numQuestion - 1){
    return(
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finished" })}
        >
          Finish
        </button>
    )
  }
  else{
    return(
        <></>
    )
  }
}
