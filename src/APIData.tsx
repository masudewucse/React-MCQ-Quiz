import React from "react";
import axios from "axios";

export type Question = {
  category: string,
  correct_answer: string,
  difficulty: string,
  incorrect_answers: string[],
  question: string,
  type: string
};

export type QuestionRefrase = Question & { answers: string[] };

export const APIData = async (amount: number) => {
  const strData: any = [];
  await axios
    .get(
      `https://opentdb.com/api.php?amount=${amount}&difficulty=easy&type=multiple`
    )
    .then((result) => {
      const data = result.data.results;
      //return data;
      const reformattedData = data.map((question: Question) => ({
        ...question,
        answers: [...question.incorrect_answers, question.correct_answer].sort(
          () => Math.random() - 0.5
        )
      }));
      strData.push(reformattedData);
      //return reArrangeData;
      //console.log(reArrangeData);
    })
    .catch((error) => {
      console.log(error);
    });
  return strData[0];
};
