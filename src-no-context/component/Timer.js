import React, { useEffect } from 'react'

export default function Timer({dispatch,TimeRemainder}) {
    const minut = Math.floor(TimeRemainder/60)
    const seconde = TimeRemainder%60;
    useEffect(function (){
       const id = setInterval(() => {
            dispatch({type: 'Timer'})
        }, 1000)
        

        return (()=>clearInterval(id));

    }, [dispatch,TimeRemainder])
    
  return (
    <div className='timer'>{minut}:{seconde}</div>
  )
}
