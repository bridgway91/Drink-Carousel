//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', findDrink);
document.querySelector('body').addEventListener('click', function(event) {
    if (event.target.tagName.toLowerCase() === 'li') {
      // do your action on your 'li' or whatever it is you're listening for
      console.log(event.target);
    }
});


function findDrink() {
    let drink = document.querySelector('input').value;

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+drink)
        .then(res => res.json())
        .then(data => {
            let target = data.drinks
            document.getElementById('drinks-list').innerHTML = ''
            target.forEach(el => {
                document.getElementById('drinks-list').innerHTML += (`<div><img src="${el.strDrinkThumb}">
                <span>${el.strDrink}</span></div>`);
            });
            // let copy = document.querySelector('ul').cloneNode(false);
            // document.querySelector('ul').appendChild(copy);

            // document.querySelector('h2').innerText = target.strDrink
            // document.querySelector('img').src = target.strDrinkThumb
            // document.querySelector('h3').innerText = target.strInstructions
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

function pickDrink() {
    console.log(target);
}
/*
hw:
1- dont use template literal then try to make work w/ spaces in drink name -- DONE
2- get it to cycle drinks when there are multiple that come from search
    - try working in .setInterval()
*/