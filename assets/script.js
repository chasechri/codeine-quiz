const start_btn = document.querySelector(".start-btn");
const quiz_box = document.querySelector(".quiz-box")

// when start button clicked
start_btn.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
}