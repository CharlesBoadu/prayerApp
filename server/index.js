const express = require("express");
const wealthRoutes = require("./router/wealthRoutes");
const healthRoutes = require("./router/healthRoutes");
const warfareRoutes = require("./router/warfareRoutes");
const praiseRoutes = require("./router/praiseRoutes");
const protectionRoutes = require("./router/protectionRoutes");
const cors = require("cors");

const port = 6000;

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Welcome to the Prayer App Backend!");
});

app.use("/wealth", wealthRoutes); 
app.use("/health", healthRoutes);  
app.use("/warfare", warfareRoutes);
app.use("/praise", praiseRoutes);
app.use("/protection", protectionRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
