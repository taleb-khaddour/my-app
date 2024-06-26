import React from 'react'
import { useQuize } from '../QuizContext'

export default function StartScreen() {
  const{numQuestion,dispatch}=useQuize();
    function handelStart(){
        dispatch({type:"StartQuiz"})
      }
  return (
    <div className='start'>
        <h2>Welcom to the React Quiz!</h2>
        <h3>{numQuestion} question to test your React mastery</h3>
        <button className=' btn btn-ui' onClick={handelStart}>Let's Start</button>
    </div>
  )
}
