import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';  

describe('Quiz Component', () => {
  it('Render the start button', () => {
    cy.mount(<Quiz />);  
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('Show first question once the quiz starts', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card').should('be.visible');
  });

  it('Show next question once an answer is selected', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    // Loop through 10 questions, selecting the first answer button for each
    for (let i = 0; i < 10; i++) {
      cy.get('.card').should('be.visible');  
      cy.get('button').first().click();  
      cy.get('.card').should('not.have.text', '');  
    }
    cy.get('.alert').should('be.visible');  
  });

  it('Show the "Take New Quiz" button after completing quiz', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    // Loop through all 10 questions, answer each question
    for (let i = 0; i < 10; i++) {
      cy.get('.card').should('be.visible');
      cy.get('button').first().click();
      cy.get('.card').should('not.have.text', '');  
    }

    // After completing all questions, ensure the score is visible
    cy.get('.alert').should('be.visible');

    // Ensure the "Take New Quiz" button is visible after completing the quiz
    cy.get('button').contains('Take New Quiz').should('be.visible');
  });

  it('Allows starting a new quiz once the "Take New Quiz" button is clicked', () => {
    cy.mount(<Quiz />);

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
