import {questions} from './data.js'

let index = 0;
const gridItems = document.getElementsByClassName('grid-item')
let current_grid_item = gridItems[0]
let prev_grid_item = current_grid_item;
let review = [];
let timer = 180


const countdown = () => {
    if (timer < 0) return
    
    timer -= 1

    let seconds = Math.floor(timer%60)
    let minutes =  Math.floor(timer/60)

    if ( minutes == 2 && seconds == 0 ) alert("!!! 2 MINUTES MORE !!!")
    if ( seconds < 10 ) seconds = "0" + seconds
    if ( minutes < 10 ) minutes = "0" + minutes

    document.getElementById('seconds').innerHTML = seconds
    document.getElementById('minutes').innerHTML = minutes
}

const changeQuestion = (index) => {

    // Question No.
    document.getElementById('qno').innerHTML = `Question no: ${index+1}`

    // Question
    document.getElementById('question').innerHTML = questions[index].question;

    // Options
    for (let i=0; i < 4; i++){
        
        let option = "null" 
        if(i == 0) {
            option = "first"
        } else if (i == 1) {
            option = "second"
        } else if (i == 2) {
            option = "third"
        } else if (i == 3) {
            option = "fourth"
        }
    
    const val = questions[index].options[i]
    
    document.getElementById(`${option}`).outerHTML = `<input type="${questions[index].type}" id="${option}" name="answer" value="${val}"/>`
    document.getElementById(`${option}_label`).outerHTML = `<label id="${option}_label" for="${option}">${val}</label>`
    
    }

}


const prevQ = () => {
    if (index == 0) return

    index = index - 1;
    changeQuestion(index) 
    selectGrid(index)
} 

const nextQ = () => {
    if (index ==  questions.length-1) return
    
    index = index + 1;
    changeQuestion(index)
    selectGrid(index)
} 

const reviewQ = () => {
    review.push(questions[index])
    gridItems[index].classList.add('review-grid-cell')
}

const selectGrid = (i) => {
    index = i  //For next and prev buttons to work

    prev_grid_item?.classList.remove('selected-grid-cell')

    current_grid_item = gridItems[i]
    current_grid_item.classList.add('selected-grid-cell')

    changeQuestion(i)

    prev_grid_item = current_grid_item
}

const submitForm = () => {
    document.getElementById("myForm").submit()
}

current_grid_item.classList.add('selected-grid-cell')

document.getElementById('prev-btn').addEventListener("click", prevQ)
document.getElementById('next-btn').addEventListener("click", nextQ)
document.getElementById('review').addEventListener("click", reviewQ)


for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("click", ()=>{selectGrid(i)})
}


setInterval(countdown, 1000);