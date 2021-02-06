const info = document.querySelector('.fa-info-circle');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const options = document.getElementById('options');
const displayTime = document.getElementById('display-time');
const sayHi = document.getElementById('sayHi');
const leftTom = document.querySelector('.tom-lt');
const rightTom = document.querySelector('.tom-rt');
const cheekLeft = document.querySelector('.cheek-left');
const cheekRight = document.querySelector('.cheek-right');

const sound = new Audio('/mixkit-short-rooster-crowing-2470.wav');

let time = options.value * 60;
let timer;

/*FUNCTIONS*/
function updateTimer(){
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    displayTime.innerHTML = `${minutes}:${seconds}`;
    time--;

    if(minutes == 0 && seconds == 2){
        sound.play();
    }

    if( time === -1){
        clearInterval(timer);
        time = 0;
    }
}

function runAnimation(){
    const leftEye = document.querySelector('.pupil-left');
    const rightEye = document.querySelector('.pupil-right');
    
    leftEye.classList.add('active');
    rightEye.classList.add('active');
    cheekLeft .classList.add('active');
    cheekRight.classList.add('active');

    setTimeout(function(){
        leftEye.classList.remove('active');
        rightEye.classList.remove('active');
        cheekLeft .classList.remove('active');
        cheekRight.classList.remove('active')
    }, 6000);
}

/*EVENT LISTENERS*/
options.addEventListener('change', () => {
    if(options.value == 25){
        leftTom.classList.add('active');
        rightTom.classList.add('active');
        cheekLeft.classList.add('hide');
        cheekRight.classList.add('hide');

    } else if (options.value !== 25) {
        leftTom.classList.remove('active');
        rightTom.classList.remove('active');
        cheekLeft.classList.remove('hide');
        cheekRight.classList.remove('hide')
    }

    time = options.value * 60;
    clearInterval(timer);
    updateTimer();
    start.disabled = false;
})

start.addEventListener('click', ()=> {
    timer = setInterval(updateTimer, 1000);
    start.disabled = true;
});

stop.addEventListener('click', ()=> {
    clearInterval(timer);
    start.disabled = false;
});

reset.addEventListener('click', ()=> {
    clearInterval(timer);
    time = options.value * 60;
    updateTimer();
    start.disabled = false;
});

sayHi.addEventListener('click', runAnimation);

info.addEventListener('click', ()=> {
    const note = document.querySelector('.container-info');
    note.classList.toggle('active');
});

updateTimer();
