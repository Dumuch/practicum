const express = require('express');
const path = require('path');

const app = express();
const PORT = 3007;

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'pages', 'index', 'index.html'));

});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
