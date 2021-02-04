import React, { Component } from "react";
import LanguageService from "../../services/language-api-service";

class LearningRoute extends Component {
  state = {
    guess: "", answer: "", isCorrect: null,
    word: "", nextWord: "",
    total: 0, correct: 0, incorrect: 0
  };

  onSubmit = (evt) => {
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
          answer,
          guess,
          isCorrect
        };

        if (this.state.word === "") {
          newState.word = this.state.nextWord;
        };

        if (this.state.isCorrect === undefined) {
          delete newState.isCorrect;
        };

        console.log(this.state, newState);

        this.setState(newState);
        
      })
      .catch(error => console.log({ error }));
  };

  nextWord = () => {
    const newState = { ...this.state };
    newState.word = this.state.nextWord;
    newState.isCorrect = undefined;
    this.setState(newState);
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

        const newState = {
          word, total, correct, incorrect
        };
        this.setState(newState);
      })
      .catch((error) => console.log({ error }));
  }

  render() {
    console.log(this.state);
    const {
      word, total, correct, incorrect, isCorrect, answer, guess
    } = this.state;

    const h2 =
      (isCorrect === undefined || isCorrect === null)
        ? 'Translate the word:'
        : (isCorrect === false)
          ? 'Good try, but not quite right :('
          : (isCorrect === true)
            ? 'You were correct! :D'
            : null;
    
    const button =
      (isCorrect === undefined || isCorrect === null)
        ? <button type="submit">Submit your answer</button>
        : <button onClick={this.nextWord}>Try another word!</button>

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
