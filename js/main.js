//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('#search').addEventListener('click', findDrink);
document.querySelector('body').addEventListener('click', pickDrink);
let drinklist;
let searchBlock = document.querySelector('header');
let resultsBlock = document.querySelector('main');
let pickedBlock = document.querySelector('article');
let scroller = document.querySelector('.results');
let carousel = document.querySelector('.container');


async function findDrink() {
    let drink = document.querySelector('input').value;

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+drink)
        .then(res => res.json())
        .then(data => {
            drinklist = data.drinks;
            console.log(drinklist)
            carousel.innerHTML = '';
            if (drinklist.length > 0) {
                searchBlock.classList.add('setTop')
                resultsBlock.classList.add('show')
                drinklist.forEach((el,index) => {
                    carousel.innerHTML += (
                        `<button id="result-${index}" type="button">
                        <img src="${el.strDrinkThumb}">
                        <span>${el.strDrink}</span>
                        </button>`
                    );
                })
            };            
            scroller.setAttribute('data-animated', false);
            if (scroller.clientWidth < scroller.scrollWidth) {
                addAnimation();
            };
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

function pickDrink() {
    let selection = document.querySelector('#selectedDrink')
    let selection_name = document.querySelector('#selectedName')
    let is_alcoholic = document.querySelector('#alch')
    let glass_used = document.querySelector('#glass')
    let ingredients = document.querySelector('#ingredients')
    let selection_pic = document.querySelector('#selectedImage')
    let selection_instructions = document.querySelector('#instructions')

    if (event.target.id != 'search' && event.target.tagName == 'BUTTON') {
        let drinkIndex = Number(event.target.id.slice(-1));
        selection_drink = drinklist[drinkIndex];
        // name
        selection_name.innerHTML = selection_drink.strDrink
        // alcoholic?
        is_alcoholic.innerHTML = `- ${selection_drink.strAlcoholic}`
        if(is_alcoholic.innerHTML.toLowerCase() == 'alcoholic') {
            is_alcoholic.style.color = 'green'
        } else {
            is_alcoholic.style.color = 'red'
        }
        // glass used
        glass_used.innerHTML = `- ${selection_drink.strGlass}`
        // ingredients
        let items = [], amount = []
        for (let key in selection_drink) {
            if (key.includes('Ingredient') && selection_drink[key] != null) {
                items.push(selection_drink[key])
            }
            if (key.includes('Measure') && selection_drink[key] != null) {
                amount.push(selection_drink[key])
            }
        }
        console.log(items, amount)
        // picture
        selection_pic.src = selection_drink.strDrinkThumb
        // instructions
        selection_instructions.innerHTML = selection_drink.strInstructions
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

/*
what I want to add...
- while maintaining auto-scroll, have a "center" page with options on either side smaller and blurred out slightly
- clicking on option should create content below and animate-drag the page down to look at it
    - as many details as possible in details page
*/