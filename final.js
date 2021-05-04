function createRestartBtn() {
  const messageBoard = document.querySelector(".section-btns");
  const restartBtn = document.createElement("button");
  messageBoard.appendChild(restartBtn);
  restartBtn.textContent = "restart";
  restartBtn.classList.add("restart-btn");

  restartBtn.addEventListener("click", restartGame);
}

function checkIfComplete() {
  console.log("checking");
  // Check if main cat board DIV conatins no childrens(cats)
  if (catBoard.children.length === 0) {
    win = true;
    const stopwatchContainer = document.querySelector(".watch-container");
    document.querySelector(".section-btns p").textContent = `You are pretty fast ! Your time is: ${stopwatchContainer.textContent}`;
    stopwatchContainer.remove();

    createRestartBtn();
  }

  if (win === false) {
    const stopwatchContainer = document.querySelector(".watch-container");
    const catsLeft = catBoard.querySelectorAll(".cat");
    catsLeft.forEach(cat => {
      cat.style.position = null;
      cat.style.top = null;
      cat.style.left = null;
      cat.classList.remove("draggable");
    });
    document.querySelector(".section-btns p").textContent = `You slow loser ! Your time is: ${stopwatchContainer.textContent}`;
    stopwatchContainer.remove();

    createRestartBtn();
  }
}

function restartGame() {
  const catsToBeRemoved = document.querySelector(".shadow-cats-container");
  document.querySelector(".cat-shadow-board").removeChild(catsToBeRemoved);
  buttonsContainer.style.display = "flex";
  document.querySelector(".restart-btn").remove();
  document.querySelector(".section-btns p").remove();

  while (catBoard.hasChildNodes()) {
    catBoard.removeChild(catBoard.childNodes[0]);
  }

  win = null;
  idCounter = 0;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mousedown", onMouseDown);
  document.removeEventListener("mousemove", onMouseUp);
}
