import React, { useEffect, useReducer, useState } from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import Loader from "./component/Loader";
import Error from "./component/Error";
import StartScreen from "./component/StartScreen";
import Question from "./component/Active";
import Progress from "./component/Progress";
import FinishScreen from "./component/finishScreen";
import NextButton from "./component/NextButton";
import Timer from "./component/Timer";
import Footer from "./Footer";

function App() {
  const initialState = {
    questions: [],
    // loading,error,ready,active,finish
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    Hightscore: 0,  
    TimeRemainder:null,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataRecived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFaild":
        return { ...state, status: "error" };
      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "StartQuiz":
        return { ...state, status: "active" ,TimeRemainder:state.questions.length*30};
     case "nextQuestion":
      return {...state,index: state.index+1,answer:null}
    case "finished":
      
      return { ...state, status:"finished" , Hightscore:state.points>state.Hightscore?state.points:state.Hightscore} 
     case "Restart":
      return {...initialState,Hightscore:state.Hightscore,questions:state.questions,status: "ready"}
    case "Timer":
      return {...state,TimeRemainder:state.TimeRemainder -1, status:state.TimeRemainder>0?state.status:'finished'}
      default:
        throw new Error("action is Unkonwn");
    }
  }
  const [{ questions, status, index, answer,points,Hightscore ,TimeRemainder}, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [data, setData] = useState(null);

  const numQuestion = questions.length;
  const Max = questions.reduce((prev,cur)=>prev + cur.points,0)

  useEffect(function () {
    async function Fetch() {
      try {
        const res = await fetch(`http://localhost:8880/questions`);
        if (!res.ok) throw new Error("Somthing not working");
        const dataJson = await res.json();
        dispatch({ type: "dataRecived", payload: dataJson });
      } catch (error) {
        dispatch({ type: "dataFaild" });
      }
    }
    Fetch();
  }, []);






  
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestion={numQuestion} />
        )}
        {status === "active" && (
         < >
         <Progress Max={Max} points={points} index={index} numQuestion={numQuestion}/>
         <Question
            answer={answer}
            question={questions[index]}
            dispatch={dispatch}
          />
          <Footer>
          <Timer dispatch={dispatch}  TimeRemainder={TimeRemainder}/>
          <NextButton index={index} numQuestion={numQuestion} answer={answer} dispatch={dispatch}/>

          </Footer>
          </>
        )}


  
        {/* {index>=questions.length -1 &&<button className="btn btn-ui" onClick={()=> dispatch({type:"finished"})} >Finish</button>} */}
        {status ==="finished" && <FinishScreen dispatch={dispatch} Hightscore={Hightscore} points={points} Max={Max} />}
      </Main>
    </div>
  );
}

export default App;
