const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

let isApiBusy = false;

const sloFn = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("your api is success in 5s");
    }, 20000);
  });
};

app.get("/my-api", async (req, res) => {
  if (!isApiBusy) {
    isApiBusy = true;
    try {
      const ok = await sloFn();
      res.send(ok);
      isApiBusy = false;
    } catch (err) {
      console.log(err, "err is here");
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.send("api is busy, try later");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
