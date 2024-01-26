const PG = require('./pg-persistence');

const pg = new PG();

module.exports = class todosManager {
  async add(todoAttrs) {
    return await pg.createTodo(todoAttrs.title);
  }

  async get(id) {
    return await pg.loadTodo(id);
  }

  async getAll() {
    return await pg.sortedTodos();
  }

 async remove(id) {
    return await pg.deleteTodo(id);
  }

  async update(id) {
    return await pg.toggleDoneTodo(id);
  }
}
