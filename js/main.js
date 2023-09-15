//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('#search').addEventListener('click', findDrink);
document.querySelector('body').addEventListener('click', pickDrink);
let drinklist;

function findDrink() {
    let drink = document.querySelector('input').value;
    let carousel = document.querySelector('#results');

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+drink)
        .then(res => res.json())
        .then(data => {
            drinklist = data.drinks;
            console.log(drinklist)
            carousel.innerHTML = '';
            drinklist.forEach((el,index) => {
                carousel.innerHTML += (
                    `<button id="result-${index}" type="button">
					<img src="${el.strDrinkThumb}">
					<span>${el.strDrink}</span>
				    </button>`
                );
            });
            // document.querySelector(`#results`).button.addEventListener('click', pickDrink);
            /* concerning cloning nodes for carousel
            // let copy = document.querySelector('ul').cloneNode(false);
            // document.querySelector('ul').appendChild(copy);

            // document.querySelector('h2').innerText = target.strDrink
            // document.querySelector('img').src = target.strDrinkThumb
            // document.querySelector('h3').innerText = target.strInstructions
            */
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

function pickDrink() {
    let selection_name = document.querySelector('article h2');
    let selection_pic = document.querySelector('article img');
    let selection_instructions = document.querySelector('article p');

    if (event.target.id != 'search' && event.target.tagName == 'BUTTON') {
        selection_name.innerHTML = '';
        selection_pic.src = '';
        selection_instructions.innerHTML = '';
        
        let drinkIndex = Number(event.target.id.slice(-1));
        selection_drink = drinklist[drinkIndex];
        selection_name.innerHTML = selection_drink.strDrink;
        selection_pic.src = selection_drink.strDrinkThumb;
        selection_instructions.innerHTML = selection_drink.strInstructions;
    }
}
/*
hw:
1- dont use template literal then try to make work w/ spaces in drink name -- DONE
2- get it to cycle drinks when there are multiple that come from search
    - try working in .setInterval()
*/