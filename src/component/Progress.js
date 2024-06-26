import React from 'react'
import { useQuize } from '../QuizContext';

export default function Progress() {
  const { Max,index,points,numQuestion } = useQuize();

  return (
    <header className='progress'>

<progress max={numQuestion} value={index+1}/>

        <p>Question <strong>{index+1}</strong> / {numQuestion}</p>

        <p><strong>{points}/{Max} points</strong></p>
    </header>
  )
}
