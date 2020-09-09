const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');

let result = 0;
let timerIdrand;
let hitPosition = null,
    prevHitPosition = null;

function start() {
    let currentTime = timeLeft.textContent;
    document.getElementById('start').disabled = true;

    function randomSquare() {
        if (prevHitPosition != null) {
            prevHitPosition.classList.remove('mole');
        }
        let randomPosition = square[Math.floor(Math.random() * 9)];
        randomPosition.classList.add('mole');
        //assign the id of the randomPosition to hitPosition for us to use later
        hitPosition = randomPosition.id;
        prevHitPosition = randomPosition;
    }

    square.forEach(elem => {
        elem.addEventListener('mouseover', func);
    })

    function moveMole() {
        timerIdrand = setInterval(randomSquare, 600);
    }

    moveMole();

    function func() {
        // console.log('hi')
        if (this.id === hitPosition) {
            result = result + 1;
            score.textContent = result;
            hitPosition = null;
        }
    }

    function countDown() {
        currentTime -= 1;
        timeLeft.textContent = currentTime;

        if (!currentTime) {
            alert('GAME OVER! Your final score is ' + result);
            clearInterval(timerIdrand);
            clearInterval(timerId);
            square.forEach(elem => {
                elem.removeEventListener('mouseover', func);
            })
        }
    }

    let timerId = setInterval(countDown, 1000);
}