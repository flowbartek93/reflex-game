const restartBtn = document.createElement("button");
const messageBoard = document.querySelector('.section-btns');



function checkIfComplete() {



    // Check if main cat board DIV conatins no childrens(cats)
    if (catBoard.children.length === 0) {
        win = true;
    }

    if (win === false) {

        const stopwatch = document.querySelector('.watch-container');
        messageBoard.appendChild(restartBtn);
        restartBtn.textContent = "restart"
        restartBtn.classList.add("restart-btn")
        document.querySelector('.section-btns p').textContent = `You slow loser ! Your time is: ${stopwatch.textContent}`;
        stopwatch.remove();

        restartBtn.addEventListener("click", restartGame)

    } else if (win === true) {

        const stopwatch = document.querySelector('.watch-container');
        messageBoard.appendChild(restartBtn);
        restartBtn.textContent = "restart"
        restartBtn.classList.add("restart-btn")
        document.querySelector('.section-btns p').textContent = `You are pretty fast ! Your time is: ${stopwatch.textContent}`;
        stopwatch.remove();

        restartBtn.addEventListener("click", restartGame)

    }

}

function restartGame() {


    const catsToBeRemoved = document.querySelector('.shadow-cats-container')
    document.querySelector('.cat-shadow-board').removeChild(catsToBeRemoved);
    buttonsContainer.style.display = "flex";
    restartBtn.remove();
    document.querySelector('.section-btns p').remove();



    while (catBoard.hasChildNodes()) {
        catBoard.removeChild(catBoard.childNodes[0]);
    }

    win = null;
    idCounter = 0;
    document.removeEventListener("mousemove", onMouseMove)
    document.removeEventListener("mousedown", onMouseDown)
    document.removeEventListener("mousemove", onMouseUp)




}