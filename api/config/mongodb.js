const mongoose = require('mongoose');

mongoose.connect(process.env.MON_DB_URI)
.then(() => {
  console.log('Mongo db is connected')
})
.catch(err => console.log(err.message));