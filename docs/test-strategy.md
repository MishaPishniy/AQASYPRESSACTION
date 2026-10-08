# Test Strategy

## UI tests

Use Cypress UI tests for:

- critical user flows;
- forms;
- user-visible behaviour.

## API tests

Prefer API tests for:

- CRUD;
- validation;
- negative cases;
- data preparation.

## Do not test through UI

Do not create UI tests for functionality that can be reliably
verified through API unless UI behaviour itself is under test.

## Priorities

Critical:
- Login
- Registration
- Garage
- Add car

Medium:
- Profile
- Settings