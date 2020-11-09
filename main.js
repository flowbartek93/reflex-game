// https://www.mozilla.org/en-US/MPL/2.0/


const addBtn = document.querySelector('.add-btn') // button dodający kota
const startBtn = document.querySelector('.start-btn') //button startujący grę
const catBoard = document.querySelector('.cat-board'); //flexbox z kotami
const buttonsContainer = document.querySelector('.btn-container');
const section = document.querySelector('.section-btns'); //przyciski
let idCounter = 0;
let win = null;

function downloadCat() { // Funkcja będzie pobierać koty z serwera (fetch api) np. 100 kotów, ale wylosuje tylko 6 i na ich bazie stworzy elementy html.

    const catsUrl = "https://api.thecatapi.com/v1/images/search";
    fetch(catsUrl)
        .then(response => {

            return response.json();
        })
        .then(json => displayCat(json[0].url)).catch(Error("error"))


}

function displayCat(imgUrl) {
    // podanie w funkcji pobranego url, który potem jest umieszczany w css
    let counter = catBoard.children.length;
    if (counter >= 5) {

        alert("Osiągnięto maksymalną ilość kotów na planszy !!!")
        return;
    }
    const newCat = document.createElement("div");
    newCat.setAttribute("class", "cat");
    newCat.setAttribute("id", idCounter++);
    newCat.classList.add("draggable");
    newCat.style.backgroundImage = "url(" + imgUrl + ")";
    catBoard.appendChild(newCat);
    newCat.style.order = counter;

}


/* Wyświetlenie stopera */

function drawStopwatch() {

    const watchContainer = document.createElement('div');
    watchContainer.classList.add('watch-container');
    watchContainer.innerHTML = `<span class="seconds">00</span>:<span class="miliseconds">00</span>`;
    section.insertAdjacentElement('beforeend', watchContainer);


}


/* Stoper */




function stopwatch() {

    const secondsHandler = document.querySelector('.seconds')
    const milisecondsHandler = document.querySelector('.miliseconds')

    const maxtime = setDifficulty();
    console.log(maxtime);

    let seconds = 0;
    let milsecs = 0;



    /* Checking if allowed time was exceed */
    const timerSecs = setInterval(() => {

        (function () {
            const totaltime = parseInt(secondsHandler.textContent + milisecondsHandler.textContent) / 100;


            if (totaltime >= maxtime) {
                const catsLeft = catBoard.querySelectorAll('.cat');
                clearInterval(timerSecs);
                document.removeEventListener("mousemove", onMouseMove)
                document.removeEventListener("mouseup", onMouseUp)
                document.removeEventListener("mousedown", onMouseDown)
                /* Przegrana */
                if (!win === true) {
                    win = false
                    checkIfComplete();
                    catsLeft.forEach(cat => {
                        cat.style.position = null;
                        cat.style.top = null;
                        cat.style.left = null;
                        cat.classList.remove('draggable');
                    })
                    return;
                } else {

                    win = null;
                }
                console.log(win);

            }
        }());


        /* Simulation of stopwatch */

        milsecs++

        if (milsecs < 9) {
            milisecondsHandler.innerHTML = "0" + milsecs;
        }

        if (milsecs > 9) {
            milisecondsHandler.innerHTML = milsecs;

        }

        if (milsecs > 99) {
            seconds++;
            secondsHandler.innerHTML = "0" + seconds;
            milsecs = 0;
            milisecondsHandler.innerHTML = "0" + 0;
        }

        if (seconds > 9) {
            secondsHandler.innerHTML = seconds;
        }

    }, 10)

}


function setDifficulty() {

    let catsNumber = catBoard.children.length;
    let difficulty = 1.2 * catsNumber;

    return difficulty;

}

function startGame() {

    win = null;
    let catsNumber = catBoard.children.length;

    //sprawdzenie czy są dodane jakieś koty - jeśli nie to startGame() nie może się dalej wykonać
    if (catsNumber === 0) {
        alert("Musisz dodać jakieś koty !!!");
        return;
    } else if (catsNumber > 0) {

        const paragraph = document.createElement("p");
        buttonsContainer.style.display = "none";
        paragraph.textContent = "Fit cats to their matchning clones !"
        section.appendChild(paragraph);

    }

    createShadowCats(); // odpalenie drugiej planszy na cienie kotów
    drawStopwatch(); // rysuj stoper
    stopwatch(); // odpal stoper

    document.addEventListener("mousedown", onMouseDown); // 
}




/* Top shadow cats board */

function createShadowCats() {
    const shadowCatsBoard = document.querySelector('.cat-shadow-board'); // główny kontener html
    const catBoardCopy = catBoard.cloneNode(true); // kopia catBoard ze jego dziećmi(koty)
    const shadowCatsContainer = document.createElement("div");
    shadowCatsBoard.appendChild(shadowCatsContainer);
    shadowCatsContainer.classList.add("shadow-cats-container");

    const catArrayList = [...catBoardCopy.querySelectorAll('.cat')];
    catArrayList.forEach(item => {


        item.style.order = null;
        item.removeAttribute("id")
        item.style.opacity = "0.2";
        item.classList.remove("draggable");

    })

    let numbers = [...Array(catArrayList.length).keys()];

    function randomIndex() {
        return Math.floor((Math.random() * catArrayList.length - 1) + 1);
    }

    numbers.map(function () {

        const index = randomIndex();
        shadowCatsContainer.appendChild(catArrayList[index]);
        catArrayList.splice(index, 1);

    })

}


/*Buttons add cat and start game*/

document.addEventListener("DOMContentLoaded", function () {
    addBtn.addEventListener("click", downloadCat)
    startBtn.addEventListener("click", startGame)

})