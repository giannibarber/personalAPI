const { dbQuery } = require("./db-query");

module.exports = class PgPersistence {
  // Create a new todo with the specified title and add it to the indicated todo
  // list. Returns `true` on success, `false` on failure.
  async createTodo(title) {
    let CREATE_TODO = `INSERT INTO todos (title, status) VALUES ($1, false)`;

    let result = await dbQuery(CREATE_TODO, title);
    return result.rowCount > 0;
  }

  // Delete the specified todo from the specified todo list. Returns `true` on
  // success, `false` if the todo or todo list doesn't exist. The id arguments
  // must both be numeric.
  async deleteTodo(todoId) {
    const DELETE_TODO = "DELETE FROM todos WHERE id = $1";

    let result = await dbQuery(DELETE_TODO, todoId);
    return result.rowCount > 0;
  }

  // Returns a copy of the indicated todo in the indicated todo list. Returns
  // `undefined` if either the todo list or the todo is not found. Note that
  // both IDs must be numeric.
  async loadTodo(todoId) {
    const FIND_TODO = "SELECT * FROM todos WHERE id = $1";

    let result = await dbQuery(FIND_TODO, todoId);
    return result.rows[0];
  }

  // Returns a promise that resolves to a sorted list of all the todos in the
  // specified todo list. The list is sorted by completion status and title
  // (case-insensitive).
  async sortedTodos() {
    const FIND_TODOS = "SELECT * FROM todos";

    let result = await dbQuery(FIND_TODOS);

    return result.rows;
  }

  // Toggle a todo between the done and not done state. Returns a promise that
  // resolves to `true` on success, `false` if the todo list or todo doesn't
  // exist. The id arguments must both be numeric.
  async toggleDoneTodo(todoId) {
    const TOGGLE_DONE = "UPDATE todos SET status = NOT status WHERE id = $1";

    let result = await dbQuery(TOGGLE_DONE, todoId);
    return result.rowCount > 0;
  }
};
