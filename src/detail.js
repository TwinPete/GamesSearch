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





    element.innerHTML += `
            <li class="game">
                    <div class="game__screenshot">
                        <img src="${game.background_image}" alt="">
                    </div>
                    <div class="game__title">${game.name}</div>
                   
                    <div class="game__description">${game.description}</div>
                    <div class="game__suggestions">
                        <div class="suggestions__title">Similar Games</div>
                        <div class="slider">
                            <div class="slider__content">${createSuggestionsList(game.id)}</div>
                            <div class="arrow arrow__left"></div>
                            <div class="arrow arrow__right"></div>
                        </div>
                    </div>
                </li>
        `;


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
            console.log(game.name);
            list += `
                        <div class="item">
                            <div class="item__image">
                                <img src="${game.background_image}" alt="">
                            </div>
                            <div class="item__title">${game.name}</div>
                            <a href="http://localhost:63342/gameSearch-web/detail.html?gameId='${game.id}'" class="game__details">Details</a>
                        </div>
                            `;
        });
        let e = document.querySelector('.slider__content');
        e.innerHTML = list;
    });



}