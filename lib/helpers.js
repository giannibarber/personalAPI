const TODO_ATTRS = ['id', 'title', 'status'];

module.exports = {
  extractAttrs: function(body) {
    let returnObj = {};
    Object.keys(body).forEach(function(key) {
      if (TODO_ATTRS.includes(key)) returnObj[key] = body[key];
    });

    return returnObj;
  }
}
