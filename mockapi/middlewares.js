const notesList = require('./routes/notes-list.js');

module.exports = (req, res, next) => {
  if (req.originalUrl.includes('api/notes_list')) {
    const params = req.body;
    notesList(params, res);
    return;
  }
  next();
};
