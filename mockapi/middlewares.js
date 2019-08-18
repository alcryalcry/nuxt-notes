const notesListGet = require('./routes/notes-list-get.js');
const notesListSet = require('./routes/notes-list-set.js');
const notesListRemove = require('./routes/notes-list-remove.js');

module.exports = (req, res, next) => {
  if (req.originalUrl.includes('api/notes_list_get')) {
    const params = req.body;
    notesListGet(params, res);
    return;
  }
  if (req.originalUrl.includes('api/notes_list_set')) {
    const params = req.body;
    notesListSet(params, res);
    return;
  }
  if (req.originalUrl.includes('api/notes_list_remove')) {
    const params = req.body;
    notesListRemove(params, res);
    return;
  }
  next();
};
