const notesListGet = require('./routes/notes-list-get.js');
const notesListSet = require('./routes/notes-list-set.js');

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
  next();
};
