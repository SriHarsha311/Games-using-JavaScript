const squares = document.querySelectorAll('.grid div');
const result = document.querySelector('#result');
const displayCurrentPlayer = document.querySelector('#current-player');
let currentPlayer = 1;
const ids = ['player-one', 'player-two']
let len1 = 0,
    len2 = 0;
const len = squares.length;
for (var i = 0; i < len; i++) {
    (function(index) {
        //add an onclick to each square in your grid
        squares[i].onclick = function() {
            squares[index].setAttribute('id', index);
            if (squares[index].classList.contains('taken')) {
                if (currentPlayer === 1) {
                    squares[index].classList.remove('taken')
                    squares[index].classList.add('player-one')
                    len1 += 1;
                    //change the player
                    currentPlayer = 2
                    displayCurrentPlayer.innerHTML = currentPlayer
                } else if (currentPlayer === 2) {
                    squares[index].classList.remove('taken')
                    squares[index].classList.add('player-two')
                    len2 += 1;
                    //change the player
                    currentPlayer = 1
                    displayCurrentPlayer.innerHTML = currentPlayer
                }
                // console.log(squares[index])
                if (index >= 7) {
                    squares[index - 7].classList.add('taken')
                }
                //if the sqaure below your current swqaure is not taken, you can't go there
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
                alert("Congrats " + pid + "!!!\nYou have won")
            }
        }
    })
}

function checkforfour(index, pid) {
    return checkdown(index, pid) ||
        checkdownleft(index, pid) ||
        checkdownright(index, pid) ||
        checkright(index, pid) ||
        checkleft(index, pid) ||
        checkup(index, pid) ||
        checkupright(index, pid) ||
        checkupleft(index, pid);
}

function checkdown(index, pid) {
    if (index / 7 >= 4) {
        return false;
    }
    for (let i = 1; i <= 3; i++) {
        if (!squares[index + (i * 7)].classList.contains(pid)) {
            return false;
        }
    }
    return true;
}

function checkup(index, pid) {
    if (index / 7 < 3) {
        return false;
    }
    for (let i = 1; i <= 3; i++) {
        if (!squares[index - (i * 7)].classList.contains(pid)) {
            return false;
        }
    }
    return true;
}

function checkright(index, pid) {
    if (index % 7 > 3) {
        return false;
    }
    for (let i = 1; i <= 3; i++) {
        if (!squares[index + i].classList.contains(pid)) {
            return false;
        }
    }
    return true;
}

function checkleft(index, pid) {
    if (index % 7 < 3) {
        return false;
    }
    for (let i = 1; i <= 3; i++) {
        if (!squares[index - i].classList.contains(pid)) {
            return false;
        }
    }
    return true;
}

function checkdownleft(index, pid) {
    if ((index / 7 >= 4) || (index % 7 < 3)) {
        return false;
    }
    var j = 1;
    for (let i = 1; i <= 3; i++) {
        if (!squares[index + (i * 7) - j].classList.contains(pid)) {
            return false;
        }
        j -= 1;
    }
    return true;
}

function checkdownright(index, pid) {
    if ((index / 7 >= 4) || (index % 7 > 3)) {
        return false;
    }
    var j = 1;
    for (let i = 1; i <= 3; i++) {
        if (!squares[index + (i * 7) + j].classList.contains(pid)) {
            return false;
        }
        j += 1;
    }
    return true;
}

function checkupleft(index, pid) {
    if ((index / 7 < 3) || (index % 7 < 3)) {
        return false;
    }
    var j = 1;
    for (let i = 1; i <= 3; i++) {
        if (!squares[index - (i * 7) - j].classList.contains(pid)) {
            return false;
        }
        j -= 1;
    }
    return true;
}

function checkupright(index, pid) {
    if ((index / 7 < 3) || (index % 7 > 3)) {
        return false;
    }
    var j = 1;
    for (let i = 1; i <= 3; i++) {
        if (!squares[index - (i * 7) + j].classList.contains(pid)) {
            return false;
        }
        j += 1;
    }
    return true;
}