'use-strict';

const baseUrl = "https://api.magicthegathering.io/v1/cards"

function formatQuery(params) {
	const queryItems = Object.keys(params)
		.map(key => `${key}=${params[key]}`)
		return queryItems.join('&');
}

function callToApi() {
    const cardName = $('#card-input').val();
    const cardNameArray = cardName.split(",");

    const params = {
        'name': cardNameArray
    }

    const queryString = formatQuery(params);
    const url = baseUrl + '?' + queryString;

    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayCards(responseJson))
        .catch(err => alert('Something went wrong with one of the promises.'));
}

function displayCards(responseJson) {
    console.log(responseJson);
    $('.results').empty();
	const cardSearch = responseJson.cards;

    if(cardSearch.length === 0) {
		$('.results').append(`
			<h2>No card found with that title!</h2>
			<p>Please enter any part of the card's title(followed by a comma for multiple searches).</p>
            `)
        }
    else {
        for(i = 0;i < cardSearch.length; i++) {
            $('.results').append(`
                    <img src="${cardSearch[i].imageUrl}" alt="${cardSearch[i].name}" id="${cardSearch[i].name}">
                `)};
        }
}

function clearBrokenCards() {
    const brokenImages = $('.results').children('img');
    if(brokenImages.attr('src') === "undefined") {
       
    }
}

function watchForSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        callToApi();
	});
}

function renderPage() {
    console.log('App is loaded. Waiting for submit!')
    watchForSubmit();
}

renderPage();