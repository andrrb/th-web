const express = require('express');
const {join, resolve} = require('path');
const PORT = process.env.PORT || 8080;
express()
    .use(express.static(join(resolve('..'), 'client')))
    .get('/tasks', (request, response) => {
    })
    .put('/tasks', (request, response) => {
    })
    .listen(PORT, () => console.log(`Server is running on port ${PORT}.`));