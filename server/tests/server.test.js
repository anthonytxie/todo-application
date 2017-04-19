const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb'); //destructuring
const {app} = require('./../server');
const {toDo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}]

const userNotFound = new ObjectID()

beforeEach((done)=> {
  toDo.remove({}).then(() => {
    return toDo.insertMany(todos)
  }).then(() => done());
})

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        toDo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create an invalid body todo', (done) => {
  	var emptyMessage = '    ';
  	request(app)
      .post('/todos')
      .send({emptyMessage})
      .expect(400)
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        toDo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
      }).catch((e) => done(e));
   });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos' )
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
})

describe('GET /todos/:id', () => {
  it('should get todos by id', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it('should return a 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${userNotFound.toHexString()}`)
      .expect(404)
      .expect(`Unable to find User ${userNotFound.toHexString()}`)
      .end(done);
  })

  it('should return 404 for non-object IDs', (done) => {
    request(app)
      .get(`/todos/1234135123`)
      .expect(404)
      .end(done);
  })

})




