## Solid API Gympass


### Sobre

> Este projeto é uma API Node.js para um sistema estilo Gympass, construída utilizando **Fastify**. A arquitetura do projeto é baseada em princípios **SOLID** e conceitos de **DDD**, como Casos de Uso (Services) e o padrão de Repositório (Repository Pattern). O projeto utiliza **Prisma** como ORM para se comunicar com um banco de dados **PostgreSQL**, **Zod** para validação de dados e **Vitest** para os testes unitários e de integração.


### Tecnologia usadas com suas versões

- Fastify - 5.3.3
- Prisma - 6.9.0
- Zod - 3.25.61
- Typescript - 5.8.3
- Vitest - 3.2.4
- Bcryptjs - 3.0.2
- Docker

### Execução do projeto

**Requer o NODE (npm), GIT e Docker (Docker Compose) instalados!**

**Nota:** O projeto está configurado para rodar com um banco de dados PostgreSQL via Docker.

~~~javascript
 1. git clone https://github.com/wwilliamsantana/solid-api-gympass.git
 2. cd solid-api-gympass
 3. npm install
~~~~
#### Inicie o contêiner do banco de dados:
~~~javascript
    docker-compose up -d
~~~~
Crie um arquivo .env na raiz (use o .env.example como base) <br> 
Configure a variável DATABASE_URL no .env: 
~~~javascript
    DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid"
~~~~
Execute as migrations do Prisma:
~~~javascript
    npx prisma migrate dev
~~~~
Inicie a aplicação:
~~~javascript
    npm run dev
~~~~
