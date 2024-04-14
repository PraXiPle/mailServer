const cookieParser = require("cookie-parser");
const express = require("express"),
  app = express(),
  CORS = require("cors"),
  PORT = 3001;
require("dotenv").config();
require("./DL/db.js").connect();
app.use(cookieParser());

app.use(
  CORS({
    credentials: true,
    optionsSuccessStatus: 200,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/user", require("./routes/user.router.js"));


app.use("/chats", require("./routes/chat.router.js"));
app.use("/userchats", require("./routes/userChat.router.js"));
app.listen(PORT, () => {
  console.log(`\x1b[42m [index.js] server is runing in port ${PORT} \x1b[0m`);
});
