import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import icon from '../../img/icon.svg';
import './RegistrationRoute.css';

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    }
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  };

  render() {
    return (
      <section>
        <img src={icon} alt='logo' />
        <p>
          Practice learning a language with the spaced repetition revision technique!
        </p>
        <h2>Sign up</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  };
};

export default RegistrationRoute
