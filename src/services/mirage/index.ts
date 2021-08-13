import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}` // CRIA UM USUÁRIO POR ITERAÇÃO
        },
        email() {
          return faker.internet.email().toLowerCase() // USA A LIB FAKER PARA RETORNAR UM EMAIL ALEATÓRIO E COM LETRAS MINÚSCULAS
        },
        createdAt() {
          return faker.date.recent(10) // GERA DATAS DE CRIAÇÃO ALEATÓRIAS NOS ÚLTIMOS 10 DIAS A PARTIR DA DATA ATUAL
        },
      })
    },

    seeds(server) {
      server.createList('user', 200) // CRIA LISTA COM 200 USUÁRIOS
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users/:id')
      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart, pageEnd)

        return new Response(
          200, 
          { 'x-total-count': String(total)},
          { users }
        )
      });

      this.post('/users');

      this.namespace = ''; // RESETA ESTADO DO NAMESPACE PARA NÃO CONFLITAR COM FUTURA PASTA API
      this.passthrough() // PERMITE OUTRAS API´S CASO NÃO SEJA CHAMADA A CONFIGURADA NO MIRAGE
    }
  });

  return server;
}