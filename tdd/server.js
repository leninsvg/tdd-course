const express = require('express')
const axios = require('axios')
const parser = require('body-parser');
const {posts} = require('./endpoints');
const {authenticate} = require('./middlewares');
const app = express()
const port = process.env.PORT || 3000;

app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
const postsHandlers = posts({axios})
app.post('/', authenticate, postsHandlers.post)

app.listen(port, () => console.log(`Listening on port ${port}`));