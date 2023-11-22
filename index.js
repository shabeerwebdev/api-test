// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000;

// let isApiBusy = false;

// const sloFn = () => {
//   return setTimeout(() => {
//     isApiBusy = false;
//   }, 20000);
// };

// app.get("/my-api", (req, res) => {
//   const clientIP =
//     req.headers["x-forwarded-for"] || req.connection.remoteAddress;

//   console.log("clientIP is here", clientIP, isApiBusy, "clientIP is here");
//   if (!isApiBusy) {
//     isApiBusy = true;
//     try {
//       const ok = sloFn();
//       res.send(ok);
//     } catch (err) {
//       console.log(err, "err is here");
//       res.status(500).send("Internal Server Error");
//     }
//   } else {
//     console.log("api is busy, try later");
//     res.send("api is busy, try later");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

let isApiBusy = false;

// Middleware to check if the API is busy
const apiGuard = (req, res, next) => {
  if (!isApiBusy) {
    isApiBusy = true;
    next();
  } else {
    res.status(503).send("API is busy, please try again later.");
  }
};

// Your endpoint
app.get("/my-api", apiGuard, async (req, res) => {
  try {
    // Your API logic goes here

    // Simulating some async operation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Send a response
    res.send("Your API response");
  } finally {
    // Release the API lock
    isApiBusy = false;
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
