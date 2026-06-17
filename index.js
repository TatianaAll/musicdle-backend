const app = require('./app.js');

app.listen(process.env.PORT || 3005, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});