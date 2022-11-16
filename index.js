import {questions} from './data.js'

let index = 0;
const gridItems = document.getElementsByClassName('grid-item')
let current_grid_item = gridItems[0]
let prev_grid_item = current_grid_item;
let timer = 3 * 60

const initialize = () => {
    // Initializing empty array of answers
    for (let i=0; i<questions.length; i++) {
        questions[i].answer = []
    }
}

const changeQuestion = (index) => {

    // Question No.
    document.getElementById('qno').innerHTML = `Question no: ${index+1}`

    // Question
    document.getElementById('question').innerHTML = questions[index].question;

    // Options
    for (let i=0; i < 4; i++){
        
        let option = "null"
        let op = "null" 
        if(i == 0) {
            option = "first"
            op = "a"
        } else if (i == 1) {
            option = "second"
            op = "b"
        } else if (i == 2) {
            option = "third"
            op = "c"
        } else if (i == 3) {
            option = "fourth"
            op = "d"
        }
    
    const val = questions[index].options[i]
    let checked = false

    // If options are already checked
    if (questions[index].answer.includes(val)){
        checked = true
    }

    document.getElementById(`${option}`).outerHTML = `<input type="${questions[index].type}" id="${option}" name="answer" value="${val}" ${checked && "checked"}/>`
    document.getElementById(`${option}_label`).outerHTML = `<label id="${option}_label" for="${option}"> <span id="option" >(${op}) </span>${val}</label>`
    
    }
}

const prevQ = () => {
    if (index == 0) return

    setCheckedOption()

    index = index - 1;
    // changeQuestion(index) 
    selectGrid(index)
} 

const nextQ = () => {
    if (index ==  questions.length-1) return
    
    setCheckedOption()
    // console.log(questions)

    index = index + 1;
    // changeQuestion(index)
    selectGrid(index)
} 

const countdown = () => {
    if (timer < 0) return
    
    timer -= 1

    let seconds = Math.floor(timer%60)
    let minutes =  Math.floor(timer/60)

    if ( minutes == 2 && seconds == 0 ) alert("!!! 2 MINUTES MORE !!!")
    if ( minutes == 0 && seconds == 0 ) submitForm()
    if ( seconds < 10 ) seconds = "0" + seconds
    if ( minutes < 10 ) minutes = "0" + minutes

    document.getElementById('seconds').innerHTML = seconds
    document.getElementById('minutes').innerHTML = minutes
}


const submitForm = () => {
    setCheckedOption()
    timer=0
    
    document.getElementById('main').classList.remove('flex-row')
    document.getElementById('main').classList.add('hidden')
    document.getElementById('success').classList.remove('hidden')

    displayAnswers()
}

const displayAnswers = () => {
    for (let i=0;i < questions.length;i++) {

        // Question Number
        const qno = document.createElement('p')
        qno.id = "result"
        qno.innerHTML = `Question no: ${i+1}`
        document.getElementById('success').appendChild(qno)

        // Question
        const question = document.createElement('p')
        question.id = "question"
        question.innerHTML = questions[i].question;
        document.getElementById('success').appendChild(question)

        // Options
        for (let j=0; j < 4; j++){
            
            let option = "null" 
            let op = "null"
            if(j == 0) {
                option = "first"
                op = "a"
            } else if (j == 1) {
                option = "second"
                op = "b"
            } else if (j == 2) {
                option = "third"
                op = "c"
            } else if (j == 3) {
                option = "fourth"
                op = "d"
            }
        
        const val = questions[i].options[j]
        let checked = false

        // If options are already checked
        if (questions[i].answer.includes(val)){
            checked = true
        }

        const opt = document.createElement(`div`)
        opt.className = "margin-10"
        opt.innerHTML = 
        `<input type="${questions[i].type}" id="${option}" name="answer" value="${val}" ${checked && "checked"} disabled/>
        <label id="${option}_label" for="${option}"> <span id="option" >(${op}) </span>${val}</label>
        `
        document.getElementById('success').appendChild(opt)
        }

    }
}

const selectGrid = (i) => {
    index = i  //For next and prev buttons to work

    prev_grid_item?.classList.remove('selected-grid-cell')

    current_grid_item = gridItems[i]
    current_grid_item.classList.add('selected-grid-cell') 


    changeQuestion(i)

    prev_grid_item = current_grid_item
}

const reviewQ = () => {
    gridItems[index].classList.add('review-grid-cell')
}

const setCheckedOption = () => {

    const options = document.getElementsByName('answer')
    for (let i=0; i<options.length; i++) {
        if (options[i].checked) {
            // console.log(options[i].value)
            current_grid_item.classList.add('answered-grid-cell')
            questions[index].answer.push(options[i].value)
        }
    }
}

initialize()

current_grid_item.classList.add('selected-grid-cell')

document.getElementById('prev-btn').addEventListener("click", prevQ)
document.getElementById('next-btn').addEventListener("click", nextQ)
document.getElementById('review').addEventListener("click", reviewQ)
document.getElementById('submit').addEventListener("click", submitForm)

for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("click", ()=>{
        setCheckedOption()
        selectGrid(i)
    })
}


setInterval(countdown, 1000);