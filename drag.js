/* https://www.mozilla.org/en-US/MPL/2.0/ */

var draggableCat, currentShadowDropzone, offsetX, offsetY;

function findShadowZoneUnderPoint(x, y) {
    var shadowZones = document.querySelectorAll('.shadow-cats-container>.cat')

    for (let i = 0; i < shadowZones.length; i++) {
        var shadowZone = shadowZones[i].getBoundingClientRect();


        if (x > shadowZone.left && x < shadowZone.right && y > shadowZone.top && y < shadowZone.bottom) {

            return shadowZones[i];
        }
    }
}

function onMouseDown(event) {

    draggableCat = event.target.closest(".draggable");


    if (draggableCat) {

        var box = draggableCat.getBoundingClientRect();


        offsetX = event.clientX - box.x; // pobiera koordynaty kursowa wewnątrz elementu draggable poprzez odjęcie odległości kursora do krawędzi od odleglosci krawedzi do viewporta;
        offsetY = event.clientY - box.y;


        draggableCat.style.width = box.width.toFixed() + "px";
        draggableCat.style.height = box.height.toFixed() + "px";
        draggableCat.style.left = (event.clientX - offsetX) + "px";
        draggableCat.style.top = (event.clientY - offsetY) + "px";


        this.addEventListener("mousemove", onMouseMove);
        this.addEventListener("mouseup", onMouseUp);

    }
}

function onMouseMove(event) {

    draggableCat.style.position = "fixed";
    draggableCat.style.zIndex = "999";
    draggableCat.style.left = (event.clientX - offsetX) + "px";
    draggableCat.style.top = (event.clientY - offsetY) + "px";


    var dropzone = findShadowZoneUnderPoint(event.clientX, event.clientY);


    if (dropzone !== currentShadowDropzone) {
        if (dropzone) {


        }
        if (currentShadowDropzone) {


        }

    }

}

function onMouseUp(event) {

    var zone = findShadowZoneUnderPoint(event.clientX, event.clientY);

    if (zone) {

        if (zone.style.backgroundImage === draggableCat.style.backgroundImage) {

            document.querySelector('.shadow-cats-container').replaceChild(draggableCat, zone)
            checkIfComplete();
            clearCats();
            draggableCat.classList.remove("draggable");
            draggableCat.style.order = null;
            document.removeEventListener("mouseup", onMouseUp);


        } else {

            clearCats();

        }
        document.removeEventListener("mousemove", onMouseMove)

    } else {
        document.removeEventListener("mouseup", onMouseUp);
        clearCats();
    }

}

function clearCats() {
    document.removeEventListener("mousemove", onMouseMove)
    draggableCat.style.position = null;
    draggableCat.style.top = null;
    draggableCat.style.left = null;
}