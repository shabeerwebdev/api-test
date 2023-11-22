const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

let isApiBusy = false;

const sloFn = () => {
  return setTimeout(() => {
    resolve("your api is success in 5s");
    isApiBusy = false;
  }, 20000);
};

app.get("/my-api", (req, res) => {
  const clientIP =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  console.log("clientIP is here", clientIP, isApiBusy, "clientIP is here");
  if (!isApiBusy) {
    isApiBusy = true;
    try {
      const ok = sloFn();
      res.send(ok);
    } catch (err) {
      console.log(err, "err is here");
      res.status(500).send("Internal Server Error");
    }
  } else {
    console.log("api is busy, try later");
    res.send("api is busy, try later");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
