const request = require('request');

const options = {
  method: 'GET',
  url: 'https://remote-jobs-api.p.rapidapi.com/jobs',
  qs: {company: 'shopify'},
  headers: {
    'X-RapidAPI-Key': '3920685daemsh040d25d3e815f76p178171jsn2b01d96b31b7',
    'X-RapidAPI-Host': 'remote-jobs-api.p.rapidapi.com'
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});