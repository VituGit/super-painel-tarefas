📝 Painel de Tarefas - Desafio Técnico
Bem-vindo ao Painel de Tarefas, um projeto desenvolvido como parte do desafio técnico para a vaga de Desenvolvedor Júnior. Este painel permite a gestão completa de tarefas, com autenticação, filtros avançados e animações interativas. 🚀

📖 Descrição do Projeto
O Painel de Tarefas é uma aplicação que permite:

Adicionar, editar, remover e marcar tarefas como concluídas.
Classificar tarefas por prioridade (Urgente, Alta, Média, Baixa).
Filtrar tarefas por status (Concluídas / Não Concluídas) e prioridade.
Persistir dados utilizando uma API.
Autenticação de usuários para personalização das tarefas.
O projeto foi desenvolvido com foco em React, TailwindCSS para estilização e Framer Motion para animações, proporcionando uma experiência de usuário interativa e moderna.

✨ Funcionalidades
✅ Funcionalidades Básicas
Adicionar Tarefas

Campo de texto para criar novas tarefas.
Seletor de prioridade ao criar a tarefa.
Gerenciamento de Tarefas

Editar: Botão para edição com salvamento ao clicar fora ou pressionar Enter.
Remover: Botão para excluir tarefas (apenas tarefas não concluídas).
Marcar como Concluída: Checkbox com animação interativa.
Lista de Tarefas

Exibição de tarefas classificadas por prioridade.
Visual diferente para tarefas concluídas.
Filtros Avançados

Filtro por status: Concluídas e Não Concluídas.
Filtro por prioridade: Urgente, Alta, Média, Baixa.
Persistência de Dados

Dados das tarefas são armazenados em uma API, permitindo salvamento e recuperação.
Design Responsivo

Interface adaptável para diferentes dispositivos (desktop, tablet, mobile).
🔐 Funcionalidades Extras (Bônus)
Autenticação de Usuários

Sistema de login integrado.
As tarefas são exclusivas por usuário autenticado.
Animações Interativas

Botões com efeitos de escala e transições suaves ao interagir.
Animação na conclusão de tarefas.
Deploy Online

A aplicação foi publicada para acesso direto.
🚀 Tecnologias Utilizadas
React: Biblioteca para construção da interface.
TypeScript: Tipagem estática para maior confiabilidade no código.
TailwindCSS: Estilização rápida e responsiva.
Framer Motion: Animações dinâmicas e interativas.
Headless UI: Componentes acessíveis e estilizados.
Axios: Requisições HTTP para a API.
LocalStorage: Armazenamento temporário de dados no navegador.
⚙️ Configuração do Projeto
Pré-requisitos
Node.js versão 14+
Gerenciador de pacotes npm ou yarn
Como Executar
Clone o repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/painel-de-tarefas.git
cd painel-de-tarefas
Instale as dependências:

bash
Copiar código
npm install
# ou
yarn install
Crie um arquivo .env na raiz do projeto com a URL da API:

arduino
Copiar código
REACT_APP_API_URL=http://sua-api.com
Inicie o servidor de desenvolvimento:

bash
Copiar código
npm run dev
# ou
yarn dev
Acesse no navegador:

arduino
Copiar código
http://localhost:3000
📤 Deploy
A aplicação está online e disponível em:
https://painel-tarefas.vercel.app

📚 Organização do Código
Estrutura de Diretórios
css
Copiar código
src/
├── components/
│   ├── Header.tsx
│   ├── TaskInput.tsx
│   ├── TaskList.tsx
│   ├── TaskItem.tsx
├── pages/
│   ├── TasksPage.tsx
│   ├── LoginPage.tsx
├── services/
│   ├── api.ts
├── App.tsx
├── index.tsx
📌 Melhorias Futuras
Adicionar testes unitários com Jest ou React Testing Library.
Adicionar drag-and-drop para reordenar tarefas.
Implementar notificações de feedback ao usuário.
👤 Autor
Seu Nome

GitHub: seu-usuario
LinkedIn: seu-linkedin
✨ Obrigado por conferir o projeto! ✨