const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const routes = require('./routes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 4001;

app.use("/api",routes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
