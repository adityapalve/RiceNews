const express = require("express");
const fetch = require('node-fetch');
const querystring = require('querystring');
const app = express();

const port = process.env['PORT'];
const apiKey = process.env['apiKey'];

//Returning static content for the webpage
app.use('/',express.static("public"));

//Returning country-wise general headlines
app.get('/country',(req,res)=>{
	fetch(`https://newsapi.org/v2/top-headlines?country=${querystring.decode(req._parsedOriginalUrl.query).value}&category=general&sortBy=popularity&sortBy=relevance&apiKey=${apiKey}`)
	.then(res=>res.json())
	.then(data=>{
		//Sending fetched data
		res.json(data);

		//Logging details
		console.log(`DATA FOR ${querystring.decode(req._parsedOriginalUrl.query).value} RETURNED`);
	})
	.catch((err)=>{
		//Returning error code when data couldn't be found for the country value
		res.status(500).json({errorCode: 1, errorName: `Couldn't find news w/ country value ${querystring.decode(req._parsedOriginalUrl.query).value}`});

		//Logging error
		console.error(`Couldn't find news w/ country value ${querystring.decode(req._parsedOriginalUrl.query).value}:\n`,error);
	});
});

app.get('/news',(req,res)=>{
	fetch(`https://newsapi.org/v2/top-headlines?country=${querystring.decode(req._parsedOriginalUrl.query).country}&category=${querystring.decode(req._parsedOriginalUrl.query).category}&sortBy=popularity&sortBy=relevance&apiKey=${apiKey}`)
	.then(res=>res.json())
	.then(data=>{
		//Sending fetched data
		res.json(data);

		//Logging details
		console.log(`DATA FOR ${querystring.decode(req._parsedOriginalUrl.query).value} RETURNED`);
	})
	.catch((err)=>{
		//Returning error code when data couldn't be found for the country value
		res.status(500).json({errorCode: 1, errorName: `Couldn't find news w/ country value ${querystring.decode(req._parsedOriginalUrl.query).value}`});

		//Logging error
		console.error(`Couldn't find news w/ country ${querystring.decode(req._parsedOriginalUrl.query).county} & category ${querystring.decode(req._parsedOriginalUrl.query).category}:\n`,error);
	});
});


app.listen(port,(err)=>{
	if (err){
		console.log(`ERROR WHILE LISTENING TO THE PORT`,err);
	}
	console.log(`APP STARTED AT PORT ${port}`);
});