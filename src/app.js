import Fastify from 'fastify';
import { general } from './services/general/index.js';
import { createTodo } from './services/todos/create-todos.js';
import { getManyTodo } from './services/todos/get-many-todos.js';
import { getTodo } from './services/todos/get-todo.js';

const prefix = '/api';

export async function build () {
  // initialize fastify
  const fastify = Fastify({ logger: true });

  fastify.get(prefix, general);

  // create todo
  fastify.post(`${prefix}/todo`, createTodo);

  // get many todos
  fastify.get(`${prefix}/todo`, getManyTodo);

  // get one todos
  fastify.get(`${prefix}/todo/:todoId`, getTodo);

  return fastify;
}
