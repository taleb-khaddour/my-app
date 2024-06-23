import React from 'react'

export default function Progress({Max,index,points,numQuestion}) {
  return (
    <header className='progress'>

<progress max={numQuestion} value={index+1}/>

        <p>Question <strong>{index+1}</strong> / {numQuestion}</p>

        <p><strong>{points}/{Max} points</strong></p>
    </header>
  )
}
