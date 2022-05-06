import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null, // {[id]: 'success' 'error'}
    quiz: [
      {
        id: 1,
        question: "Сколько будет 2 + 2 * 2 ?",
        rightAnswerId: 2,
        answers: [
          { text: "4", id: 1 },
          { text: "6", id: 2 },
          { text: "8", id: 3 },
          { text: "12", id: 4 },
        ],
      },
      {
        id: 2,
        question: "Где вы были все эти 8 лет?",
        rightAnswerId: 4,
        answers: [
          { text: "А я вам сейчас покажу", id: 1 },
          { text: "Откуда на Беларусь", id: 2 },
          { text: "Готовилось нападение", id: 3 },
          { text: "И если бы за 6 часов до операции", id: 4 },
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {
    const question = this.state.quiz[this.state.activeQuestion];
    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: { [answerId]: "success" },
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          console.log("Finished!");
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({
        answerState: { [answerId]: "error" },
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz!</h1>
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            activeQuestion={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
