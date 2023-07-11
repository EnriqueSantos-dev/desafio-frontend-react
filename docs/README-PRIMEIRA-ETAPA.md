# Projeto de Estágio Frontend React

Completei o desafio concluindo todos os requisitos funcionais, porém eu fui além e adicionei mais recursos e funcionalidades no sistema, abaixo estão os requisitos funcionais que eu completei e em seguida a demo do projeto e as novas funcionalidades.

## Link para acessar o projeto hospedado na vercel

[https://desafio-frontend-react.vercel.app/](https://desafio-frontend-react.vercel.app)

## Requisitos funcionais

- [✅] O projeto deve ser feito usando React ou Next.JS
- [✅] Obter a lista de jogos em `/data`
- [✅] Apresentar um loader enquanto os dados são obtidos
- [✅] Apresentar os jogos em três colunas (no computador)
- [✅] Em cada card apresentar o título e imagem pelo ao menos
- [✅] Lidar com a responsividade, para que fique bem apresentado no computador, tablets ou celular
- [✅] Quando a API retornar o `status code` 500, 502, 503, 504, 507, 508 ou 509 apresentar ao usuário `O servidor fahou em responder, tente recarregar a página`
- [✅] Caso a API retorne outros erros, apresentar `O servidor não conseguirá responder por agora, tente voltar novamente mais tarde`
- [✅] Ao realizar uma chamada, não esperar mais que 5 segundos pelo retorno. Se os dados demorarem mais de 5 segundos para retornar apresentar `O servidor demorou para responder, tente mais tarde`
- [✅] Sempre que apresentar uma mensagem para o usuário, ou tiver os dados em mãos para apresentar, ocultar o loader
- [✅] Incluir um campo de busca, que permite localizar jogos pelo título, com busca case insensitive
- [✅] Uma vez que tenha os dados em mãos, veja quais `genre` foram retornados e permita ao usuário selecionar um deles, e então filtre para exibir apenas jogos do gênero selecionado

## Framework e linguagem usados

Todo o projeto foi feito na versão mais atual do NextJS, usando o App Router e usando sempre Typescript para manter o código mais conciso e sujeito a menos bugs no decorrer do desenvolvimento.

## Diferencias e recursos adicionais do projeto.

- [✅] Suporte a dark mode
- [✅] Busca de dados com React-Query
- [✅] Custom Hooks
- [✅] Acessibilidade com Radix-ui
- [✅] SEO com o NextJS
- [✅] Otimização com o Memo do React e gerenciamento de estados através da url.
- [✅] Interceptando requests e padronizando mensagens de erro com os interceptors do Axios.
- [✅] Derived states: aproveitando o benefício do re-render do react para criar variáveis que derivam de estados.

## Screenshots do projeto

Dark mode desktop:

![dsf-1-dark-mode](https://github.com/EnriqueSantos-dev/desafio-frontend-react/assets/97238331/1d26a165-e5b9-46b4-9c59-b1f8730db41e)

Dark mode mobile:

![dsf-2-dark-mode](https://github.com/EnriqueSantos-dev/desafio-frontend-react/assets/97238331/6cd1f44e-48a7-43a2-9324-a67b9d431786)
