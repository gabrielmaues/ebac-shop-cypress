class HomePage {
  visit() {
    cy.visit('/');
  }

  //Seleciona um produto pelo índice (posição na vitrine)
  selecionarProdutoPorIndice(indice) {
    cy.get('.product, li.product, .type-product')
      .eq(indice)
      .click();
  }

}

export default new HomePage();