# Repository Guidelines

## Project Structure & Module Organization

This repository contains Cypress E2E, API, and visual regression tests, not application source code.

- `cypress/e2e/work/`: UI specs; `cypress/e2e/api/`: API specs.
- `cypress/support/`: shared commands and setup; `cypress/pages/`: Page Objects; `cypress/fixtures/`: test data.
- `cypress/snapshots/`: baseline, actual, and difference images; `cypress/reports/`: generated reports.
- `docs/`: requirements, scenarios, selectors, test strategy, and definition of done.
- `cypress.config.js`: default configuration; `cypress.staging.config.js`: alternate configuration.
- `.github/workflows/cypress.yml`: Chrome CI for pushes and pull requests to `main`, plus manual runs.

## Build, Test, and Development Commands

Use Node.js 24 to match CI. No application build step is configured.

- `npm ci`: install dependencies from `package-lock.json`.
- `npm run cy:open`: open the interactive Cypress runner.
- `npm run cy:run`: run specs headlessly.
- `npm run cy:chrome`: run specs in Chrome.
- `npm run cy:run -- --spec cypress/e2e/work/env-login.cy.js`: verify one spec.
- `npm run report:merge`: merge Mochawesome JSON results.
- `npm run report:html`: generate HTML from `merged-report.json`.

For manual reporting, set `DISABLE_CYPRESS_MOCHAWESOME_REPORTER=true` before running tests, matching CI; generate reports after JSON results exist.

## Coding Style & Naming Conventions

Use JavaScript and two-space indentation. Match surrounding quote and semicolon conventions. Configuration uses CommonJS; specs and support files use imports. Name specs `<feature>.cy.js` and Page Objects `<Feature>Page.js`. No formatter or linter is configured.

Reuse existing commands, fixtures, helpers, and Page Objects. Prefer `data-cy`, `data-test`, or `data-testid` selectors over classes or DOM position.

## Testing Guidelines

Before changing tests, inspect `package.json`, `cypress.config.js`, support files, and relevant specs. Before adding tests, inspect `examples/tests/` if present; current examples reside in `examples/test/`.

Follow `docs/test-strategy.md` and `docs/test-definition-of-done.md`. Link tests to requirements and scenarios. Prefer API coverage for CRUD and validation; reserve UI tests for user-visible behavior. No numerical coverage threshold is configured.

Keep tests independent. Use meaningful assertions and request aliases with `cy.intercept()`; never add arbitrary waits such as `cy.wait(5000)`. Execute affected specs, report actual failures, and never weaken assertions to obtain a pass.

## Commit & Pull Request Guidelines

Use short imperative commit subjects, consistent with history: `Add Cypress tests and GitHub Actions`. PRs should explain changes, link relevant requirements or issues, and record executed commands and results. Include screenshots or report artifacts for visual changes.

## Security & Configuration

Never hardcode credentials or tokens. Supply `SAUCE_USER` and `SAUCE_PASSWORD` through environment variables locally and GitHub Secrets in CI. Keep secrets out of fixtures, logs, and artifacts.
