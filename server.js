const app = require("./app");

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const { BD_HOST, PORT = 3000 } = process.env;



mongoose
  .connect(BD_HOST)
  .then(() => app.listen(PORT))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })

