import { getGreeting } from '../support/app.po';

describe('emafeed', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to emafeed!');
  });
});
