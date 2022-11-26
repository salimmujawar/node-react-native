require("dotenv").config();
const express = require('express');
const userRouter = require('./routers/user');
//const stockRouter = require('./routers/stock');


const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(userRouter);
//app.use(stockRouter);


app.listen(port, function() {
  console.log(`Server listining at port: ${port}`);
})

