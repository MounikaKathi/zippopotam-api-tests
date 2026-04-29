# Zippopotam API BDD Test Framework

Simple BDD automation framework for testing the Zippopotam postcode lookup API using Cucumber, Playwright, and TypeScript.

## Project Overview

This project tests the API:

```text
https://api.zippopotam.us
```

## Tech Stack

- TypeScript
- Cucumber BDD
- Playwright API Testing
- Node.js

## Project Structure

```text
IPO_TEST_SAMPLE/
├── features/
│   └── zippopotam-api.feature
├── step-definitions/
│   └── zippopotam.steps.ts
├── support/
│   ├── hooks.ts
│   └── world.ts
├── reports/
│   ├── cucumber-report.html
│   └── cucumber-report.json
├── cucumber.js
├── package.json
└── tsconfig.json
```

## Installation

Install project dependencies:

```bash
npm install
```

## Run Tests

Run the BDD tests:

```bash
npm run test:bdd
```

## Open HTML Report

After running the tests, open the report in a browser.

```bash
open reports/cucumber-report.html
```
