var path = require("path");
var express = require("express");

var DIST_DIR = path.join(__dirname, "dist");
var PORT = 3000;
var app = express();

// Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get('*', (req, res) => {
    const ext = path.extname(req.path);
    if(ext === ''){
        res.sendFile(path.join(DIST_DIR, 'index.html'));
    }else{
        res.status(405).send('Not Found');
    }
    
});

app.listen(PORT);