import React, { useState } from "react";
import "./Components/EachQuestion_style.css";
import { APIData, Question, QuestionRefrase } from "./APIData";
import EachQuestion from "./Components/EachQuestion";
import { AnswerObject } from "./helper";
import { Button, Spinner, Container, Jumbotron, Toast } from "react-bootstrap";

function App() {
  const QUESTIONS = 15;
  const [score, setScore] = useState<number>(0);
  const [number, setNumber] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionRefrase[]>([]);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [currentQuestion, setCurrentQuestion] = useState<Question[]>([]);

  // console.log(APIData(TOTALQUESTION));
  // console.log(QuestionRefrase);

  const startQuestion = async () => {
    setGameOver(false);
    setLoader(true);
    const questions = await APIData(QUESTIONS);
    if (questions.length > 0) {
      setQuestions(questions);
      setScore(0);
      setNumber(0);
      setUserAnswer([]);
      setLoader(false);
    }

    // console.log(">>", questions[number].question);
  };

  const goNextQuestion = () => {
    const nextQuestion = number + 1;

    if (number + 1 === QUESTIONS) {
      setGameOver(false);
    } else {
      setNumber(nextQuestion);
    }
  };

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = event.currentTarget.value;
      const correct = questions[number].correct_answer == answer;
      if (correct) setScore((prev) => prev + 1);

      const PrepareAnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };

      setUserAnswer((prev) => [...prev, PrepareAnswerObject]);
      // if (number === TOTALQUESTION - 1) {
      //   setGameOver(true);
      // }
      // console.log(PrepareAnswerObject);
      // console.log("useranswer", userAnswer);
    }
  };

  return (
    <div className="App">
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">MCQ Test</h1>

          {!gameOver ? <p>Score {score}</p> : null}

          {loader && <Spinner animation="border" />}

          {gameOver || userAnswer.length === QUESTIONS ? (
            <Button onClick={startQuestion}>Start Exam</Button>
          ) : null}

          {questions.length > 0 && !loader && !gameOver && (
            <EachQuestion
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswer ? userAnswer[number] : undefined}
              callback={checkAnswer}
              questionNr={number + 1}
              totalQuestions={QUESTIONS}
            />
          )}
          {!gameOver && !loader && number !== QUESTIONS - 1 && (
            <Button className="next-question" onClick={goNextQuestion}>
              Next Question
            </Button>
          )}
        </Jumbotron>
      </Container>
    </div>
  );
}

export default App;
