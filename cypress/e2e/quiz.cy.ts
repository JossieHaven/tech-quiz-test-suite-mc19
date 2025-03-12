describe('Tech Quiz Flow - End to End', () => {
    
    
    // Test 1: Ensure the start button is rendered on the homepage
    
    it('Render the start button', () => {
      cy.visit('/'); 
      cy.get('button').contains('Start Quiz').should('be.visible'); 
    });

    
    // Test 2: Start the quiz and verify that the first question is displayed
    
    it('Start the quiz and show first question once the start button is clicked', () => {
      cy.visit('/'); 
      cy.get('button').contains('Start Quiz').click(); 
      cy.get('.card').should('be.visible'); 
    });

    
    // Test 3: Show the next question after selecting an answer
    
    it('Show next question after selecting an answer', () => {
      cy.visit('/'); 
      cy.get('button').contains('Start Quiz').click(); 

      for (let i = 0; i < 10; i++) { 
        cy.get('.card').should('be.visible'); 
        cy.get('button').first().click(); 
        cy.get('.card').should('not.have.text', '');
      }
    });

    
    // Test 4: Show the final score once all questions are answered
    
    it('Show the score once all questions are answered', () => {
      cy.visit('/'); 
      cy.get('button').contains('Start Quiz').click(); 

      for (let i = 0; i < 10; i++) { 
        cy.get('.card').should('be.visible'); 
        cy.get('button').first().click(); 
        cy.get('.card').should('not.have.text', ''); 
      }

      cy.get('.alert').should('be.visible'); 
    });

    
    // Test 5: Allow restarting the quiz after finishing
    
    it('Allow restarting quiz once the "Take New Quiz" button is clicked', () => {
      cy.visit('/'); 
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
