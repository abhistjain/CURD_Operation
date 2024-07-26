const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*', 
}));
require('dotenv').config();
app.use(express.json());

const port = process.env.PORT || 8000; // Ensure the port is consistent

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port:", port);
    } else {
        console.log("Server failed to start:", error);
    }
});

const userRoute = require('./Routes/userRoutes');
app.use('/api/v1', userRoute);

const dbConnect = require('./config/database');
dbConnect();

app.get('/', (req, res) => {
    res.send("<h1>This is our HomePage!</h1>");
});
