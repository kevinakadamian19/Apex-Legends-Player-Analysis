'use-strict';

const baseUrl = "https://api.magicthegathering.io/v1/cards"

//This function is for formatting the parameters to for the query string.
function formatQuery(params) {
	const queryItems = Object.keys(params)
		.map(key => `${key}=${params[key]}`)
		return queryItems.join('&');
}

//This function makes a call to the API with the given parameters.
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

//This function displays the results to the DOM by running a FOR ... loop.
function displayCards(responseJson) {
    console.log(responseJson);
    $('.results').empty();
    const cardSearch = responseJson.cards.filter(card => Object.keys(card).includes("imageUrl"));
    console.log(cardSearch); 

    if(cardSearch.length === 0) {
        $('.results').append(`
            <div class="unknown-search">
			    <h2>No card found with that title!</h2>
			    <p>Please enter any part of the card's title(followed by a comma for multiple searches.</p>
            </div>
            `)
        }
    else {
        for(i = 0;i < cardSearch.length; i++) {
            $('.results').append(`
            <div class="result-box">
                <h2>${cardSearch[i].name}</h2>
                <div class="card">
                    <img src="${cardSearch[i].imageUrl}" alt="${cardSearch[i].name}" id="${cardSearch[i].name}">
                    <ul>
                        <li>Rarity: ${cardSearch[i].rarity} </li>
                        <li>Set Name: ${cardSearch[i].setName}</li>
                        <li>Card Description: "${cardSearch[i].text}"</li>
	                </ul>
                </div>
            </div>
             `)};
        }
}

//This function waits for user to submit input. Then runs callToApi() function.
function watchForSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        callToApi();
	});
}

//This function is for rendering the Javascript code on the HTML page.
function renderPage() {
    console.log('App is loaded. Waiting for submit!')
    watchForSubmit();
}

renderPage();