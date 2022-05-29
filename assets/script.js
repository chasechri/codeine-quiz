const start_btn = document.querySelector(".start-btn button");
const quiz_box = document.querySelector(".quiz-box");
const timeCount = document.querySelector(".timer .timer-sec");

const option_list = document.querySelector(".option-list");

// when start button clicked quit starts
start_btn.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(75);
}

let que_count = 0;
let que_numb = 1;
let counter;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next-btn");
const result_box = document.querySelector(".result-box");
const restart_quiz = document.querySelector(".buttons .restart");
const quit_quiz = document.querySelector(".buttons .quit");
const compare_results = document.querySelector(".compare-results");
const results_btn = document.querySelector(".buttons .compare");

results_btn.onclick = ()=>{
    compare_results.classList.add("activeCompare");
}

// when next button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        next_btn.style.display = "none";
    }else{
        console.log("Questions completed");
        let highScores = JSON.parse(localStorage.getItem("currentScore")) || []
        highScores.push (userScore)
        highScores.sort (function (a, b) {
            return b-a;
        })
        console.log(highScores)
        localStorage.setItem("currentScore", JSON.stringify(highScores))
        showResultBox();
    }
}

function displayScores() {
    
}

// getting Qs and options form array
function showQuestions(index){
    const que_text = document.querySelector(".que-text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'<span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answers){
    let userAns = answers.textContent;
    let correctAns = questions[que_count].answers;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore)
        answers.classList.add("correct");
        console.log("Answer is correct");
    }else{
        answers.classList.add("wrong");
        console.log("Answer is wrong");

        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox(){
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score-text");
    if(userScore < 6){
        let scoreTag = '<span>You answered <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> questions correctly...</span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "0";
        }
    }
}

function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total-que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}

let questions = [
    {
        numb: 1,
        question: "What color is an apple?",
        answers: "Red",
        options: [
            "Blue",
            "Red",
            "Green",
            "Black"
        ]
    },
    {
        numb: 2,
        question: "What color is the sky?",
        answers: "Blue",
        options: [
            "Pink",
            "White",
            "Purple",
            "Blue"
        ]
    },
    {
        numb: 3,
        question: "How many hours are in a day?",
        answers: "24",
        options: [
            "12",
            "24",
            "7",
            "365"
        ]
    },
    {
        numb: 4,
        question: "How many days are in a week?",
        answers: "7",
        options: [
            "7",
            "24",
            "31",
            "365"
        ]
    },
    {
        numb: 5,
        question: "What does 5x5 equal?",
        answers: "25",
        options: [
            "1",
            "5",
            "25",
            "55"
        ]
    },
];