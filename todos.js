const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs');
const path = require('path');
const TodosManager = require('./lib/todo-manager');
const helpers = require('./lib/helpers');

const app = express();
const todosManager = new TodosManager()

app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/todos', async (req, res) => {
  res.json(await todosManager.getAll());
});

app.get('/api/todos/:id', async (req, res) => {
  let todo = await todosManager.get(Number(req.params['id']));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).end();
  }
});

app.post('/api/todos', async (req, res) => {
  let todoAttrs = helpers.extractAttrs(req.body);
  let todo = await todosManager.add(todoAttrs);
  if (todo) {
    res.status(201).json({ title: todoAttrs.title, status: false}); // Should be in todosManager's logic.'
  } else {
    res.status(400).end();
  }
});

app.put('/api/todos/:id', async (req, res) => {
  let todo = await todosManager.update(Number(req.params['id']));
  if (todo) {
    res.status(201).json(todo); // still returns a boolean
  } else {
    res.status(400).end();
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  if (await todosManager.remove(Number(req.params['id']))) {
    res.status(204).end();
  } else {
    res.status(400).end();
  }
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

module.exports = app;
