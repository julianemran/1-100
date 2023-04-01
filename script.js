let gameDiv = document.getElementById("game-container")
const popupContainer = document.getElementById("popup-container");
let time = document.getElementById("time")
let rows = []
let writtenNumbers = []
let score = 0
let rowIndex = 0
let timeStarted = false
let timer;
let seconds = 60;

for (let i = 0; i < 17; i++) {
    rows[i] = document.createElement("div");
    rows[i].className = "game-row";
}


for (let i = 1; i <= 101; i++) {
    if (i % 17 == 0){
        rowIndex = 0
    } 

    let numberDiv = document.createElement("div");
    if(i>100){
        numberDiv.className = "hidden";
    }
    else{
        numberDiv.className = "game-cell";
        numberDiv.setAttribute("id", i)
    }
    rows[rowIndex].appendChild(numberDiv)
    gameDiv.appendChild(rows[rowIndex])
    rowIndex++
}


let input = document.getElementById("input")
let scoreDiv = document.getElementById("score")
input.addEventListener("input", () => {
    if(!timeStarted){
        startTimer()
    }
    let numberDiv = document.getElementById(input.value)
    if(numberDiv && numberDiv.innerHTML == ''){
        numberDiv.innerHTML = input.value
        numberDiv.style.backgroundColor = "#b3d0d5"
        writtenNumbers.push(input.value)
        input.value = ''
        score++
        scoreDiv.innerHTML = score
        if (writtenNumbers.length == 100){
            stopGame()
        }
    }
    else if(parseInt(input.value) > 100 || input.value[0] == '0'){
        document.body.style.backgroundColor = "#ffc107";
    }
    else{
        document.body.style.backgroundColor = "white"
    }
})


let startTimer = () => {
    timeStarted = true
    timer = setInterval(() => {
        seconds--;
        if(seconds > 9){
            time.innerHTML = seconds;
        }
        else{
            time.innerHTML = "0" + seconds;
        }
        if (seconds == 0) {
            stopGame()
        }
    }, 1000);
}


let stopGame = () =>{
    document.body.style.backgroundColor = "white"
    clearInterval(timer);
    if(writtenNumbers.length != 100){ //lose
        replaceInput()
        for(let i =1; i <= 100; i++){
            if(!writtenNumbers.includes(i.toString())){
                numDiv = document.getElementById(i)
                numDiv.innerHTML = i
                numDiv.classList.add("left-numbers");
            }
        }
    }
    else{ // win
        input.disabled = true
        popupContainer.style.display = "flex";
        document.getElementById("time-passed").innerHTML = 60 - seconds
    }
}

let replaceInput = () => {
    let resetBtn = document.createElement("button")
    resetBtn.setAttribute("class", "image-button")
    resetBtn.addEventListener("click", () => {
        location.reload();
    });
      
    let loopImage = document.createElement("img");
    loopImage.src = "loop_btn.png";
    resetBtn.appendChild(loopImage);
    input.replaceWith(resetBtn);
}
