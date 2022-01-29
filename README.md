# BasicCrudTS

Projeto desenvolvido por [Igor Andrade](https://github.com/andradeigor). Consiste em um Crud de usuários feito para por em práticas meus estudos de TypeScript

- [Como usar](#-como-usar)
- [Rotas](#-rotas)
- [Testando](#-testando)
- [Tecnologias](#-tecnologias)
- [Contribuidores](#-contribuidores)
- [Licença](#-licença)

## 🤖 Como Usar:

Rodando o Servidor localmente

```bash
 # Clone esse repositório
 $ git clone https://github.com/andradeigor/BasicCrudTS

 # Acesse a pasta do projeto
 $ cd BasicCrudTS

 # Instale dependências
 $ yarn

 # Copie o .env.example e renomeie como .env
 $ cp .env.example .env

 # Substituia as variáveis de ambiente

 # Transpile os arquivos .ts
 tsc

 # Ligue servidor
 $ node build/index.js



```

## 📜 Rotas:

- **Get: /user**: Por padrão retorna os dados de todos os usuários cadastrados.
- **Get: /user/:id**: retorna os dados do usuário, caso não exista retorna um erro.
- **Post: /user/**: Verifica os dados inseridos e cadastra o usuário.
- **Put: /user/:id**: Verifica os dados inseridos e atualiza o usuário.
- **Delete: /user/:id**: Verifica os dados inseridos e deleta o usuário.

## 🚧 Testando

Use o arquivo model.txt para se guiar e faça os requests usando programas como: Insominia/Postman.

## 💻 Tecnologias

- TypeScript
- NodeJS
- Express
- Joi
- Mongoose
- DotEnv

## 👥 Contribuidores

Esses são os contribuidores do projeto (<a href="https://allcontributors.org/docs/en/emoji-key">emoji key</a>).

<table>
  <tr>
    <td align="center"><a href="https://github.com/andradeigor"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/21049910?v=4" width="100px;" alt=""/><br /><sub><b>Igor Andrade</b></sub></a><br /><a href="https://github.com/andradeigor/DiscordBotUFRJ/commits?author=andradeigor" title="Igor Andrade">🤔 💻 🚧</a></td>
  </tr>
</table>

## 📖 Licença

Este projeto está licenciado sob a licença <a href="https://choosealicense.com/licenses/mit/">MIT</a>.
