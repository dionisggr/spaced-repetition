import React from 'react';

const LanguageContext = React.createContext({
  language: '',
  words: []
});

export default LanguageContext;