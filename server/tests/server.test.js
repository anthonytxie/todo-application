const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {toDo} = require('./../models/todo');

beforeEach((done) => {
  toDo.remove({}).then(() => done());
});

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

        toDo.find().then((todos) => {
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
          expect(todos.length).toBe(0);
          done();
      }).catch((e) => done(e));
   });
  });
});
