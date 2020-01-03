

let apiKey = '6859949d';

let element = document.querySelector('.searchResults');

document.querySelector('.searchbar__button').addEventListener('click', function(){
    onSearch();
});


function onSearch(){
    let textString = document.querySelector('.searchbar input').value;
    if(textString.length > 0){
        getGames(textString);
    }
}



function getGames(gameName){

    gameName = gameName.toLowerCase().split(' ').join('%20');

    fetch(`https://api.rawg.io/api/games?page_size=7&search=${gameName}`)
        .then(response => response.json())
        .then(data => data.results)
        .then(data => {
            createGamesList(data);
        });
}




function showErrorMessage(){
    element.innerHTML = `<div class="noResults">No Movies found</div>`;
}

function createGamesList(games){

    for(let i = 0; i < games.length; i++){
        element = document.querySelector('.searchResults');
        let game = games[i];
        element.innerHTML += `
            <li class="movie">
                    <div class="movie__poster">
                        <img src="${game.background_image}" alt="">
                    </div>
                    <div class="movie__title">${game.name}</div>
                    <div class="movie__details">Details</div>
                </li>
        `;
    }
}

