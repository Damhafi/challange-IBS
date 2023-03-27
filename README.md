# challange-IBS
Challange IBS -  Angular 2+ and Node


## Instruções de instalação e execução

### Back-end

1. Instale as dependências do projeto com o comando:

```npm i```

2. Execute as migrações do banco de dados com o comando:

```prisma migrate dev```

3. Crie as tabelas do banco de dados e insira dados iniciais com o comando:

```npm run seed```

4. Inicie o servidor local com o comando:

```npm run dev```

O servidor estará disponível em `http://localhost:3000`.


### Front-end

1. Instale as dependências do projeto com o comando:

```npm i```

2. Inicie o servidor local de desenvolvimento com o comando:

```npm run start```

O servidor estará disponível em `http://localhost:4200`.

## Configuração

#### Back-end
```DB_NAME=my_database```
```DB_USER=my_user```
```DB_PASSWORD=my_password```
```DB_HOST=my_host```
```DB_PORT=5432```
```DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public```

## Requisitos de sistema

NodeJS = 16.9.1
PostegreSQL = 15
