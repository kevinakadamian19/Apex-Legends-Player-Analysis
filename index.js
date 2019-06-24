'use-strict';

apiKey = 'RGAPI-54f138c3-7bce-413e-9701-85fdb504dd4e'

function formatQuery(params) {
	const queryItems = Object.keys(params)
		.map(key => `${key}=${params[key]}`)
		return queryItems.join('&');
}

function getSummonerData() {
	const regionSelected = $('#server-value').val();
	console.log(regionSelected);
	const regionUrl = `https://${regionSelected}.battle.net/oauth/authorize`;

	const summonerName = $('#summoner-input').val();
	console.log(summonerName);
	const summonerUrl = `/lol/summoner/v4/summoners/by-name/${summonerName}`;

	const params = {
		"api_key": apiKey
	};

	const queryString = formatQuery(params);
	const url = regionUrl + summonerUrl + '?' + queryString;

fetch(url)
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJson => console.log(responseJson))
		.catch(err => alert('Something is wrong.'));
}

function watchSubmit() {
	$('form').submit(event => {
		event.preventDefault();
		getSummonerData();
	});
}

function renderApp() {
	console.log('App is loaded. Waiting for submission!');
	watchSubmit();
}

renderApp();

/*fetch(url)
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error('There was an error with entry')
			})
		.then(response.Json => console.log(responseJson))
		.catch(error => alert('Something went wrong with one of the promises.')) */