import React from 'react';
import './Loader.css';

class Loader extends React.Component {
  state = { message: 'Logging In...' };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ message: 'Still working here...'});
    }, 4000);

    setTimeout(() => {
      this.setState({ message: 'Do you exist...' })
    }, 8000);

    setTimeout(() => {
      this.setState({ message: 'I mean...' })
    }, 12000);

    setTimeout(() => {
      this.setState({ message: 'Invalid request!' })
    }, 15000);
  }

  render() { 
    const { message } = this.state;

    return (
      <div className='loading'>
        <h3>{message}</h3>
      </div>
    );
  };
};

export default Loader;