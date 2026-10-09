# Interview Practice Tracker

A responsive, local-first dashboard for keeping a weekly interview-prep routine on track. Built with React, Vite, and plain CSS; no backend or account required.

## Features

- Dashboard stats for all questions, completed DSA problems, and completed Git/technical questions.
- Set and persist a separate machine-coding status.
- Add and delete questions, and update their status inline.
- Validate titles and required selections with inline form errors.
- Debounced title search with combinable category, status, and difficulty filters.
- Overall completion progress with a percentage and accessible progress indicator.
- Friendly empty and no-results states, responsive layouts, and touch-friendly controls.
- Automatically save and restore questions and machine-coding status with `localStorage`.

## Run locally

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.

To scaffold this project from scratch with Vite:

```sh
npm create vite@latest interview-practice-tracker -- --template react
cd interview-practice-tracker
npm install
npm run dev
```
