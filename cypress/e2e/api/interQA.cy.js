describe('QAuto — cy.intercept()', () => {
  beforeEach(() => {
    cy.visitQAuto();
  });

  it('Перехоплює запит авторизації', () => {
    cy.intercept('POST', '**/api/auth/signin')
      .as('signInRequest');

    cy.loginToQAuto();

    cy.wait('@signInRequest').then(({ request, response }) => {
      cy.log(`Status: ${response.statusCode}`);
      cy.log(`Response: ${JSON.stringify(response.body)}`);

      expect(request.method).to.equal('POST');
      expect(request.body).to.have.property('email');
      expect(request.body).to.have.property('password');

      expect(
        response.statusCode,
        JSON.stringify(response.body)
      ).to.equal(200);

      expect(response.body.status).to.equal('ok');
    });
  });


  it('Перевіряє завантаження автомобілів користувача', () => {
  cy.intercept('GET', '**/api/cars')
    .as('getCars');

  cy.loginToQAuto();

  cy.wait('@getCars').then(({ request, response }) => {
    expect(request.method).to.equal('GET');
    expect(request.url).to.include('/api/cars');

    expect(response.statusCode).to.equal(200);
    expect(response.body.status).to.equal('ok');
    expect(response.body.data).to.be.an('array');
  });
});

it('Показує порожній Garage за допомогою mock response', () => {
  cy.intercept('GET', '**/api/cars', {
    statusCode: 200,
    body: {
      status: 'ok',
      data: []
    }
  }).as('getCarsStub');

  cy.loginToQAuto();

  cy.wait('@getCarsStub')
    .its('response.statusCode')
    .should('equal', 200);

  cy.contains("You don’t have any cars in your garage")
    .should('be.visible');
});

it('Перехоплює завантаження брендів автомобілів', () => {
  cy.intercept('GET', '**/api/cars')
    .as('getCars');

  cy.loginToQAuto();

  cy.wait('@getCars');

  cy.intercept('GET', '**/api/cars/brands')
    .as('getBrands');

  cy.contains('button', 'Add car').click();

  cy.wait('@getBrands').then(({ response }) => {
    expect(response.statusCode).to.equal(200);
    expect(response.body.status).to.equal('ok');
    expect(response.body.data).to.be.an('array');
    expect(response.body.data.length).to.be.greaterThan(0);
  });
});


it('Змінює відповідь GET /api/cars', () => {
  cy.intercept('GET', '**/api/cars', (request) => {
    request.continue((response) => {
      response.body.data = [];
    });
  }).as('modifiedCars');

  cy.loginToQAuto();

  cy.wait('@modifiedCars').then(({ response }) => {
    expect(response.statusCode).to.equal(200);
    expect(response.body.data).to.deep.equal([]);
  });

  cy.contains("You don’t have any cars in your garage")
    .should('be.visible');
});


it('Імітує помилку завантаження Garage', () => {
  cy.intercept('GET', '**/api/cars', {
    statusCode: 500,

    body: {
      status: 'error',
      message: 'Internal Server Error'
    }
  }).as('getCarsError');

  cy.loginToQAuto();

  cy.wait('@getCarsError')
    .its('response.statusCode')
    .should('equal', 500);
});

it('Показує mock-автомобіль у Garage', () => {
  const mockCar = {
    id: 999999,
    carBrandId: 1,
    carModelId: 1,
    initialMileage: 15000,
    mileage: 15000,
    brand: 'Audi',
    model: 'TT',
    logo: 'audi.png',
    carCreatedAt: new Date().toISOString(),
    updatedMileageAt: new Date().toISOString()
  };

  cy.intercept('GET', '**/api/cars', {
    statusCode: 200,
    body: {
      status: 'ok',
      data: [mockCar]
    }
  }).as('getCarsStub');

  cy.loginToQAuto();

  cy.wait('@getCarsStub').then(({ response }) => {
    expect(response.statusCode).to.equal(200);
    expect(response.body.data).to.have.length(1);

    expect(response.body.data[0]).to.include({
      brand: 'Audi',
      model: 'TT',
      mileage: 15000
    });
  });

  cy.contains('Audi TT').should('be.visible');
  
});

it('Показує mock-автомобіль у Garage', () => {
  cy.intercept('GET', '**/api/cars', {
    statusCode: 200,
    fixture: 'cars.json'
  }).as('getCarsStub');

  cy.loginToQAuto();

  cy.wait('@getCarsStub').then(({ request, response }) => {
    expect(request.method).to.equal('GET');
    expect(response.statusCode).to.equal(200);
    expect(response.body.status).to.equal('ok');
    expect(response.body.data).to.have.length(1);

    expect(response.body.data[0]).to.include({
      brand: 'Audi',
      model: 'TT',
      mileage: 15000
    });
  });

  cy.contains('Audi TT').should('be.visible');
});
});