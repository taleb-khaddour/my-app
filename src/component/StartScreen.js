import React from 'react'

export default function StartScreen({numQuestion,dispatch}) {
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
