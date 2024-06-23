import React, { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./component/Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./component/StartScreen";
import Question from "./component/Active";

function App() {
  const initialState = {
    questions: [],
    // loading,error,ready,active,finish
    status: "loading",
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataRecived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFaild":
        return { ...state, status: "error" };
      case "StartQuiz":return {...state, status: "active"}
      default:
        throw new Error("action is Unkonwn");
    }
  }
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  
  // const [data, setData] = useState(null);

 

  const numQuestion =questions.length;






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
        {status === "loading"&&<Loader /> }
        {status === "error"&&<Error /> }
        {status === "ready"&&<StartScreen dispatch={dispatch} numQuestion={numQuestion}/>
        }
        {status === "active"&&<Question /> }

      </Main>
    </div>
  );
}

export default App;
