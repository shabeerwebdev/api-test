const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

let isApiBusy = false;

app.get("/my-api", (req, res) => {
  if (!isApiBusy) {
    isApiBusy = true;
    try {
      setTimeout(() => {
        res.send("your api is success");
      }, "50000");
      isApiBusy = false;
    } catch (err) {}
  } else {
    res.send("api is busy, try later");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
