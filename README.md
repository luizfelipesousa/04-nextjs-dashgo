Este é um projeto [Next.js](https://nextjs.org/) criado através do método [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Sobre

Projeto web de um painel administrativo de gestão de usuários.

O foco principal de estudo é a utilização de construção de interfaces de forma declarativa utilizando a biblioteca [Chakra-UI](https://chakra-ui.com/)

Os principais pontos e tecnologias abordados neste projeto, foram:

- Interfaces declarativas (Criando componentes e informando diretamente qual a estilização a ser aplicada, eliminando a necessidade de criar arquivos CSS separados)

- Técnicas de responsividade e controle de tamanho de tela.

- Controle de formulários e validação de campos

- Componentização (Redução de componentes para reduzir a poluição gerada pelo método de estilização de componentes de forma declarativa)

- Criação de gráficos com a API [APEXCHARTS.JS](https://apexcharts.com/)

- Data fetching utilizando React-Query para carregamento de dados e listagem de usuários

- MirageJs para realizar o mock de dados e simular as respostas de uma API considerando um cenário onde o back-end ainda não está finalizado.

- Autenticação e autorização utilizando uma [API local](https://github.com/rocketseat-education/ignite-reactjs-auth-backend)

- Configuração de regras de permissionamento para exibição de informações em tela e acesso a paginas.

- Broadcast channel para deslogar todas as sessões abertas através de várias abas do navegador.

## Executando

Execute o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

![Login Page](/public/images/login.png "Login Page")

![Dashboard](/public/images/dashboard.png "Dashboard")
![Formulário de criação de novo usuário](/public/images/new-user-wide.png "Formulário de criação de novo usuário")
![Listagem de usuário](/public/images/user-list.png "Listagem de usuário")

![Dashboard Responsivo](/public/images/dashboard-mobile.png "Dashboard")
![Listagem de usuário Responsivo](/public/images/user-list-mobile.png "Listagem de usuário")
![Formulário de criação de novo usuário Responsivo](/public/images/new-user-mobile.png "Formulário de criação de novo usuário")

_keep learning..._
