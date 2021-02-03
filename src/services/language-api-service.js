import TokenService from "./token-service";
import config from "../config";

const { API_ENDPOINT } = config;

function getLanguageData() {
  return fetch(`${API_ENDPOINT}/language`, {
    headers: { Authorization: `Bearer ${TokenService.getAuthToken()}` },
  }).then((res) =>
    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
  );
}

function getFirstWord() {
  return fetch(`${API_ENDPOINT}/language/head`, {
    headers: {Authorization: `Bearer ${TokenService.getAuthToken()}`}
  }).then((res) =>
    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
  );
};

function submitGuess(guess) {
  return fetch(`${API_ENDPOINT}/language/guess`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TokenService.getAuthToken()}`,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({ guess })
  }).then((res) =>
    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
  );
};


const LanguageService = {
  getLanguageData, getFirstWord, submitGuess
}


export default LanguageService;
