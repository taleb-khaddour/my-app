import React from 'react'
import { useQuize } from '../QuizContext';

export default function FinishScreen() {

  const { points,Max,Hightscore,dispatch } = useQuize();


    const percent = Math.ceil((points/Max)*100);
  return (
    <>
    <div className='result'>
   <p>Your purcentage is {percent} % </p> 
    
   <p>You Scord <strong>{points}</strong> out of {Max} points</p> 
   


    </div>
    <h3>Highscore is {Hightscore}</h3>


    <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "Restart" })}
        >
          Restart Game
        </button>
    </>
   
  )
}
