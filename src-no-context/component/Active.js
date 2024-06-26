import React from 'react'
import Option from './Option'

export default function Active({answer,question,dispatch}) {
  return (
    <div>
        <h4>{question.question}</h4>
       <Option answer={answer} question={question} dispatch={dispatch}/>
    </div>
  )
}
