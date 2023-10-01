//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('#search').addEventListener('click', findDrink);
document.querySelector('body').addEventListener('click', pickDrink);
let drinklist;
let scroller = document.querySelector('.results');
let carousel = document.querySelector('.container');


function findDrink() {
    let drink = document.querySelector('input').value;

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+drink)
        .then(res => res.json())
        .then(data => {
            drinklist = data.drinks;
            carousel.innerHTML = '';
            drinklist.forEach((el,index) => {
                carousel.innerHTML += (
                    `<button id="result-${index}" type="button">
					<img src="${el.strDrinkThumb}">
					<span>${el.strDrink}</span>
				    </button>`
                );
            });
            scroller.setAttribute('data-animated', false);
            addAnimation();
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

function addAnimation() {
    scroller.setAttribute('data-animated', true);
    
    let carouselContent = Array.from(carousel.children);

    carouselContent.forEach(el => {
        let duplicatedItem = el.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', true);
        carousel.appendChild(duplicatedItem);
    })
}

/*
hw:
1- dont use template literal then try to make work w/ spaces in drink name -- DONE
2- get it to cycle drinks when there are multiple that come from search
    - try working in .setInterval()
*/