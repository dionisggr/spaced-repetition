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

function getNextWord() {
  return fetch(`${API_ENDPOINT}/language/head`, {
    headers: {Authorization: `Bearer ${TokenService.getAuthToken()}`}
  }).then((res) =>
    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
  );
};

const LanguageService = { getLanguageData, getNextWord }


export default LanguageService;
