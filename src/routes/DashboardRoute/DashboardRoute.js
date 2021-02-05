import React from "react";
import { Link } from "react-router-dom";
import LanguageService from "../../services/language-api-service";
import "./DashboardRoute.css";

class DashboardRoute extends React.Component {
  state = { language: "", words: [] };

  componentDidMount() {
    LanguageService.getLanguageData()
      .then((res) => {
        const { language, words } = res;
        this.setState({ language, words });
      })
      .catch((error) => console.log({ error }));
  }

  render() {
    const { language, words } = this.state;
    return (
      <section className="dashboard">
        <label className="dashboard">Dashboard</label>
        <h2>
          Language: <span>{language.name}</span>
        </h2>
        <div className="practice-words">
          <h3>Words to practice</h3>
          <ul>
            {words.slice(0, 10).map((word, idx) => (
              <li key={idx}>
                <h4>{word.original}</h4>
                <label>correct answer count: {word.correct_count}</label>
                <label>incorrect answer count: {word.incorrect_count}</label>
              </li>
            ))}
          </ul>
          <label className="correct">
            Total correct answers: {language.total_score}
          </label>
        </div>

        <div className="answer-history">
          <label className="score">Total Score: </label>
          <span>{language.total_score}</span>
        </div>

        <Link to="/learn">Start practicing</Link>
      </section>
    );
  }
}

export default DashboardRoute;
