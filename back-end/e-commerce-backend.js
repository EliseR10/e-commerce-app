/*Starting a server*/
const express = require('express');
const app = express();

const PORT = 3000;

/*Listener*/
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});

