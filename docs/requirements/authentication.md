# SauceDemo authentication requirements

These acceptance criteria document the SauceDemo login UI and access behavior
observed on 2026-10-08. Scenarios: [authentication scenarios](../test-scenarios/authentication.md#saucedemo-authentication-scenarios).

| Requirement | Expected behavior |
| --- | --- |
| R-AUTH-001 | A valid, unlocked account can sign in and see the Products inventory with product items. |
| R-AUTH-002 | Refreshing the inventory preserves an authenticated session. |
| R-AUTH-003 | The login form rejects an empty username or password and displays the corresponding required-field message. |
| R-AUTH-004 | An unknown username or incorrect password is rejected with the credentials mismatch message. |
| R-AUTH-005 | A locked account is denied login and inventory access, even though SauceDemo creates a username cookie. |
| R-AUTH-006 | Opening the inventory without an authorized session redirects to login and explains that login is required. |
| R-AUTH-007 | Logout returns to the login page, removes the session cookie, and prevents reopening the inventory. |

## Existing inventory and cart notes

## R-001

Logged-in user can open iventar.

## R-002

User can add a товар до кошика.

Required fields:

- Ціна
- Назва
- Кількість


## R-003

After successful creation the invenatar must appear in card.
