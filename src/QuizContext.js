import { createContext, useContext } from "react";
import React, { useEffect, useReducer } from "react";


const  QuizContext =createContext();


function QuizProvider({children}){
    const initialState = {
        questions: [],
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
        <QuizContext.Provider value={
            {questions,
             status,
              index, 
              answer,
              points,
              Hightscore ,
              TimeRemainder,
              dispatch,
              Max,
              numQuestion,
            }
        }>
            {children}
        </QuizContext.Provider>
    )
}

function useQuize() {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }
    return context;
}

export {QuizProvider,useQuize}