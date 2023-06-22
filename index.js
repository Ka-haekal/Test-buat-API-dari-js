const express = require('express');
const app = express();
const port = 1200;
const basePath = "users";
const { baseUrl } = require('./global');
const route  = require('./routes/routes');

app.get(`/${basePath}`, (req, res) => {
    res.json({message: "API Started"});
});

app.use(`/${basePath}`, route);

app.listen(port, () => {
    console.log(`Server Running At ${baseUrl(port, basePath)}`);
});