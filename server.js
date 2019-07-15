let express = require('express');
let app = express();
let http = require('http').Server(app);

app.use(express.static("public"));

http.listen(3000, function() {
    console.log("server started on port 3000");
});