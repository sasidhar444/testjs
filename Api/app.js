const express = require('express');
const cors = require('cors');
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(fileUpload());

// Routes will always go here 
app.use('/', require('./route'));

//exit everything 
process.on('SIGINT', () => {
process.exit(0);
});

var port = process.env.PORT || 3000;

if(process.env.NODE_ENV !== 'test'){
	app.listen(port, async () => {
		console.log(`Server started on port ${port} on ENV: ${process.env.NODE_ENV}`);
	});
}

module.exports = app; 