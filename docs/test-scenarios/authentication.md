# Garage test scenarios

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