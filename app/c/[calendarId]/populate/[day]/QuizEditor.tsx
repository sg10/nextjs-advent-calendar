import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";

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

export default function QuizEditor({
  quiz,
  onChange,
}: {
  quiz: Quiz;
  onChange: (quiz: Quiz) => void;
}) {
  const addQuestion = () => {
    onChange({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          questionText: "",
          answers: [{ text: "" }],
          correctAnswers: [0],
          isMultipleChoice: false,
        },
      ],
    });
  };

  const updateQuestion = (index: number, question: Question) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index] = question;
    onChange({ ...quiz, questions: newQuestions });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...quiz.questions];
    newQuestions.splice(index, 1);
    onChange({ ...quiz, questions: newQuestions });
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        label="Introduction Text"
        value={quiz.intro || ""}
        onValueChange={(value) => onChange({ ...quiz, intro: value })}
      />

      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="border p-4 rounded">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Question {qIndex + 1}</h3>
              <Button
                color="danger"
                size="sm"
                onClick={() => removeQuestion(qIndex)}
              >
                Remove Question
              </Button>
            </div>

            <Textarea
              label="Question Text"
              value={question.questionText || ""}
              onValueChange={(value) =>
                updateQuestion(qIndex, { ...question, questionText: value })
              }
            />

            <Input
              label="Question Image URL (optional)"
              value={question.questionImage || ""}
              onChange={(e) =>
                updateQuestion(qIndex, {
                  ...question,
                  questionImage: e.target.value,
                })
              }
            />

            <div className="flex items-center gap-2">
              <Checkbox
                isSelected={question.isMultipleChoice}
                onValueChange={(checked) =>
                  updateQuestion(qIndex, {
                    ...question,
                    isMultipleChoice: checked,
                    correctAnswers: checked
                      ? [0]
                      : question.correctAnswers.slice(0, 1),
                  })
                }
              >
                Multiple Choice
              </Checkbox>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-bold">Answers</h4>
              {question.answers.map((answer, aIndex) => (
                <div key={aIndex} className="flex gap-2">
                  <Input
                    value={answer.text}
                    onValueChange={(value) => {
                      const newAnswers = [...question.answers];
                      newAnswers[aIndex] = {
                        ...answer,
                        text: value,
                      };
                      updateQuestion(qIndex, {
                        ...question,
                        answers: newAnswers,
                      });
                    }}
                  />
                  <Input
                    placeholder="Image URL (optional)"
                    value={answer.image || ""}
                    onValueChange={(value) => {
                      const newAnswers = [...question.answers];
                      newAnswers[aIndex] = {
                        ...answer,
                        image: value,
                      };
                      updateQuestion(qIndex, {
                        ...question,
                        answers: newAnswers,
                      });
                    }}
                  />
                  <Checkbox
                    isSelected={question.correctAnswers.includes(aIndex)}
                    onValueChange={(checked) => {
                      let newCorrectAnswers = [...question.correctAnswers];
                      if (checked) {
                        if (!question.isMultipleChoice) {
                          newCorrectAnswers = [aIndex];
                        } else {
                          newCorrectAnswers.push(aIndex);
                        }
                      } else {
                        newCorrectAnswers = newCorrectAnswers.filter(
                          (i) => i !== aIndex,
                        );
                      }
                      updateQuestion(qIndex, {
                        ...question,
                        correctAnswers: newCorrectAnswers,
                      });
                    }}
                  />
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => {
                      const newAnswers = [...question.answers];
                      newAnswers.splice(aIndex, 1);
                      updateQuestion(qIndex, {
                        ...question,
                        answers: newAnswers,
                        correctAnswers: question.correctAnswers
                          .filter((i) => i !== aIndex)
                          .map((i) => (i > aIndex ? i - 1 : i)),
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                onClick={() => {
                  const newAnswers = [...question.answers, { text: "" }];
                  updateQuestion(qIndex, {
                    ...question,
                    answers: newAnswers,
                  });
                }}
              >
                Add Answer
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button onClick={addQuestion}>Add Question</Button>
    </div>
  );
}
