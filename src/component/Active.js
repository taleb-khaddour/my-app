import React from 'react'
import Option from './Option'
import { useQuize } from '../QuizContext';

export default function Active() {
  const { questions,index } = useQuize();
const question =questions[index];

  return (
    <div>
        <h4>{question.question}</h4>
       <Option/>
    </div>
  )
}
