let show = true

const menu = document.getElementById("sidebar")
const allCards = document.getElementById("all_cards")
let id = 1


function menufuncion() {
    if (show) {
        menu.className = "hide"
        show = false
        return;
    }
    menu.classList.remove("hide")
    show = true
    return;
}

let selected = "no"
let firstSelect = 0
let startId = 0
let countInProcess = true


const whiteHtml = ` <button onclick="whiteFn(event, {select:true})" class="take_white">Yes</button>
                    <button onclick="whiteFn(event, {select:false})" class="inner_start">No</button>
                    `
const startComp = ` <button onclick="takeWhite(event)" class="take_white">Take White</button>
                    <button onclick="startTime(event)" class="inner_start">Start</button>`

const countdown = `<h1 class="counter"><span class="hours">00</span>:<span class="minutes">00</span></h1> <span class="counter_percent"> 0%</span>`
const complition = `<button onclick="takeWhite(event)" class="take_white">Take White</button>
<button onclick="startTime(event)" class="inner_start">Start</button>`


for(let i= 1; i <= 16; i++ ){
    
allCards.innerHTML  += `<div class="card">
<div class="inner_card uncompleated ">   
  <p>${i}</p>
  <h4 class="as" style="padding: 0"></h4>
  <h4><input class="inputSampleName" placeholder="Enter Sample Name" type="text"/></h4>
  <div id = "${i}">
  <button onclick="takeWhite(event)" class="take_white">
  Take White
</button>
<button onclick="startTime(event)" class="inner_start">
  Start
</button>
  </div>
  <div class="showCompletion">
    <img width="90px" title="check" src="./img/check.svg" />
  </div>
</div>
</div>`

++id
}


const backgroundCounter = (percentage) => {
    return ` linear-gradient(90deg, #e7e6e6 0%, #e7e6e6 ${percentage}%, rgb(179,213,255) ${percentage}%, rgb(179,213,255) 100%)`
}

function takeWhite(event) {
    event.stopPropagation();
    if (firstSelect === 0) {
        const perntNode = event.srcElement.parentNode.parentNode
        console.dir(perntNode.children[1].innerText = "White?")
        event.srcElement.parentNode.innerHTML = whiteHtml
    } else {
        console.log("already taken")
    }
}

function whiteFn(event, select) {
    event.stopPropagation();
    if (select.select) {
        const perntNode = event.srcElement.parentNode.parentNode
        console.dir(perntNode.children[1].innerText = "")
        event.srcElement.parentNode.innerHTML = startComp
        selected = select.select
        firstSelect = 1;
        return;
    } else {
        const perntNode = event.srcElement.parentNode.parentNode
        console.dir(perntNode.children[1].innerText = "")
        event.srcElement.parentNode.innerHTML = startComp
        selected = select.select
        firstSelect = 0;
        return
    }
}



function startTime(event) {
    event.stopPropagation();

    event.srcElement.parentNode.setAttribute('class', "countertimer")
    const perntNode = event.srcElement.parentNode.parentNode
    // console.dir(event.srcElement.parentNode.parentNode)
  if(perntNode.getElementsByTagName("input")[0].value == ""){
    perntNode.getElementsByTagName("input")[0].value = event.srcElement.parentNode.parentNode.children[0].innerText
  }

    const startId = event.srcElement.parentNode.attributes[0].nodeValue
    event.srcElement.parentNode.innerHTML = countdown
    counter(startId)
}

function counter(data) {
    let clicked = true

    const counterId = document.getElementById(data)
    counterId.innerHTML = countdown;
    let countminutes = 58;
    let counthours = 3;
    let totalMinutes = 240
    let initialnumber = 0
    counterId.style.background = backgroundCounter(0)
    
    const myInterval = setInterval(() => {
        ++countminutes
        counterId.children[0].children[1].innerHTML = countminutes
        let percent = (initialnumber / totalMinutes) * 100
        counterId.children[1].innerHTML = `${Math.floor(percent)}%`
        ++initialnumber
        counterId.style.background = backgroundCounter(percent)

        if (countminutes > 60) {
            countminutes = 0;
            ++counthours;
            counterId.children[0].children[1].innerHTML = countminutes
            counterId.children[0].children[0].innerHTML = counthours
        }
        if (counthours == 4) {
            clearInterval(myInterval)
            counterId.children[1].innerHTML = " ";
            counterId.style.background = "#00a814"
            counterId.style.color = "White"
            countInProcess = false
                   
        }
    }, 1000)
    counterId.addEventListener('click', ()=> {myfunction(counterId)})
}

const myfunction = (counterId)=> {
    if(countInProcess){
        counterId.addEventListener('click', (event)=>{
            console.log()
        })
    return
    }
    counterId.innerHTML = startComp
    countminutes = 58   
    counthours = 3;    
    countInProcess = true
}

