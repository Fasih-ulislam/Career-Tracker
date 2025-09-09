require("dotenv").config();
const server = require("./app");
const connectDB = require("./config/database");

server.listen(process.env.PORT || 3000, () => {
  console.log(`server listening at port ${process.env.PORT || 3000}....`);
});
connectDB();
