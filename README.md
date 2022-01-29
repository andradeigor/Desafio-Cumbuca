# Desafio-Cumbuca

Projeto desenvolvido por [Igor Andrade](https://github.com/andradeigor). Feito como uma resolução do desafio proposto pela empresa Cumbuca para a contratação de desenvolvedor Júnior.

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
 $ git clone https://github.com/andradeigor/desafio-cumbuca

 # Acesse a pasta do projeto
 $ cd Desafio-Cumbuca

 # Instale dependências
 $ yarn

 # Copie o .env.example e renomeie como .env
 $ cp .env.example .env

 # Substituia as variáveis de ambiente junto com as credênciais para o login no banco de dados

 # Transpile os arquivos .ts
 tsc

 # Ligue servidor
 $ node build/index.js




```

## 📜 Rotas:

- **Post: /user/:** Verifica os dados inseridos e cadastra o usuário.
- **Get: /auth/:** Verifica o Token enviado e retorna o saldo.
- **Post: /auth/:** Verifica os dados enviados e cria uma sessão para o usuário, retornando o Token.
- **Post: /transaction/:** Verifica o Token enviado, verifica os dados e cria uma transação com o valor passado.
- **Post: /transaction/reverse:** Verifica o Token enviado, verifica os dados e a transação. Por fim, caso a transação não tenha sido revertida ainda, reverte.
- **Post: /transaction/date:** Verifica o Token enviado, verifica os dados e retorna todas as transações(recebidas ou feitas) pelo usuário no período informado.

## 🚧 Testando

Use o arquivo model.txt para se guiar e faça os requests usando programas como: Insominia/Postman.

## 💻 Tecnologias

- TypeScript
- Postgres
- NodeJS
- Express
- Joi
- Prisma
- DotEnv
- Bcrypt
- JsonWebToken
- Gerador-Validador-Cpf

## 👥 Contribuidores

Esses são os contribuidores do projeto (<a href="https://allcontributors.org/docs/en/emoji-key">emoji key</a>).

<table>
  <tr>
    <td align="center"><a href="https://github.com/andradeigor"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/21049910?v=4" width="100px;" alt=""/><br /><sub><b>Igor Andrade</b></sub></a><br /><a href="https://github.com/andradeigor/DiscordBotUFRJ/commits?author=andradeigor" title="Igor Andrade">🤔 💻 🚧</a></td>
  </tr>
</table>
