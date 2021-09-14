const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const apiRouter = require("./routes");
const platform = require("./platform");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/public', express.static('public'));

app.use("/", apiRouter);
app.listen(platform.port, () => {
  console.log(`Listening to port ${platform.port}..`);
});
