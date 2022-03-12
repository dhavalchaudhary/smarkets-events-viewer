# Smarkets Events Viewer

## Contents of this documentation

1.  [Problem Statement](#problem-statement)
2.  [Technical documentation for running the project](#technical-documentation-for-running-the-project)
3.  [Scope for improvement](#scope-for-improvement)

## Problem Statement

Build an application that displays the popular events related to football and it's relevent info. The data can be fetched from the Smarkets events API - [popular events](https://api.smarkets.com/v3/popular/event_ids/sport/football/) and [event info](https://api.smarkets.com/v3/events/1824106/).

## Technical documentation for running the project

### Live site - https://smarkets-events-viewer.netlify.app/. For best experience, open the site on the browser.

### Prerequisites

- Ensure that the node package used in the machine `17.x.x`. Using the older versions might result into unforseen issues.
- Ensure that you have `npm` installed in your machine. <br /> _Note - You can also use yarn for all the commands mentioned below by replacing `npm` or `npm run` with `yarn`_

### Running the project

- Install all the dependencies for the project.

```sh
npm install
```

- Start the project.

```sh
npm start
```

This will automatically open [http://localhost:3000](http://localhost:3000) on the browser and run the app in development mode. The page will reload if you make edits. You will also see any lint errors in the console.

If the API calls are resulting in an error, there is a very high chance that you do not have access to the cors-anywhere domain. To get access, go to [cors-anywhere](https://cors-anywhere.herokuapp.com/corsdemo) and click on the _"Request temporary access to the demo server"_ button. If the access grant was succesful, you will see a _"You currently have temporary access to the demo server."_ message on the same page.

### Running the tests

We use [Jest](https://jestjs.io/) and [React Testing Library](https://github.com/testing-library/react-testing-library) as the basic tools for unit and integration testing. To run all the tests, execute the following command in the terminal

```sh
npm run test
```

### Formatting the code

We use prettier to format all the files according to the rules in `.prettierrc.json`. This keeps our code style consistent across the entire project. To format all the files, exceute the following command in the terminal

```sh
npm run prettier
```

## Scope for improvement

This section contains potential topics to improve user experience and developer experience

- Better User Experience by investing in design.
- Developer Experience
  - Testing
    - Adding e2e tests using tools like [Cypress](https://www.cypress.io/). These tests replicate real world user scenarios thus increasing our confidence in the app.
  - Monitoring and Alerting
    - Integrating tools like [Sentry](https://sentry.io/) or [LogRocket](https://logrocket.com/) for error tracking
    - Adding tools like [LogRocket](https://logrocket.com/) to track application performance metrics
    - Setup automated alerts to catch bugs before they affect a significant user base.
  - Automation
    - Adding linters to the project to maintain a style consistency
    - Introducing a CI/CD workflow using tools like [Github Actions](https://github.com/features/actions) or [Circle CI](https://circleci.com/). It will generate builds, run tests and deploy to testing environment when there are code changes on Github.
