## Instalação

```bash
$ npm install
```

## Rodar o app

```bash
# dev
$ npm run start

# watch
$ npm run start:dev

# prod
$ npm run start:prod
```

## Como usar / Rotas



Create Admin (POST) - Precisa de um token de admin no header (bearer token)

```bash
localhost:3000/users 
```

envio
```bash
{
    "name": "Nome",
    "email": "e-mail",
    "password": "senha",
    "passwordConfirmation": "confirmação da senha"
}
```
retorno esperado
```bash
{
    "user": {
        "email": "E-mail usado",
        "name": "Nome usado",
        "role": "ADMIN",
        "status": true,
        "confirmationToken": "token de confirmação (não tem um uso implementado ainda)",
        "recoverToken": null,
        "id": "ID unico",
        "createdAt": "Data",
        "updatedAt": "Data"
    },
    "message": "Administrador cadastrado com sucesso"
}
```

Create User (POST)

```bash
localhost:3000/auth/signup
```

envio
```bash
{
    "name": "Nome",
    "email": "e-mail",
    "password": "senha",
    "passwordConfirmation": "confirmação da senha"
}
```
retorno esperado
```bash
{
    "message": "Cadastro realizado com sucesso"
}
```

Login (POST)

```bash
localhost:3000/auth/signin
```

envio
```bash
{
    "email": "e-mail",
    "password": "senha"
}
```
retorno esperado
```bash
{
    "token": "Token JWT"
}
```

Me/obter dados a partir do token (GET) 

```bash
localhost:3000/auth/me
```

envio
```bash
'headers': {
    'Authorization': 'Bearer <Token aqui>'
  }
```
retorno esperado
```bash
{
    "email": "E-mail",
    "name": "Nome",
    "role": "Papel",
    "status": true
}
```

Pegar os dados do usuario pelo Id dele (GET)

```bash
localhost:3000/users/:id
```

envio
```bash
path params: id
```
retorno esperado
```bash
{
    "user": {
        "id": "Id",
        "email": "E-mail",
        "name": "Nome",
        "role": "Papel"
    },
    "message": "Usuário encontrado"
}
```
Update user (PATCH)

```bash
localhost:3000/users/:id 
```

envio
```bash
path params: id

# body com dados para atualizar

{
    "email": "",
    "name": "",
    "role": ""
}
```
retorno esperado
```bash
{
    "id": "Id",
    "email": "E-mail",
    "name": "Nome",
    "role": "Papel",
    "confirmationToken": null,
    "recoverToken": null,
    "updatedAt": "Data"
}

# caso tente fazer uma alteração que não mude nada, n vai vir os tokens e updatedat no retorno
```
Delete User (DELETE)

```bash
localhost:3000/users/:id 
```

envio
```bash
path params: id
```
retorno esperado
```bash
{
    "message": "Usuário removido com sucesso"
}
```
