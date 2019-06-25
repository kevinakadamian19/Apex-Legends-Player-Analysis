'use-strict';

apiKey = '30606dfd-770c-450d-a6ae-2a51ff66d915'

function formatQuery(params) {
	const queryItems = Object.keys(params)
		.map(key => `${key}=${params[key]}`)
		return queryItems.join('&');
}

function getSummonerData() {
	const platformSelected = $('#server-value').val();
	const baseUrl = `https://public-api.tracker.gg/v2/apex/standard/search`;
	const userName = $('#user-input').val();

	const params = {
		platform: platformSelected,
		query: userName
	};

	const options = {
		headers: new Headers({
			"TRN-Api-Key": apiKey})
	};

	const queryString = formatQuery(params);
	const url = baseUrl + '?' + queryString;

	fetch(url, options)
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
