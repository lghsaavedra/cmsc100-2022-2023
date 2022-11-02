import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Updating a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  //   test update-todo if all elements has been updated
  it('Should update the object given an ID', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      title: 'New Todo for update',
      description: 'Some description 2',
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updateDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerTodo)
    });

    // checks if HTTP status code is = 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expects ID exists
    result.id.must.be.equal(id);

    // expects all values = newerTodo properties
    result.title.must.be.equal(newerTodo.title);
    result.description.must.be.equal(newerTodo.description);
    result.isDone.must.be.equal(newerTodo.isDone);

    // expect createdDate and updateDate is not null\
    result.createdDate.must.be.equal(createdDate);
    result.updateDate.must.be.equal(updateDate);
  });

  //   test update-todo lines 9-10
  it('Should update the object given an ID and only isDone being updated', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updateDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerTodo)
    });

    // checks if HTTP status code is = 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expects ID exists
    result.id.must.be.equal(id);

    // expects all values = newerTodo properties
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    result.isDone.must.be.equal(newerTodo.isDone);

    // expect createdDate and updateDate is not null\
    result.createdDate.must.be.equal(createdDate);
    result.updateDate.must.be.equal(updateDate);
  });

  //   test update-todo line 11
  it('Should update the object given an ID and only title is updated', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      title: 'New Todo for update 2'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updateDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerTodo)
    });

    // checks if HTTP status code is = 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expects ID exists
    result.id.must.be.equal(id);

    // expects all values = newerTodo properties
    result.title.must.be.equal(newerTodo.title);
    result.description.must.be.equal(newTodo.description);
    result.isDone.must.be.false();

    // expect createdDate and updateDate is not null\
    result.createdDate.must.be.equal(createdDate);
    result.updateDate.must.be.equal(updateDate);
  });
});
