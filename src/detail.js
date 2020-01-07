// Detail

function getUrl(){
    let  searchString = window.location.search;
    let parameter = searchString.split('%27')[1];
    return parameter;
}

console.log(getUrl());

function getDetail(){
    let id = getUrl();
    fetch(`https://api.rawg.io/api/games/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            createDetail(data);
        });

}



getDetail();

function createDetail(game){
    element = document.querySelector('.gameDetail');
    let suggestions;




    element.innerHTML += `<div class="detail__label">Game Detail</div>`;
    element.innerHTML += `
            <li class="game">
                    <div class="game__screenshot">
                        <img src="${game.background_image_additional}" alt="">
                    </div>
                    <div class="game__title">${game.name}</div>
                    <div class="game__rating"><strong>Rating: </strong>${game.rating}</div>
                    <div class="game__platforms">
                        <strong>Platforms: </strong>
                        <ul>${makePlatformList(game.platforms)}</ul>
                    </div>
                    <div class="game__description">${game.description}</div>
                   
                </li>
        `;

    createSuggestionsList(game.id);


}

function test(){
    let i = '';
    return `<div>${i}</div>`;
}


function getRecommendations(gameId){
    return fetch(`https://api.rawg.io/api/games/${gameId}/suggested`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data.results;
        });
}

function createSuggestionsList(gameId){
    let list = '';

    getRecommendations(gameId).then( data => {
        console.log(data);

        data.forEach((game) => {
            list += `
                        <div class="game">
                            <div class="game__screenshot">
                                <img src="${game.background_image}" alt="">
                            </div>
                            <div class="game__title">${game.name}</div>
                            <a href="http://localhost:63342/gameSearch-web/detail.html?gameId='${game.id}'" class="game__details">Details</a>
                        </div>
                            `;
        });
        let e = document.querySelector('.suggestions');
        e.innerHTML += `<div class="suggestions__label">Similar Games</div>`;
        e.innerHTML += list;
    });



}

function makePlatformList(array){
    let list = "";

    array.forEach(element => {
       list += `<li class="game__platform"> ${element.platform.name}</li>`
    });
    
    return list;
}