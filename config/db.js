const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("our db is connected");
  })
  .catch((err) => console.log(err.message));
