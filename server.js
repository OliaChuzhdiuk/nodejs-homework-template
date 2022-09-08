const app = require('./app')

const mongoose = require("mongoose");
const { BD_HOST, PORT = 3000 } = require('./config');



mongoose.connect(BD_HOST)
.then(() => app.listen(PORT))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })

