// Detail

function getUrl(){
    let  searchString = window.location.search;
    let parameter = searchString.split('%27')[1];
    return parameter;
}

console.log(getUrl());

function getDetail(){
    let id = getUrl();
    fetch(`https://api.rawg.io/api/games/23943`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            createDetail(data);
        });

}

getDetail();

function createDetail(game){
    element = document.querySelector('.gameDetail');
    element.innerHTML += `
            <li class="game">
                    <div class="game__screenshot">
                        <img src="${game.background_image}" alt="">
                    </div>
                    <div class="game__title">${game.name}</div>
                   
                    <div class="game__description">${game.description}</div>
                  
                </li>
        `;
}

function createRecommendationList(gamesList){

}