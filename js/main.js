//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// fetches based on input field on pressing search button
document.querySelector('#search').addEventListener('click', findDrink);
// tracks all clicks on page, only activating when pressing a 'drink' button that appears after search
document.querySelector('body').addEventListener('click', pickDrink);

// drink object to hold info from search
let drinklist;
// location variables
const searchBlock = document.querySelector('header');
const resultsBlock = document.querySelector('main');
const selection = document.querySelector('article');
const scroller = document.querySelector('.results');
const carousel = document.querySelector('.container');
// location variables within article
const selection_name = document.querySelector('#selectedName')
const is_alcoholic = document.querySelector('#alch')
const glass_used = document.querySelector('#glass')
const ingredients = document.querySelector('#ingredients')
const selection_pic = document.querySelector('#selectedImage')
const selection_instructions = document.querySelector('#instructions')


async function findDrink() { // on search-button click
    let drink = document.querySelector('input').value;

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+drink)
        .then(res => res.json())
        .then(data => {
            drinklist = data.drinks; // array of objects [{.},{.},{.},{.},...]
            console.log(drinklist) // DELETE WHEN PROJECT COMPLETE
            carousel.innerHTML = ''; // clears anything in carousel
            if (drinklist) { // if drinks are found, adds them to carousel
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
            scroller.setAttribute('data-animated', false); // stops scrolling
            if (scroller.clientWidth < scroller.scrollWidth) { // starts scrolling anim if scroller would exceed a certain width
                addAnimation();
            };
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

function pickDrink() { // on any click if target is button but not search
    if (event.target.id != 'search' && event.target.tagName == 'BUTTON') {
        let drinkIndex = Number(event.target.id.split('-')[1]);
        let selection_drink = drinklist[drinkIndex]; // all info on clicked drink
        // name
        selection_name.innerHTML = selection_drink.strDrink
        // alcoholic?
        is_alcoholic.innerHTML = `${selection_drink.strAlcoholic}`
        if(is_alcoholic.innerHTML.toLowerCase() == 'alcoholic') {
            is_alcoholic.style.color = 'green'
        } else {
            is_alcoholic.style.color = 'red'
        }
        // glass used
        glass_used.innerHTML = `Glass: ${selection_drink.strGlass}`
        // ingredients
        ingredients.innerHTML = ''
        let items = [], amount = []
        for (let key in selection_drink) {
            if (key.includes('Ingredient')) items.push(selection_drink[key])
            if (key.includes('Measure')) amount.push(selection_drink[key])
        }
        console.log(items, amount)
        const ingred = amount.map((e,i)=>(e?e.endsWith(' ')?e:e+' ':'')+items[i]).filter(e=>e && e!='null')
        console.log(ingred)
        for (let ing of ingred) {
            ingredients.innerHTML += `<li>${ing}</li>`
        }
        console.log(ingredients)
        // picture
        selection_pic.src = selection_drink.strDrinkThumb
        // instructions
        selection_instructions.innerHTML = selection_drink.strInstructions

        selection.style.display = 'flex'
        selection.scrollIntoView({behavior: "smooth"})
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