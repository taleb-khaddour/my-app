import { useReducer } from "react";

function DateCounter() {
  // const [count, setCount] = useState(0);

function reducer(state,action){
  // if(action.type === 'dec') return state+action.payload
  // if(action.type === 'inc') return state+action.payload
  // if(action.type === 'setCount') return action.payload
  // if(action.type === 'reset')return action.payload

// return state
switch(action.type){
  case 'dec': return {...state,count:state.count-state.step}
  case 'inc': return {...state,count:state.count+state.step}
  case 'setCount': return {...state,count:action.payload}
  case 'step': return {...state,step:action.payload}
  case 'reset': return {count:0,step:1}
}


}
const initalState ={
  count:0,
  step:1
}
  const[state,dispatch] = useReducer(reducer ,initalState);
const {count,step}= state;  
  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {

    dispatch({type:'dec' , payload: -1})
  };

  const inc = function () {

    dispatch({type:'inc' , payload: 1})

  };

  const defineCount = function (e) {
    dispatch({type:'setCount' , payload: Number(e.target.value)})

  };

  const defineStep = function (e) {
    dispatch({type:'step' , payload: Number(e.target.value)}) //

  };

  const reset = function () {
   dispatch({type:'reset' })
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
