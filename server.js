const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'info.html'));
});

let activeUsers = 0;
const LIMIT = 5;

// user connect hone par
app.post("/pair", (req, res) => {

if(activeUsers >= LIMIT){
return res.json({
status: "full",
message: "Server Full"
});
}

activeUsers++;

res.json({
status: "ok",
message: "Connected"
});

});

// user disconnect hone par
function userDisconnected(){
if(activeUsers > 0) activeUsers--;
}

// dashboard status route
app.get("/status", (req, res) => {

res.json({
users: activeUsers,
limit: LIMIT,
status: activeUsers >= LIMIT ? "full" : "active"
});

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

