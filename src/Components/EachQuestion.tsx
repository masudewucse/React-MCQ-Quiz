import React from "react";
import "./EachQuestion_style.css";
import { AnswerObject } from "../helper";
import Button from "react-bootstrap/Button";

export type QuestionProp = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const EachQuestion: React.FC<QuestionProp> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions
}) => {
  console.log("useans", userAnswer);
  return (
    <>
      <div>
        <p>
          Question: {questionNr} / {totalQuestions}
        </p>
        <p>{question}</p>

        {answers.map((item) => (
          <div key={item}>
            <Button
              variant={
                userAnswer?.correctAnswer == item
                  ? "success"
                  : "outline-primary"
              }
              key={item}
              disabled={userAnswer ? true : false}
              onClick={callback}
              className={
                userAnswer?.correct == false && item == userAnswer.answer
                  ? "wrongSelection each "
                  : "each"
              }
              value={item}
            >
              <span>{item}</span>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default EachQuestion;
