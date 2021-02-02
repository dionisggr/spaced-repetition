import TokenService from "./token-service";

import config from "../config";

function getLanguageData() {
  const { API_ENDPOINT } = config;
  return fetch(`${API_ENDPOINT}/language`, {
    headers: { Authorization: `Bearer ${TokenService.getAuthToken()}` },
  }).then((res) =>
    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
  );
}

const LanguageService = { getLanguageData }


export default LanguageService;
