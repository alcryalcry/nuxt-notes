const notesList = require('./routes/notes-list.js');
const notesListAdd = require('./routes/notes-list-add.js');

module.exports = (req, res, next) => {
  if (req.originalUrl.includes('api/notes_list_get')) {
    const params = req.body;
    notesList(params, res);
    return;
  }
  if (req.originalUrl.includes('api/notes_list_add')) {
    const params = req.body;
    notesListAdd(params, res);
    return;
  }
  next();
};
