const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes')
const defaultRoutes = require('./routes/defaultRoute');
const syncTable = require('./models/synctables');

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: "GET,POST",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(userRoutes, groupRoutes, defaultRoutes);

syncTable()
    .then((() => {
        app.listen((3000), () => {
        
            console.log("Listening to requests on port 3000");
        })
    }))
    .catch(err => {
        console.log("got error: ", err)
    })
