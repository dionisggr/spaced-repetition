import React, { Component } from "react";
import LanguageService from "../../services/language-api-service";

class LearningRoute extends Component {
  state = { word: "", total: 0, correct: 0, incorrect: 0 };

  componentDidMount() {
    LanguageService.getNextWord()
      .then((data) => {
        console.log(data);
        const {
          nextWord: word,
          totalScore: total,
          wordCorrectCount: correct,
          wordIncorrectCount: incorrect,
        } = data;

        const state = { word, total, correct, incorrect };
        this.setState(state);
      })
      .catch((error) => console.log({ error }));
  }

  render() {
    const { word, total, correct, incorrect } = this.state;

    return (
      <section>
        <h2>Translate the word:</h2>
        <span>{word}</span>
        <label>You have answered this word correctly {correct} times.</label>
        <label>You have answered this word incorrectly {incorrect} times.</label>
        <form className="translation">
          <label for="learn-guess-input">
            What's the translation for this word?
          </label>
          <input
            type="text" placeholder="translation" required
            id="learn-guess-input" name="learn-guess-input"
          />
          <p>Your total score is: {total}</p>
          <button type="submit">Submit your answer</button>
        </form>
      </section>
    );
  }
}

export default LearningRoute;
