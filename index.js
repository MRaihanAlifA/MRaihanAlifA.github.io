const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
// membuat pertanyaan
let questions = [
    {
        question : "Apa simbol kimia untuk perak?",
        // imgSrc : ".\picture\soal01.PNG",
        choiceA : "AG",
        choiceB : "Co2",
        choiceC : "H2O",
        choiceD : "B",
        correct : "A"
    },{
        question : "berapa lama capung rata rata bertahan hidup?",
        // imgSrc : ".\picture\soal02.PNG",
        choiceA : "2 hari",
        choiceB : "2 bulan",
        choiceC : "1 bulan",
        choiceD : "24 jam",
        correct : "D"
    },{
        question : "Berapa banyak hati yang dimiliki oleh Gurita?",
        // imgSrc : ".\picture\soal03.PNG",
        choiceA : "1",
        choiceB : "2",
        choiceC : "3",
        choiceD : "4",
        correct : "C"
    },
    {
        question : "Klub mana yang memenangkan final Piala FA 1986",
        // imgSrc : ".\picture\soal04.PNG",
        choiceA : "Liverpool",
        choiceB : "Arsenal",
        choiceC : "M.United",
        choiceD : "Chelsea",
        correct : "A"
    },
    {
        question : "Klub mana yang memenangkan final Piala FA 1986",
        // imgSrc : ".\picture\soal04.PNG",
        choiceA : "Liverpool",
        choiceB : "Arsenal",
        choiceC : "M.United",
        choiceD : "Chelsea",
        correct : "A"
    }
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
// merender pertanyaan
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    // qImg.innerHTML = `<img src="${q.imgSrc}" >`;;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}
start.addEventListener("click",startQuiz);
// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}
// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}
// counter render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // mengubah warna progress ke merah
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // akhiri quiz dan munculkan hasil
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
// cek jawaban
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        // ubah warna progress ke hijau
        answerIsCorrect();
    }else{
        // ubah warna progress ke merah
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // akhiri quiz dan memperlihatkan hasil
        clearInterval(TIMER);
        scoreRender();
    }
}
//  jawaban salah
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}
// jawaban benar
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
// munculkan hasil
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // hitung hasil
    const scores = Math.round(100 * score/questions.length);
    //munculkan hasil
    scoreDiv.innerHTML = "<p>"+ scores +"%</p>";
}