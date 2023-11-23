const express = require("express");
const app = express();

let isApiBusy = false;

app.get("/endpointAB", async (req, res) => {
  if (isApiBusy) {
    console.log(isApiBusy, "isApiBusy");
    return res.status(503).json({ message: "API busy, try again later." });
  }

  isApiBusy = true;
  console.log(isApiBusy, "isApiBusy down");

  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    res.json({ message: "Processing complete" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    isApiBusy = false;
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
