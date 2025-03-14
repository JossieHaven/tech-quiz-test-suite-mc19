// import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  it('Render the start button', () => {
    mount(<Quiz />);  
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('Show first question once the quiz starts', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card').should('be.visible');
  });

  it('Show next question once an answer is selected', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('.card').should('be.visible');  
      cy.get('button').first().click();  
      cy.get('.card').should('not.have.text', '');  
    }
    cy.get('.alert').should('be.visible');  
  });

  it('Show the "Take New Quiz" button after completing quiz', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('.card').should('be.visible');
      cy.get('button').first().click();
      cy.get('.card').should('not.have.text', '');  
    }

    cy.get('.alert').should('be.visible');
    cy.get('button').contains('Take New Quiz').should('be.visible');
  });

  it('Allows starting a new quiz once the "Take New Quiz" button is clicked', () => {
    mount(<Quiz />);

    cy.get('button').contains('Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('.card').should('be.visible');
      cy.get('button').first().click();
      cy.get('.card').should('not.have.text', '');  
    }

    cy.get('.alert').should('be.visible');
    cy.get('button').contains('Take New Quiz').should('be.visible').click();
    cy.get('.card').should('be.visible');
  });
});
