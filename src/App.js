
// import All from "./All";
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
import { useQuize } from "./QuizContext";
function App() {
  const {status} = useQuize();
  
  return (
    <div className="app">
     
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {status === "finished" && <FinishScreen />}
      </Main>

    </div>
  );
}

export default App;
