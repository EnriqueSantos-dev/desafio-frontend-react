# Segunda Etapa

Mais uma etapa concluída, agora com a implementação do Firebase, onde foi possível realizar a autenticação do usuário, salvar os jogos favoritos e as avaliações feitas pelo usuário. Além disso, foi possível ordenar os jogos por avaliação e filtrar os jogos favoritos. Porém assim como na etapa anterior eu não parei por aqui, e implementei algumas funcionalidades extras e recursos que ao meu ver são importantes para o usuário.

## Requisitos funcionais

- [✅] Utilizar Firebase para realizar autenticação usando email/senha
- [✅] Ter um 🩶 para o usuário favoritar o jogo diretamente na lista, ficando vermelho quando marcado
- [✅] Salvar no firebase os jogos favoritos do usuário, no realtime ou firestore
- [✅] Ter um botão “Favoritos” que apresenta apenas jogos favoritados, permitindo ainda buscar e filtrar estes jogos
- [✅] Ao lado do coração, ter ★★★★ para o usuário avaliar o jogo, podendo marcar de uma em uma
- [✅] Ter uma forma de ordenar por avaliação, vendo os melhores (ou piores) primeiro, clicando novamente para inverter a ordem.
- [✅] Ao carregar a interface, deixar o ❤️ vermelho para os itens favoritos e as ⭐️ amarelas nos itens avaliados
- [✅] Ao acessar sem estar autenticado, os ícones 🩶 e ★ deverão estar visíveis, mas ao clicar irá solicitar a autenticação
- [✅] Ao obter os jogos da API, já apresentar, sem deixar o loading enquanto se obtém os dados do firebase, até porque, o firebase devolverá os dados mais rapidamente
- [✅] A autenticação deve acontecer na rota `/auth/` usando o provedor “E-mail/senha” do firebase, onde o usuário poderá criar uma conta ou acessar a conta já existente (se mantendo apenas nesta rota)
- [✅] Escolher um item para aplicar uma animação com CSS, pode ser ao favoritar, ou avaliar, ou quando os itens surgirem
- [✅] Publicar seu projeto online para testarmos (na mesma url de antes)

## Recursos e melhorias

- [✅] Opção de atualizar as informações do usuário, como nome, email e senha.
- [✅] Opção de deslogar do sistema.
- [✅] Opção de deletar a conta do usuário.
- [✅] Gerenciamento de sessão via serve-side rendering e cookies HttpOnly.
