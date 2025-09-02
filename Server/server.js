require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/database");

app.listen(process.env.PORT || 3000, () => {
  console.log(`server listening at port ${process.env.PORT || 3000}....`);
});
connectDB();
