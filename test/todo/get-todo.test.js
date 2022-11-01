import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Creating a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return the object given an ID', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/todo/${id}`
    });

    // checks if HTTP status code is = 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expects ID exists
    result.id.must.be.equal(id);

    // expects all values = newTodo properties
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);

    // expects isDone is false because not given
    result.isDone.must.be.false();

    // expect createdDate and updateDate is not null\
    result.createdDate.must.not.be.null();
    result.updateDate.must.not.be.null();
  });
});
