# EBAC Shop — Automação de Testes com Cypress

Automação completa de testes UI para o fluxo de compra da EBAC Shop, com foco em robustez, manutenibilidade e escalabilidade.

---

##  Índice

- [Visão Geral](#visão-geral)
- [Instalação](#instalação)
- [Executar Testes](#executar-testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Cenários de Teste](#cenários-de-teste)
- [Análise de Qualidade](#análise-de-qualidade)
- [Desafio de Investigação](#desafio-de-investigação)
- [Boas Práticas](#boas-práticas)
- [Contribuindo](#contribuindo)

---

##  Visão Geral

Este projeto implementa automação de testes para o fluxo de compra da EBAC Shop, cobrindo:

-   Fluxo completo de compra (seleção de produto → carrinho → checkout → confirmação)
-   Validação de quantidade (mínima, máxima, estoque)
-   Validação de variações obrigatórias (tamanho, cor)
-   Mensagens de erro e validações
-   Navegação entre páginas
-   Adição ao carrinho

**Stack:**
- Cypress 13+
- JavaScript (ES6+)
- Page Object Model
- Fixtures para massa de dados
- Mochawesome para relatórios

---

##  Instalação

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Passos

\`\`\`bash
# 1. Clone o repositório
git clone https://github.com/gabrielmaues/ebac-shop-cypress.git
cd ebac-shop-cypress

# 2. Instale Cypress (se não estiver incluído)
npm install --save-dev cypress

# 3. Instale Mochawesome para relatórios (opcional)
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
\`\`\`

---

## ▶️ Executar Testes

### Modo Interativo (Cypress UI)

\`\`\`bash
npm run cy:open
\`\`\`

### Modo Headless (CI/CD)

\`\`\`bash
npm run cy:run
\`\`\`

### Gerar Relatório HTML

\`\`\`bash
npm run cy:report
\`\`\`

---

## Estrutura do Projeto

\`\`\`
ebac-shop-cypress/
├── cypress/
│   ├── e2e/
│   │   └── fluxo-compra.cy.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── ProductPage.js
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   └── OrderConfirmationPage.js
│   ├── fixtures/
│   │   ├── cliente.json
│   │   ├── mensagens.json
│   │   └── produto.json
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   └── cypress.config.js
├── .gitignore
├── package.json
└── README.md
\`\`\`

---

## 🧪 Cenários de Teste

### CT-01: Fluxo Completo de Compra
- Selecionar produto → Tamanho/Cor → Carrinho → Checkout → Confirmação

### CT-02: Deve validar quantidade máxima em estoque
- Validar que não é possível comprar acima do estoque

### CT-03: Deve validar quantidade mínima em estoque
- Validar que não é possível comprar com quantidade negativa

### CT-04:  Deve validar a não possibilidade de comprar sem tamanho e sem cor
- Validar que tamanho e cor são obrigatórios

### CT-05: Deve validar a não possibilidade de comprar sem tamanho
- Validar que tamanho é obrigatório

### CT-06: Deve validar a não possibilidade de comprar sem cor
- Validar que cor é obrigatória

---

## 📊 Análise de Qualidade

### 2.1 Análise de Qualidade

#### Cenários Críticos Identificados

**CT-01: Fluxo Completo de Compra**

**Por quê é crítico:**
- Representa o caminho feliz (happy path) — se quebrar, nenhuma venda funciona
- Envolve múltiplas páginas e integrações (produto → carrinho → checkout → confirmação)
- Toca em dados sensíveis (pagamento, endereço, confirmação de pedido)
- Qualquer falha impacta diretamente a receita

---

**CT-02 e CT-03: Validação de Quantidade**

**Por quê é crítico:**
- Protege contra entrada de dados inválida
- Evita pedidos com quantidade impossível (negativa, acima do estoque)
- Impacta a integridade dos dados no banco

---

**CT-04, CT-05, CT-06: Validação de Variações**

**Por quê é crítico:**
- Obriga seleção de tamanho e cor antes de comprar
- Sem isso, cliente recebe produto errado ou incompleto
- Impacta satisfação do cliente e taxa de devoluções

---


#### O Que Decidimos Testar

**Testamos:**
- Fluxo completo de compra (CT-01)
- Validação de quantidade (CT-02, CT-03)
- Validação de variações obrigatórias (CT-04, CT-05, CT-06)
- Mensagens de erro
- Adição ao carrinho
- Navegação entre páginas
- Cálculo de total
- Pré-condições (página carregada, elemento visível)

 **Não Testamos (e por quê):**

| Cenário | Justificativa |
|---|---|
| **Testes de performance** | Fora do escopo de automação UI; requer k6 ou JMeter |
| **Testes de acessibilidade** | Requer ferramentas específicas (axe, WAVE); não é automação funcional |
| **Testes de segurança (XSS, SQL Injection)** | Requer testes de segurança dedicados; acesso ao banco |
| **Testes de pagamento real** | Requer sandbox de gateway; risco de custos; usar mock |
| **Testes de email de confirmação** | Requer acesso a servidor de email; fora do escopo de UI |
| **Testes de integração com ERP** | Requer acesso ao backend; escopo de API, não UI |

---

#### Decisões Técnicas

**Seletores CSS:**
-  Usamos fallbacks (`.product, li.product, .type-product`)
-  Validamos visibilidade antes de clicar
-  Validamos existência antes de interagir
-  Ainda há oportunidade de usar `data-testid` para maior robustez

**Fixtures:**
-  Centralizamos dados em `fixtures/`
-  Reutilizamos em múltiplos testes
-  Fácil manutenção e atualização

**Page Objects:**
-  Isolamos seletores em métodos
-  Cada método tem responsabilidade única
-  Documentação JSDoc completa


**Validações:**
-  Validamos pré-condições (página carregada, elemento visível)
-  Validamos pós-condições (elemento selecionado, valor alterado)
-  Tratamos casos de borda (estoque zerado, mensagens em idiomas diferentes)

---

#### Riscos identificados durante o mapeamento.

## Matriz de Severidade

| Risco | Probabilidade | Impacto | Severidade |
|-------|---------------|---------|------------|
| **Risco 1** — Dessincronização da Vitrine | 🔴 Alta | 🔴 Alto | **🔴 CRÍTICO** |
| **Risco 2** — Falta de Tratamento de Erros | 🟡 Média | 🟡 Médio | **🟡 ALTO** |
| **Risco 3** — Pedido sem Autenticação | 🔴 Alta | 🔴 Alto | **🔴 CRÍTICO** |
| **Risco 4** — Pedido Gerado mas Não Visível | 🟠 Média | 🔴 Alto | **🟠 ALTO** |

---

## 🔴 RISCO 1: Dessincronização da Vitrine — Produto Fora de Estoque Aparece como Disponível

### Descrição do Problema

Produtos que estão **sem estoque** continuam sendo exibidos como **disponíveis** na vitrine, permitindo que o usuário os adicione ao carrinho e apenas descubra a indisponibilidade na tentativa de adicionar ao carrinho. Isso cria uma experiência frustrante e impacta a confiança no site.

### Impacto no Negócio

| Aspecto | Impacto |
|--------|---------|
| **Satisfação do Cliente** | ⬇ Frustração, reclamações, reviews negativos |
| **Receita** |  Perda direta de vendas |
| **Reputação** |  Desconfiança no site |
| **Suporte** |  Aumento de contatos: "Por que não consigo comprar?" |

### Probabilidade

🔴 **ALTA** — O site parece não ter sincronização em tempo real com o inventário. Produtos esgotados continuam visíveis.

### Mitigação

-  Remover produtos esgotados da vitrine **OU** exibir claramente como "Esgotado" com botão desabilitado
-  Validar estoque no backend antes de adicionar ao carrinho
-  Testes automatizados de regressão a cada deploy
-  Monitorar em produção: alertar quando estoque ≤ 5 unidades
---

## 🟡 RISCO 2: Falta de Tratamento de Mensagens de Erro

### Descrição do Problema

Mensagens de erro **genéricas, ausentes ou não tratadas** quando ocorrem falhas (timeout, servidor indisponível, validação de formulário). Isso impede o usuário de entender o problema e tomar ação corretiva.

### Impacto no Negócio

| Aspecto | Impacto |
|--------|---------|
| **Experiência do Usuário** |  Confusão, frustração, abandono |
| **Suporte** |  Aumento de chamados |
| **Confiança** |  Usuários desconfiam do site |
| **Retenção** |  Usuários não retornam |

### Probabilidade

🟡 **MÉDIA** — Falhas existem, mas nem sempre são críticas. Algumas mensagens podem melhorar.

### Mitigação

-  Implementar **validações no frontend** com mensagens amigáveis e claras
-  Implementar **validações no backend** (nunca confiar apenas no frontend)
-  Capturar **exceções e erros** com mensagens padronizadas
-  Testes de usabilidade para garantir clareza das mensagens
-  Centralizar mensagens em arquivo de configuração (fácil manutenção)

---

## 🔴 RISCO 3: Permitir Finalizar Pedido Sem Estar Logado

### Descrição do Problema

Usuários podem **avançar até a finalização do pedido sem autenticação**, o que pode levar a:
- Pedidos anônimos (impossível rastrear)
- Fraudes (cartão de crédito falso, endereço falso)
- Perda de dados do cliente para marketing e pós-venda
- Violação de conformidade (LGPD, GDPR)

### Impacto no Negócio e Segurança

| Aspecto | Impacto |
|--------|---------|
| **Segurança** |  Risco de fraude, chargeback, roubo de dados |
| **Rastreamento** |  Impossível rastrear pedidos anônimos |
| **Conformidade** |  Violação de LGPD, GDPR (sem consentimento) |
| **Dados** |  Perda de dados para marketing e pós-venda |
| **Reputação** |  Risco de fraude prejudica reputação |

### Probabilidade

🔴 **ALTA** — O fluxo atual parece permitir checkout sem login.

### Mitigação

- ✅ **Bloquear acesso ao checkout** sem autenticação (redirecionar para login)
- ✅ Se checkout anônimo for necessário, **exigir e-mail** e criar conta automaticamente
- ✅ Implementar **validação no backend** (nunca confiar apenas no frontend)
- ✅ Testes de segurança e validação de fluxo
- ✅ Implementar **2FA** (autenticação de dois fatores) para transações de alto valor
- ✅ Monitorar **padrões de fraude** (múltiplos pedidos com endereços diferentes)

---

## 🟠 RISCO 4: Pedido Gerado Mas Não Visível — Perda de Rastreamento

### Descrição do Problema

Após a finalização do pedido, o sistema **gera o pedido** mas **não o exibe** na área do cliente ("Meus Pedidos"), impossibilitando o rastreamento e gerando insatisfação. Isso pode ocorrer por:

### Impacto no Negócio

| Aspecto | Impacto |
|--------|---------|
| **Satisfação do Cliente** |  Insatisfação extrema, reclamações |
| **Suporte** |  Aumento em contatos |
| **Reputação** |  Reviews negativos, desconfiança |
| **Retenção** |  Clientes não retornam |
| **Receita** |  Perda de recompra, chargeback |

### Probabilidade

🟠 **MÉDIA** — Pode ocorrer em casos específicos (integração com ERP falha, timeout, erro de sincronização).

### Mitigação

- ✅ Sincronizar **todos os pedidos** com a base de dados de clientes em tempo real
- ✅ Implementar **idempotência** (mesmo ID de transação = mesmo pedido, sem duplicação)
- ✅ Notificar cliente por **e-mail** com link para acompanhamento
- ✅ Implementar **retry logic** para falhas de integração
- ✅ Testes de integração **ponta a ponta** 

---

## 📋 Plano de Mitigação Priorizado

| Prioridade | Risco | Ação | Responsável | Prazo | Impacto |
|------------|-------|------|-------------|-------|---------|
| 🔴 **P0** | **Risco 3** | Bloquear checkout sem login | Dev Team | **1 dia** | Segurança crítica |
| 🔴 **P0** | **Risco 4** | Garantir visibilidade de pedidos | Dev Team | **2 dias** | Experiência crítica |
| 🟠 **P1** | **Risco 1** | Corrigir sincronização de estoque | Dev Team | **3 dias** | Conversão |
| 🟠 **P1** | **Risco 2** | Implementar mensagens de erro | Frontend + Backend | **5 dias** | UX |

---
## 2.3 Desafio de Investigação

### Primeira ação

Minha primeira ação seria tentar reproduzir o problema utilizando um pedido real afetado, correlacionando os horários do pagamento com os registros disponíveis nos logs e validando o fluxo ponta a ponta junto aos times de Produto e Backend.

O principal objetivo nesse momento é responder rapidamente:

- O pagamento foi realmente confirmado?
- O pedido foi criado no backend?
- O problema é de persistência, processamento assíncrono ou apenas exibição na interface?
- O comportamento afeta todos os usuários ou apenas casos específicos?

Sem acesso ao código-fonte, a forma mais eficiente de reduzir a incerteza é trabalhar com evidências operacionais e rastreamento temporal do fluxo.

---

### Hipótese inicial

Minha hipótese inicial seria uma inconsistência entre a confirmação do pagamento e a atualização do estado do pedido no sistema responsável pela listagem de “Meus Pedidos”.

Alguns cenários possíveis:

- O pagamento foi aprovado, mas houve falha na criação/sincronização do pedido.
- O pedido foi criado corretamente, porém existe atraso em processamento assíncrono (fila/evento).
- O endpoint da tela “Meus Pedidos” possui cache, paginação ou filtro incorreto.
- Existe falha intermitente de comunicação entre serviços.
- O problema ocorre apenas em determinados meios de pagamento ou dispositivos.

---

### Como eu reduziria a incerteza rapidamente

#### 1. Coletaria um caso real afetado

Solicitaria:

- ID do pedido
- ID da transação/pagamento
- horário aproximado
- usuário impactado
- meio de pagamento utilizado

Isso permite rastrear exatamente o fluxo ocorrido.

---

#### 2. Validaria o fluxo cronológico nos logs

Analisaria:

1. Evento de pagamento aprovado
2. Criação do pedido
3. Atualização de status
4. Resposta do endpoint de “Meus Pedidos”

Meu foco seria identificar onde a cadeia quebra.

Exemplo:

```text
Pagamento aprovado -> Pedido criado -> Pedido indexado -> Pedido exibido
```

Se algum passo não existir nos logs, já reduz bastante o escopo da investigação.

---

#### 3. Tentaria reproduzir o problema

Executaria testes variando:

- forma de pagamento
- dispositivo
- volume/concorrência
- timing entre pagamento e consulta
- usuário novo vs usuário recorrente

O objetivo é descobrir padrões.

---

#### 4. Validaria impacto e frequência

Perguntas importantes para Produto/Backend:

- O problema começou após algum deploy?
- Existe aumento recente de ocorrências?
- Afeta um gateway específico?
- O pedido aparece depois de alguns minutos?
- O problema ocorre apenas na interface ou também via API?

---

### O que eu buscaria concluir rapidamente

Minha prioridade seria classificar o problema em uma destas categorias:

| Categoria | Indício |
|---|---|
| Falha de integração | Pagamento aprovado sem criação do pedido |
| Consistência eventual | Pedido aparece após atraso |
| Problema de frontend/API | Pedido existe mas não é exibido |
| Problema de dados | Pedido criado sem vínculo correto ao usuário |
| Intermitência operacional | Logs mostram timeout/falha esporádica |

---

