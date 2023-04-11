# INSTALLING THE PROJECT
Use `npm install` to install all modules needed based on package.json.

# OPENING CYPRESS LAUNCHPAD 
Use `npx cypress open` to open the launchpad and select the test approach (e2e testing or component testing). You can define a different browser if needed to run the launchpad by using `cross-env npx cypress open --browser chrome`. 
To make it easier, just run the command added to npm Scripts with the Chrome browser as default:

```bash
    npm run cy:open
```

# RUNNING TESTS
This project supports specs in Gherkin format which means that we are able to run the tests in several ways, but mainly:

- by spec file path:
```bash
    npm run cy:run:headed:spec "cypress/e2e/features/sign-in.feature"
```

- by cucumber feature/scenario tags:
```bash
    npm run cy:run:headed:tag @invalid-sign-in 
    npm run cy:run:headed:tag @authentication 
```

# IMPLEMENTING NEW TESTS
To create a new test, you need to perform these actions into the project:
### 1) Create a new `*.feature` into the `/features/` folder
### 2) Write or paste the Gherkin content within the `*.feature`
### 3) Run the test command for the feature create in order to copy the step definition snippets from terminal
### 4) Import the cypress-cucumnber-preprocessor within a new `*.steps.js` into the `/steps/`foldercucumber
```javascript
    import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
```
### 5) Paste the snippets copied from terminal into the same file
### 6) Create a new `*.po.js` as a page object file into the `/pages/` to maintain the locators and element interactions
### 7) Import the page object created to the `*.steps.js` and implement the logics that satisfy the behaviours defined by the Gherkin steps