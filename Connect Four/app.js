const squares = document.querySelectorAll('.grid div');
const result = document.querySelector('#result');
const displayCurrentPlayer = document.querySelector('#current-player');
let currentPlayer = 1;
const ids = ['player-one', 'player-two']
let len1 = 0,
    len2 = 0;
const len = squares.length;
for (var i = 0; i < len; i++) {
    console.log(i);

    (function(index) {
        //add an onclick to each square in your grid
        squares[i].onclick = function() {
            squares[index].setAttribute('id', index);
            if (squares[index].classList.contains('taken')) {
                if (currentPlayer === 1) {
                    squares[index].classList.remove('taken')
                    squares[index].classList.add('player-one')
                    len1 += 1;
                    currentPlayer = 2
                    displayCurrentPlayer.innerHTML = currentPlayer
                } else if (currentPlayer === 2) {
                    squares[index].classList.remove('taken')
                    squares[index].classList.add('player-two')
                    len2 += 1;
                    currentPlayer = 1
                    displayCurrentPlayer.innerHTML = currentPlayer
                }
                if (index >= 7) {
                    squares[index - 7].classList.add('taken')
                }
            } else console.log('cant go here')
        }
    })(i)
}
for (var i = 0; i < len; i++) {
    var x = squares[i];
    x.addEventListener('click', function() {
        if (len1 >= 4) {
            if (currentPlayer === 2) {
                pid = ids[0];
            } else {
                pid = ids[1];
            }
            let ans = checkforfour(parseInt(this.id), pid);
            if (ans) {
                setTimeout(() => {
                    alert("Congrats " + pid + "!!!\nYou have won")
                    endGame();
                }, 100);
            }
        }
    })
}

function endGame() {
    for (let i = 0; i < 7; i++) {
        for (let j = i; j < 49; j += 7) {
            if (squares[j].classList.contains('taken')) {
                squares[j].classList.remove('taken');
                break;
            }
        }
    }
}

function checkforfour(index, pid) {
    return checkdown(index, pid) ||
        checkdownleft(index, pid) ||
        checkdownright(index, pid) ||
        checkright(index, pid) ||
        checkleft(index, pid) ||
        checkupright(index, pid) ||
        checkupleft(index, pid);
}

function checkdown(index, pid) {
    if (index / 7 >= 4) {
        return false;
    }
    for (let i = 0; i <= 3; i++) {
        if (!squares[index].classList.contains(pid)) {
            return false;
        }
        index += 7;
    }
    return true;
}

function checkright(index, pid) {
    for (let i = 0; i <= 3; i++) {
        if (index > 48 || !squares[index].classList.contains(pid)) {
            break;
        }
        index += 1;
    }
    return checkleft(index, pid);
}

function checkleft(index, pid) {
    if (index % 7 < 3) {
        return false;
    }
    for (let i = 0; i <= 3; i++) {
        if (!squares[index].classList.contains(pid)) {
            return false;
        }
        index -= 1;
    }
    return true;
}

function checkdownleft(index, pid) {
    if ((index / 7 >= 4) || (index % 7 < 3)) {
        return false;
    }
    for (let i = 0; i <= 3; i++) {
        if (!squares[index].classList.contains(pid)) {
            return false;
        }
        index += 6;
    }
    return true;
}

function checkupright(index, pid) {
    for (let i = 0; i <= 3; i++) {
        if (index < 0 || !squares[index].classList.contains(pid)) {
            break;
        }
        index -= 6;
    }
    return checkdownleft(index, pid);
}

function checkdownright(index, pid) {
    if ((index / 7 >= 4) || (index % 7 > 3)) {
        return false;
    }
    for (let i = 0; i <= 3; i++) {
        if (!squares[index].classList.contains(pid)) {
            return false;
        }
        console.log(squares[index + 8])
        index += 8;
    }
    return true;
}

function checkupleft(index, pid) {
    let x = index;
    for (let i = 0; i <= 3; i++) {
        if (index < 0 || !squares[index].classList.contains(pid)) {
            break;
        }
        index -= 8;
    }
    return checkdownright(index, pid);
}
