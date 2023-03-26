// import lib auto gen swagger
const swaggerAutogen = require('swagger-autogen');

// SAIDA DO ARQUIVO, ONDE VAI SER GERADO O SWAGGER (DADOS)
const outPutFile = './src/swagger/swagger_output.json';

// ENTRADA DOS ARQUIVOS .TS, ONDE VAI CAPTAR AS ROTAS
const endPointFiles = ['./src/index.ts'];


const doc = {
    info: {
        version: "1.0.0",
        title: "back-end-web",
        description: "API do projeto back-end-web"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "persons",
            "description": "API para gerenciar pessoas"
        }
    ],
    definitions: {
        Person: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    example: 1
                },
                name: {
                    type: "string",
                    example: "João"
                },
                professionId: {
                    type: "integer",
                    example: 1
                },
                phone: {
                    type: "string",
                    example: "11 99999-9999"
                },
                email: {
                    type: "string",
                    example: "zuf@gmail.com"
                },
                profession: {
                    $ref: "#/definitions/Profession"
                }
            }
        },
        Profession: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    example: 1
                },
                name: {
                    type: "string",
                    example: "Programador"
                }
            }
        }
    },
}

// GERA O ARQUIVO SWAGGER Quando o servidor é iniciado e atualizado
swaggerAutogen(outPutFile, endPointFiles, doc).then(() => {
    require('./index.ts');
  });