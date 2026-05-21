class ProductPage {
  /**
   * Valida que está na página do produto
   */
  validarPaginaProduto() {
    cy.get('.product_title, h1.entry-title').should('be.visible');
    cy.url().should('include', '/product/');
  }

  /**
   * Valida que o produto específico está sendo visualizado
   */
  validarProdutoEspecifico(nomeProduto) {
    cy.get('.product_title, h1.entry-title')
      .should('be.visible')
      .should('contain', nomeProduto);
  }

  /**
   * Obtém o nome do produto
   */
  getProductName() {
    return cy.get('.product_title, h1.entry-title').invoke('text');
  }

  /**
   * Obtém o preço do produto
   */
  getProductPrice() {
    return cy.get('.price, .product-price').invoke('text');
  }

  /**
   * Seleciona um tamanho do produto
   * Clica no botão que contém o texto do tamanho
   * @param {string} tamanho - Tamanho a selecionar (ex: 'M', 'L', 'XL')
   */
  selecionarTamanho(tamanho) {
    cy.get(`.button-variable-item-${tamanho}`)
      .click();
  }

  /**
   * Seleciona uma cor do produto
   * Clica no botão que contém o texto da cor
   * @param {string} cor - Cor a selecionar (ex: 'Red', 'Orange', 'White')
   */
  selecionarCor(cor) {
      cy.get(`.button-variable-item-${cor}`)
      .click();
  }

  /**
   * Clica no botão de comprar/adicionar ao carrinho
   */
  clicarComprar() {
    cy.get('.single_add_to_cart_button')
      .click({ force: true })
  }

  /**
   * Valida que o produto foi adicionado ao carrinho
   */
  validarProdutoAdicionado() {
    cy.get('.woocommerce-message', { timeout: 5000 })
      .should('be.visible')
      .should('contain', 'foi adicionado no seu carrinho');
  }

  /**
   * Navega para o carrinho
   */
    irParaCarrinho() {
    cy.contains('button, a', 'Ver carrinho')
      .click();
  }

  /**
 * Obtém a quantidade máxima de estoque dinamicamente
 */
obterEstoqueMaximo() {
  return cy.get('.stock')
    .invoke('text')
    .then((text) => {
      const match = text.match(/\d+/);
      if (!match) {
        throw new Error(`Não foi possível extrair estoque do texto: "${text}"`);
      }
      return parseInt(match[0]);
    });
}

/**
 * Altera o input de quantidade com valor específico
 * @param {number} quantidade - Valor a ser digitado
 */
preencherQuantidade(quantidade) {
  cy.get('[name="quantity"]')
    .clear()
    .type(String(quantidade));
}

/**
 * Valida mensagem de erro de quantidade
 * @param {string} mensagemEsperada - Mensagem que deve estar na validação
 */
validarMensagemQuantidade(mensagemEsperada) {
  cy.get('[name="quantity"]').then(($input) => {
    const validationMsg = $input[0].validationMessage;
    expect(validationMsg).to.include(mensagemEsperada);
  });
}

}

export default new ProductPage();