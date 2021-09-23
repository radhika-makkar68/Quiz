import React, { useEffect, useState } from "react";
import { QuizData } from "./QuizData";

function Quiz() {
  const [userAnswer, setUserAnswer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [quizEnd, setQuizEnd] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [correctAnswer, setCorrectAnswers] = useState([]);
  const [quiz1button, setQuiz1Button] = useState(false);

  const loadQuiz = () => {
    setQuestion(QuizData[currentIndex].question);
    setAnswer(QuizData[currentIndex].answer);
    setOptions(QuizData[currentIndex].options);
  };

  const nextQuestionHandler = () => {
    setCurrentIndex(currentIndex + 1);
    if (userAnswer === answer) {
      setScore(score + 1);
    }
  };

  const checkAnswer = (answer) => {
    correctAnswer.push(answer);
    setUserAnswer(answer);
    setDisabled(false);
  };

  const finishHandler = () => {
    if (currentIndex === QuizData.length - 1) {
      setQuizEnd(true);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  useEffect(() => {
    setQuestion(QuizData[currentIndex].question);
    setAnswer(QuizData[currentIndex].answer);
    setOptions(QuizData[currentIndex].options);
  }, [currentIndex]);

  if (quizEnd) {
    return (
      <div className="quiz1 scroll">
        <h3>Game Over. Final score is {score + 1} points</h3>
        <p>Quiz Report Card:</p>
        <ul>
          {QuizData.map((item, index) => {
            if (item.answer === correctAnswer[index]) {
              return (
                <li
                  className="options"
                  style={{ backgroundColor: "green" }}
                  key={index}
                >
                  {item.answer}
                </li>
              );
            }
            if (item.answer !== correctAnswer[index]) {
              return (
                <li
                  className="options"
                  style={{ backgroundColor: "red" }}
                  key={index}
                >
                  {item.answer}
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <div className="quiz1">
        <h1 className="heading-quiz1">Quiz1</h1>
        {quiz1button ? (
          <>
            <h2 className="question1">{question}</h2>
            <span>{`Question ${currentIndex + 1} of ${
              QuizData.length - 1
            }`}</span>
            {options.map((option) => (
              <p
                key={option.id}
                className={`options
                ${userAnswer === option ? "selected" : null}
                `}
                onClick={() => checkAnswer(option)}
              >
                {option}
              </p>
            ))}
            {currentIndex < QuizData.length - 1 && (
              <button
                className="ui inverted button"
                disabled={disabled}
                onClick={nextQuestionHandler}
              >
                Next Question
              </button>
            )}
            {currentIndex === QuizData.length - 1 && (
              <button
                className="ui inverted button"
                disabled={disabled}
                onClick={finishHandler}
              >
                Finish
              </button>
            )}
          </>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => setQuiz1Button(true)}
          >
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
