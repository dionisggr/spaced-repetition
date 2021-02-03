import React, { Component } from "react";
import LanguageService from "../../services/language-api-service";

class LearningRoute extends Component {
  state = {
    guess: "", answer: "", isCorrect: false,
    word: "", nextWord: "",
    total: 0, correct: 0, incorrect: 0
  };

  onSubmit = (evt, translation) => {
    evt.preventDefault();

    const guess = evt.target['learn-guess-input'].value;

    LanguageService.submitGuess(guess)
      .then(res => {
        const {
          nextWord, totalScore, wordCorrectCount,
          wordIncorrectCount, answer, isCorrect,
        } = res;

        const newState = {
          total: totalScore,
          correct: wordCorrectCount,
          incorrect: wordIncorrectCount,
          nextWord,
          isCorrect,
          answer,
          guess
        };

        if (this.state.word === "") {
          newState.word = nextWord;
        };

        this.setState(newState);
      })
      .catch(error => console.log({ error }));
  };

  nextWord = () => {
    const newState = this.state;
    newState.word = this.state.nextWord;
    newState.isCorrect = null;
    this.setState({ newState });
  };

  componentDidMount() {
    LanguageService.getFirstWord()
      .then((data) => {
        const {
          nextWord: word,
          totalScore: total,
          wordCorrectCount: correct,
          wordIncorrectCount: incorrect,
        } = data;

        const newState = { word, total, correct, incorrect };
        this.setnewState(newState);
      })
      .catch((error) => console.log({ error }));
  }

  render() {
    const {
      word, total, correct, incorrect, isCorrect, answer, guess
    } = this.state;

    const h2 =
      (!isCorrect)
        ? (isCorrect === false)
          ? 'Good try, but not quite right :('
          : 'Translate the word:'
        : 'You were correct! :D';
    
    const button =
      (isCorrect === null)
        ? <button type="submit">'Submit your answer'</button>
        : <button>Try another word!</button>

    return (
      <>
        <section className='DisplayScore'>
          <h2>{h2}</h2>
          <span>{word}</span>
          <label>You have answered this word correctly {correct} times.</label>
          <label>You have answered this word incorrectly {incorrect} times.</label>
          <p>Your total score is: {total}</p>
        </section>          
        <form className="translation" onSubmit={(evt) => this.onSubmit(evt, word.translation)}>
          <label htmlFor="learn-guess-input">
            What's the translation for this word?
          </label>
          <input
            type="text" placeholder="translation" required
            id="learn-guess-input" name="learn-guess-input"
          />
          {button}
        </form>
        <div className='DisplayFeedback'>
          <p>The correct translation for {word} was {answer} and you chose {guess}!</p>
        </div>
      </>
    );
  }
}

export default LearningRoute;
