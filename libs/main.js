let startGame = document.getElementById("startGame")
let bad = document.getElementById("bad");
let rl = document.getElementById("rl");

let test = document.querySelectorAll("li")
let ul = document.getElementById("myList")

const imageData = [
    {
        "name": "image1",
        "url": "img-maquette/biere.png"
    },
    {
        "name": "image2",
        "url": "img-maquette/bouteille-verre.png"
    },
    {
        "name": "image2",
        "url": "img-maquette/bouteille-verre.png"
    },
]

function generateImageList() {
    let imageList = [];
    for (let i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * imageData.length);
        let randomImage = imageData.splice(randomIndex, 1)[0];
        imageList.push(randomImage);
    }
    return imageList;
}

bad.style.display = "none"
rl.style.display = "none"

startGame.addEventListener("click", function (){
    startGame.style.display = "none";
    rl.style.display = "flex"

    let xhr = new XMLHttpRequest()
    xhr.open("GET", "libs/infos.json");
    xhr.responseType = "json";

    xhr.onload = function(){
        if(xhr.status === 404){
            alert("Ville non trouver..");
            return;
        }else if(xhr.status === 401){
            alert("Erreur d'authentification");
            return;
        }else if(xhr.status === 500){
            alert("Erreur sur l'api");
            return;
        }
        let response = xhr.response


        const imageList = generateImageList();
        for (let i = 0; i < imageList.length; i++) {
            let image = imageList[i];
            let imageElement = document.createElement('img');
            imageElement.src = image.url;
            imageElement.alt = image.name;
            imageElement.draggable = true
            ul.appendChild(imageElement);
        }
    }
    xhr.send()
})

function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);
    event.dataTransfer.clearData();
    console.log(dropzone)
    console.log(draggableElement)
}