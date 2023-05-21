/* const app = "https://opentdb.com/api.php?amount=10"*/



let link = "https://opentdb.com/api.php?amount=10"
let category = document.getElementById ("category")
let dificulty = document.querySelector ("#dificulty")
let type = document.querySelector ("#type")
let app = ""
let _start = document.querySelector ("#btn-start")
let container = document.querySelector (".container")
let index = 0
let score = 0

let next = document.querySelector(".next-button")




/**************************************** STAR TRIVIA ***************************************/

function startTrivia() {

    _category = category.value
    _dificulty = dificulty.value
    _type = type.value

    if (_category == 0) {
        _category = ""
    }else {
        _category = "&category=" + _category
    }

    if (_dificulty == 0) {
        _dificulty = ""
    }else {
        _dificulty = "&difficulty=" + _dificulty
    }

    if (_type == 0) {
        _type = ""
    }else {
        _type = "&type=" + _type
    }
        
    app = link + _category + _dificulty + _type



    fetch(app)
        .then(response => response.json())
        .then(data => {
            questions = data.results;
            /* console.log(questions) */
            
            _question(questions, index)
            
        })
        
        .catch(error => console.log(error))
        
    }




/*************************************** SHOW QUESTION **************************************/
    
function _question(data, index){

    
    container.innerHTML = `
    <div class="cat-score">
        <p class="category">${data[index].category}</p>
        <p class="score">Score: ${score}</p>
    </div>
    <h2 class="quest">${data[index].question}</h2>
    <p class="difficulty">${data[index].difficulty}</p>
    <p class="numQuest">${[index+1]}/10</p>
    <ul id="options">
    </ul>

    <div class="nextAnswer">
    <button class="next-button" onclick="compareAnswer()">Next</button>
    <button class="next-button" onclick="finalScore()">Home</button>
    </div>
    `
    
    //console.log(data)  // Aqui se muestran todas las preguntas
    _options()    
}




/************************************* CREATE RANDOM LIST ***********************************/

function _options() {

    const list = [questions[index].correct_answer].concat(questions[index].incorrect_answers)
    //console.log(list)  //Aqui se muestran respuesta correcta  +  respuestas incorrectas
    console.log(questions[index].correct_answer)  //Aqui se muestra la respuesta correcta

    let aleatory = []
    
    
    for (let i = 0; i < list.length; i++) {
        const resultado = Math.floor(Math.random() * list.length)
        let numSplice = list.splice(resultado, 1)
        if (aleatory.length != list.length) {
            i--
        }
        aleatory.push(numSplice)
    }
    //console.log(aleatory) //Aqui se muestran las respuestas de manera aleatoria

    
    for (let i = 0; i < aleatory.length; i++) {
        let options = document.querySelector ("#options")
        let li = document.createElement('li')
        li.setAttribute("class", "listOption")
        li.textContent = `${aleatory[i]}`

        options.appendChild(li)
    }

    changeClass()
}




/****************************** COMPARE ANWER SELECTED & CORRECT ****************************/
    
function compareAnswer() {

    let nextAnswer = document.querySelector(".nextAnswer")

    if (document.querySelector(".selected").textContent == questions[index].correct_answer){
        score += 100
        
        nextAnswer.innerHTML = `
        <div Class="coment">
        Good! You win 100 Points
        </div>
        `
        setTimeout(function () {
            console.log("Cargando")
            suma()
        }, 2000)
        
    }else{
        nextAnswer.innerHTML = `
        <div Class="coment">
        Incorrect answer
        <br>
        Correct Answer is: 

        ${questions[index].correct_answer}
        </div>
        `
        setTimeout(function () {
            suma()
        }, 2000)
    }

}

function suma(){

    if (index < 9) {
        index ++
        return _question(questions, index)
    }else {
        finalScore()
        //window.location.href = "config.html";
    }
}




/************************************ ADD CLASE "SELECTED" **********************************/

function changeClass (){

    document.querySelector(".next-button").disabled = true;
    document.querySelectorAll('li').forEach((option) =>{
        option.addEventListener('click', () =>{
            if(document.querySelector('.selected')){
                const activeOption = document.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            document.querySelector(".next-button").disabled = false;
            option.classList.add('selected');
        })
    })
}





/******************************************* FINISH *****************************************/

function finalScore(){

    container.innerHTML = `
    <h2>Congratulation</h2>
    <p class="text">You Score is:</p>
    <p class="text">${score}</p>
    <button class="next-button" onclick="home()">Home</button>
    <button class="next-button" onclick="config()">New Trivia</button>
    `
}




function home(){
    window.location.href = "index.html";
}

function config() {
    window.location.href = "config.html"
}