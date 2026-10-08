# SauceDemo authentication scenarios

Requirements: [authentication requirements](../requirements/authentication.md).

All scenarios start with an isolated browser session. Provide a valid, unlocked
SauceDemo account through `SAUCE_USER` and `SAUCE_PASSWORD` environment variables;
CI already maps these from GitHub Secrets. The locked-account scenario reads the
public locked demo username from the login page and uses `SAUCE_PASSWORD`.
Do not copy credentials into fixtures or spec files.

| Scenario | Requirement | Steps | Expected result | Spec |
| --- | --- | --- | --- | --- |
| AUTH-001 | R-AUTH-001 | Submit valid credentials. | Inventory URL, Products heading, list and product items are visible; login form and error are absent. | `login.cy.js` |
| AUTH-002 | R-AUTH-002 | Sign in, then reload the inventory. | Inventory remains accessible with visible products. | `login.cy.js` |
| AUTH-003 | R-AUTH-003 | Submit both fields empty. | Username required error; no inventory or session. | `negative-login.cy.js` |
| AUTH-004 | R-AUTH-003 | Fill only the password and submit. | Username required error; no inventory or session. | `negative-login.cy.js` |
| AUTH-005 | R-AUTH-003 | Fill only the username and submit. | Password required error; no inventory or session. | `negative-login.cy.js` |
| AUTH-006 | R-AUTH-004 | Submit an unknown username with the valid password. | Credentials mismatch error; no inventory or session. | `negative-login.cy.js` |
| AUTH-007 | R-AUTH-004 | Submit the valid username with an incorrect password. | Credentials mismatch error; no inventory or session. | `negative-login.cy.js` |
| AUTH-008 | R-AUTH-004 | Submit both incorrect username and password. | Credentials mismatch error; no inventory or session. | `negative-login.cy.js` |
| AUTH-009 | R-AUTH-005 | Submit the published locked account, then visit the inventory directly. | Locked-account error, then login-required error; inventory inaccessible despite the username cookie. | `negative-login.cy.js` |
| AUTH-010 | R-AUTH-006 | Visit the inventory without logging in. | Redirect to login, login-required error, no inventory or session. | `negative-login.cy.js` |
| AUTH-011 | R-AUTH-006, R-AUTH-007 | Sign in, open menu, log out, then revisit the inventory. | Login page, removed cookie, and guarded inventory. | `env-login.cy.js` |

These UI tests cover form messages, navigation and visible access restrictions.
They intentionally exercise the real app; SauceDemo handles demo login locally,
so no fabricated authentication API interception or fixed delay is needed.
The host returns HTTP 404 for direct `/inventory.html` navigation while serving
the SPA. Direct-route tests permit that status but still assert the route guard.

Run with Node.js 24, the credential environment variables set, and
`DISABLE_CYPRESS_MOCHAWESOME_REPORTER=true`:

```shell
npm run cy:run -- --browser chrome --spec "cypress/e2e/work/login.cy.js,cypress/e2e/work/negative-login.cy.js,cypress/e2e/work/env-login.cy.js" --config video=false
```

Failure screenshots are disabled for these suites because the login page displays
credentials. Credential typing is hidden through the existing `typeSecret`
command. Keep video recording disabled as shown above.

## Existing Garage scenarios

## GARAGE-001 Add car successfully

Preconditions:
- User exists.
- User is logged in.
- Garage is opened.

Steps:
1. Click Add car.
2. Select Audi.
3. Select TT.
4. Enter mileage 12000.
5. Click Add.

Expected result:
Audi TT appears in Garage.

Requirement:
R-GARAGE-002


## GARAGE-002 Mileage is required

Steps:
1. Open Add car modal.
2. Select Audi.
3. Select TT.
4. Leave Mileage empty.
5. Try to save.

Expected:
Car cannot be created.

Requirement:
R-GARAGE-002
