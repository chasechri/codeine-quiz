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

const next_btn = quiz_box.querySelector(".next-btn");

// when next button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
    }else{
        console.log("Questions completed");
    }
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