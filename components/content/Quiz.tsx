"use client";

import { faCheck, faCross, faSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/button";
import { useCallback, useEffect, useState } from "react";

interface Answer {
  text: string;
  image?: string;
}

interface Question {
  questionText: string;
  questionImage?: string;
  answers: Answer[];
  correctAnswers: number[];
  isMultipleChoice: boolean;
}

interface Quiz {
  intro: string;
  questions: Question[];
}

// example blob
const quiz: Quiz = {
  intro: "Welcome to the quiz",
  questions: [
    {
      questionText: "Which city is the capital of France?",
      answers: [
        { text: "London" },
        { text: "Paris" },
        { text: "Rome" },
        { text: "Madrid" },
      ],
      correctAnswers: [1],
      isMultipleChoice: false,
    },
    {
      questionText: "What are national dishes of Spain? (2 answers)",
      answers: [
        { text: "Paella" },
        { text: "Pizza" },
        { text: "Tortilla" },
        { text: "Pasta" },
      ],
      correctAnswers: [0, 2],
      isMultipleChoice: true,
    },
  ],
};

export default function Quiz({
  q,
  onCompleted,
}: {
  q: Quiz;
  onCompleted?: () => void;
}): JSX.Element {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const currentQuestion = q.questions?.[currentQuestionIndex];

  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);

  const check = useCallback(() => {
    let isCorrect = false;
    if (currentQuestion.isMultipleChoice) {
      isCorrect =
        currentQuestion.correctAnswers.every((correctAnswer) =>
          selectedAnswers.includes(correctAnswer),
        ) && currentQuestion.correctAnswers.length === selectedAnswers.length;
    } else {
      console.log(currentQuestion.correctAnswers[0], selectedAnswers[0]);
      isCorrect = currentQuestion.correctAnswers[0] === selectedAnswers[0];
    }

    if (isCorrect) {
      setShowCorrect(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswers([]);
        setShowCorrect(false);
        if (currentQuestionIndex === q.questions.length - 1) {
          onCompleted?.();
        }
      }, 1800);
    } else {
      setShowIncorrect(true);
      setTimeout(() => {
        setShowIncorrect(false);
      }, 1800);
    }
  }, [
    currentQuestion,
    currentQuestionIndex,
    selectedAnswers,
    q.questions.length,
    onCompleted,
  ]);

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      if (currentQuestion.isMultipleChoice) {
        setSelectedAnswers((selectedAnswers) => {
          if (!selectedAnswers.includes(answerIndex)) {
            return [...selectedAnswers, answerIndex];
          } else {
            return selectedAnswers.filter(
              (selectedAnswer) => selectedAnswer !== answerIndex,
            );
          }
        });
      } else {
        setSelectedAnswers([answerIndex]);
      }
    },
    [currentQuestion, setSelectedAnswers],
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 min-h-[300px]">
      {currentQuestionIndex === -1 ? (
        <>
          <p>{q.intro}</p>
          <p>
            (
            {q.questions.length === 1
              ? "1 question"
              : `${q.questions.length} questions`}
            )
          </p>
          <Button onClick={() => setCurrentQuestionIndex(0)}>Start</Button>
        </>
      ) : currentQuestionIndex >= 0 &&
        currentQuestionIndex < q.questions.length ? (
        <>
          {showCorrect ? (
            <p className="font-bold text-3xl text-green-500">Correct! 🥳</p>
          ) : showIncorrect ? (
            <p className="font-bold text-3xl text-red-500">Incorrect! 🥹</p>
          ) : (
            <>
              <h2>{currentQuestion.questionText}</h2>
              {currentQuestion.questionImage && ( // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentQuestion.questionImage}
                  alt={currentQuestion.questionText}
                />
              )}
              <div className="flex flex-col w-full gap-4">
                {currentQuestion.answers.map((answer, index) => (
                  <Button
                    variant="ghost"
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`${
                      selectedAnswers.includes(index) ? "font-bold" : ""
                    }`}
                  >
                    {answer.image && ( // eslint-disable-next-line @next/next/no-img-element
                      <img src={answer.image} alt={answer.text} />
                    )}
                    {answer.text}{" "}
                    {selectedAnswers.includes(index) && (
                      <FontAwesomeIcon icon={faCheck} className="ml-2" />
                    )}
                  </Button>
                ))}
              </div>
              <Button onClick={check}>Check</Button>
            </>
          )}
        </>
      ) : (
        <p>Quiz complete</p>
      )}
    </div>
  );
}
