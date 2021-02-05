&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A simple Spanish language trainer App for anyone!

### Live:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; https://spaced-repetition-blue.vercel.app/
### API:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; https://fathomless-headland-59350.herokuapp.com/ *(Landing Page)*

### Kanban board:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; https://github.com/dionisggr/spaced-repetition/projects/1

### Deployment Platform:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vercel

### Languages/Tools:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HTML5, CSS3, Javascript, React, Mocha, Chai, API fetches

---
### DESCRIPTION
The App allows users to train in Spanish for common words using the spaced repetition technique, and slowly scale up to more complex but less frequently used words. It allows for users to keep track of the last word in their history, and their score progress. It will further keep history of each time the user has answered the translation correctly and incorrectly.

### USER STORIES:
- As a prospective user:
  - I can register an account so that I can login and use the application
    - I'm directed to a registration page
    - On that page, I can enter my name, username, and password
    - If all of my information is correct, upon clicking the submit button, I'm redirected to my dashboard
    - If any of my information is incorrect, I'm given an appropriate error message and the option to correct my information
- As a registered user:
  - I can navigate to the "login" page
  - I can login to the application so that I can begin learning
  - I can navigate back to the registration page
  - I can enter my username and password
  - If my submitted username and password are incorrect, I'm given an appropriate error message so that I can attempt to login again
  - If my submitted username and password are correct, the app "logs me in" and redirects me to my dashboard

- As a logged in user:
  - The application remembers that I'm logged in and doesn't redirect me to the registration page
  - I'm directed to a dashboard where I can see my progress learning my language
  - The app displays my name and presents a logout button
  - The application refreshes my auth token so that I can remain logged in while active on the page
  - The app gets my language and words progress from the server
    - I'm shown my language
    - I'm shown the words to learn for the language
    - I'm shown my count for correct and incorrect responses for each word
    - I'm given a button/link to start learning
    - I'm shown the total score for guessing words correctly
  - I can learn words using spaced repetition
    - The app gets my next word to learn details from the server
    - I'm shown the word to learn
    - I'm shown my current total score
    - I'm shown the number of correct and incorrect guesses for that word
    - I'm presented an input to type my answer/guess for the current words translation
  - I can see feedback on my submitted answers.
    - The app POSTs my answer for this word to the server
    - The server will update my appropriate scores in the database
    - After submitting, I get feedback whether I was correct or not
    - After submitting, I'm told the correct answer
    - My total score is updated
    - I'm told how many times I was correct and incorrect for the word
    - I can see a button to try another word
  - I can learn another word after receiving feedback from my previous answer
    - I'm presented with a button that I can click to learn another word
    - When clicking on the button I see the next word to learn
---

### NAVIGATION

#### LOGIN

[Login](https://github.com/dionisggr/spaced-repetition-api/blob/main/README.md): `POST /api/auth/token`
- 'Admin' credentials
  - Username: `dwight`
  - Password: `pass`
      
Home Page: Welcome Page
![HomePage]()

Dashboard: Renders language/words progress and current scores
![Dashboard]()

Learning Page: Renders word to practice
![Learning Page]()

Correct Answer Page: Renders correct answer feedback and updated fields
![Project Page]()

Incorrect Answer Page: Renders incorrect answer feedback and updated fields
![Project Page]()

---
## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application *Cypress.io* for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

Find instructions to setup the API here https://github.com/Thinkful-Ed/spaced-repetition-api.

## Running project

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.

## Running the tests

This project uses [Cypress IO](https://docs.cypress.io) for integration testing using the Chrome browser.

Cypress has the following expectations:

- You have cypress installed (this is a devDependency of the project)
- You have your application running at http://localhost:3000.
  - You can change the address of this expectation in the `./cypress.json` file.
- Your `./src/config.js` is using http://localhost:8000/api as the `API_ENDPOINT`

To start the tests run the command:

```bash
npm run cypress:open
```

On the first run of this command, the cypress application will verify its install. Any other runs after this, the verification will be skipped.

The command will open up the Cypress application which reads tests from the `./cypress/integration/` directory. You can then run individual tests by clicking on the file names or run all tests by clicking the "run all tests" button in the cypress GUI.

Tests will assert against your running localhost client application.

You can also start all of the tests in the command line only (not using the GUI) by running the command:

```bash
npm run cypress:run
```

This will save video recordings of the test runs in the directory `./cypress/videos/`.
