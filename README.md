Esse projeto foi criado para atender ao desafio da empresa `bossabox` (https://www.notion.so/Front-end-c12adcdbe7a1425dbfbcd5a397b4ff10)

## Sobre o projeto

O projeto é um CRUD de ferramentas(tools). Onde na primeira e única tela irá mostrar as ferramentas já cadastradas
e opão de filtro por nome ou por tags.

O usuário tem opão de adicionar novas ferramentas, clicando no botão "+ Add", onde irá abrir um popup para digitar as informações e salvar clicando em "Add Tool"

Na mesma tela de listagem o usuário tem opão de remover uma ferramenta, clicando no botão "remove".

## Como executar

**Note: Certificar de ter o servidor back-end rodando.**
Para apontar a url do servidor, bastar editar o seguinte arquivo:
src/services/api.js

Para executar o projeto front-end, depois de ter startado e mapeado o back-end, basta executar os seguintes comandos.

### `yarn`

- Para instalar as dependências

### `yarn start`

- Para iniciar o servidor na URL padrão (http://localhost:3001)

### `yarn test`

- Para realizar os testes da aplicação (foi utilizado JEST)
