const express = require("express");
const app = express();

let isApiBusy = false;

app.get("/endpointAB", async (req, res) => {
  if (isApiBusy) {
    return res.status(503).json({ message: "API busy, try again later." });
  }

  // Set the flag to indicate that the API is busy
  isApiBusy = true;

  try {
    // Simulate a time-consuming process (5 minutes in this case)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Your actual processing logic goes here

    // Send the response when processing is complete
    res.json({ message: "Processing complete" });
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    // Reset the flag to indicate that the API is no longer busy
    isApiBusy = false;
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
