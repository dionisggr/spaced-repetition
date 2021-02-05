import React, { Component } from "react";
import LanguageService from "../../services/language-api-service";
import './LearningRoute.css';

class LearningRoute extends Component {
  state = {
    guess: "", answer: "", isCorrect: null,
    word: "", nextWord: "",
    total: 0, correct: 0, incorrect: 0
  };

  onSubmit = (evt) => {
    evt.preventDefault();

    const isCorrect = this.state.isCorrect;

    if (isCorrect === true || isCorrect === false) {
      const newState = { ...this.state };
      newState.word = this.state.nextWord;
      newState.isCorrect = undefined;
      newState.guess = null;
      newState.correct = this.state.wordCorrectCount;
      newState.incorrect = this.state.wordIncorrectCount;
      
      return this.setState(newState);
    }

    let guess = evt.target['learn-guess-input'].value;
    evt.target['learn-guess-input'].value = '';

    LanguageService.submitGuess(guess)
      .then(res => {
        const {
          nextWord, totalScore, wordCorrectCount,
          wordIncorrectCount, answer, isCorrect,
        } = res;

        const newState = {
          total: totalScore,
          wordCorrectCount,
          wordIncorrectCount,
          nextWord,
          answer,
          guess,
          isCorrect
        };

        this.setState(newState);
        
      })
      .catch(error => console.log({ error }));
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
    let {
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
    
    const feedback = 
      (!isCorrect)
        ? null
        : <div className='DisplayFeedback'>
            <p>The correct translation for
              <span class='answer'>{word}</span>
              was
              <span className='guess'>{answer}</span>
              and you chose
              <span>{guess}</span>!
            </p>
          </div>
    
    const button =
      (isCorrect === undefined || isCorrect === null)
        ? <button type="submit">Submit your answer</button>
        : <button type='submit'>Try another word!</button>
    
    correct = (isCorrect) ? correct + 1 : correct;
    incorrect = (isCorrect === false) ? incorrect + 1 : incorrect;

    return (
      <>
        <section className='DisplayScore'>
          <h2>{h2}</h2>
          <span>{word}</span>
          <label>
            You have answered this word correctly
              <span className='correct'>{correct}</span> times.
          </label>
          <label>
            You have answered this word incorrectly
              <span className='incorrect'>{incorrect}</span> times.
          </label>
          <p>Your total score is: {total}</p>
        </section>          
        <form className="translation" onSubmit={(evt) => this.onSubmit(evt, word.translation)}>
          {
            (!isCorrect && isCorrect !== false)
              ? <>
                  <label htmlFor="learn-guess-input">
                  What's the translation for this word?
                  </label>
                  <input
                    type="text" placeholder="translation" required
                    id="learn-guess-input" name="learn-guess-input"
                  />
                </>
              : null
          }

          {button}
        </form>
        {feedback}
      </>
    );
  }
}

export default LearningRoute;
