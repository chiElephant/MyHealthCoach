const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT || 8000, () => {
  console.log(`server listening on port ${PORT}`);
});

//note: this app.listen is in it's own file because supertest requires it to test requests
