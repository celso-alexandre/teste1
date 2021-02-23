# 0. Instruções:
- Inicie o backend com `yarn && yarn dev`
- Inicie o frontend com `yarn && yarn start`

Através do botão abaixo é possível importar meu workspace do Insomnia:   
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=teste1&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fcelso-alexandre%2Fteste1%2Fmaster%2Fbackend%2Fassets%2Finsomnia%2Finsomnia.json)
# 1. Utilizando Node.js e *typescript*:
- fazer um endpoint GET que retorna os conteúdos de um arquivo txt  
**R.:** GET http://localhost:3333/file
- fazer um endpoint POST que recebe uma string e retorna o hash dela (SHA256)  
**R.:** POST http://localhost:3333/hash
- fazer autenticação por JWT  
**R.:** POST http://localhost:3333/auth/signin 
```json
{
	"username": "admin",
	"password": "123"
}
```
- tela de login em *React.js* com campo de usuário e senha  
**R.:** Feito


# 2. Dada a seguinte interface:

```ts
interface Numbers {
  number1: number,
  number2: number,
  number3: number,
}
```

Desenvolva uma função que recebe um objeto Numbers e retorne um buffer no seguinte formato:  
```32 bits com valor do number1 + 16 bits com valor do number2 + 8 bits com valor do number3 (formato Big Endian)```

**Rota:** POST http://localhost:3333/numbers (Retorno no console)   
```json
{
	"number1": "900",
	"number2": "900",
	"number3": "900"
}
```

Quantos bytes o buffer de retorno possui?  
**R.:** 7 bytes  
Qual o valor máximo da variável number3?  
**R.:** 9007199254740991