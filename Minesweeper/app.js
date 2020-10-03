document.addEventListener('DOMContentLoaded', () => {
    const n = 20;
    document.addEventListener('contextmenu',
        event => event.preventDefault());
    var grid = document.getElementsByClassName('grid')[0];
    for (let i = 0; i < n * n; i++) {
        var d = document.createElement("div");
        d.setAttribute("id", i);
        grid.appendChild(d);
    }
    const squares = document.querySelectorAll('.grid div');
    var arr = [];
    var mines = [];
    squares.forEach(index => {
        arr.push(0);
        index.addEventListener('click', flip);
        index.addEventListener('contextmenu', flag);
    });

    function flag() {
        if (this.classList.contains('flag')) {
            this.classList.remove('flag');
            this.addEventListener('click', flip);
        } else {
            this.classList.add('flag');
            this.removeEventListener('click', flip);
        }
    }
    for (let i = 0; i < n * n / 7; i++) {
        const rn = Math.floor(Math.random() * n * n);
        if (arr[rn] != -1) {
            arr[rn] = -1;
            mines.push(rn);
        } else {
            i -= 1;
        }
    }
    mines.forEach(index => {
        let i = Math.floor(index / n);
        let j = index % n;
        isValid(index, i, j);
    });

    function flip() {
        this.removeEventListener('contextmenu', flag);
        this.removeEventListener('click', flip);
        if (arr[this.id] == -1) {
            squares[this.id].classList.add('mine');
            setTimeout(() => {
                squares.forEach(index => {
                    index.removeEventListener('click', flip);
                });
                alert("Game over\nYou're infected");
            }, 50);
        } else if (arr[this.id] != 0) {
            showNum(this.id);
        } else {
            getOthers(this.id);
            console.log(squares);
        }
    }

    function showNum(index) {
        const temp = arr[index];
        let col;
        if (temp == 1) {
            col = "blue";
        } else if (temp == 2) {
            col = "green";
        } else if (temp == 3) {
            col = "red";
        } else if (temp == 4) {
            col = "orange";
        } else {
            col = "brown";
        }
        document.getElementById(index).style.borderColor = "lightgrey";
        squares[index].setAttribute('class', 'none');
        if (temp != 0 && temp != n * n) {
            squares[index].innerHTML = temp;
            document.getElementById(index).style.color = col;
            document.getElementById(index).style.fontWeight = 1000;
        }
    }

    function getOthers(index) {
        if (!squares[index].classList.contains('flag')) {
            squares[index].removeEventListener('click', flip);
            squares[index].removeEventListener('contextmenu', flag);
            if (arr[index] == 0) {
                let i = Math.floor(index / n);
                let j = index % n;
                arr[index] = n * n;
                if (i + 1 < n) {
                    getOthers((i + 1) * n + j);
                }
                if (i - 1 >= 0) {
                    getOthers((i - 1) * n + j);
                }
                if (j + 1 < n) {
                    getOthers(i * n + (j + 1));
                }
                if (j - 1 >= 0) {
                    getOthers(i * n + (j - 1));
                }
                showNum(index);
            } else if (arr[index] < n * n && arr[index] != -1) {
                showNum(index);
            }
        }
    }

    function isValid(index, i, j) {
        if (i + 1 < n) {
            index = (i + 1) * n + (j);
            arr[index] = arr[index] == -1 ? -1 : arr[index] + 1;
        }
        if (i - 1 >= 0) {
            index = (i - 1) * n + (j);
            arr[index] = arr[index] == -1 ? -1 : arr[index] + 1;
        }
        if (j + 1 < n) {
            index = i * n + (j + 1);
            arr[index] = arr[index] == -1 ? -1 : arr[index] + 1;
        }
        if (j - 1 >= 0) {
            index = i * n + (j - 1);
            arr[index] = arr[index] == -1 ? -1 : arr[index] + 1;
        }
        if (i - 1 >= 0 && j - 1 >= 0) {
            index = (i - 1) * n + (j - 1);
            arr[index] = arr[index] == -1 ? -1 : arr[index] + 1;
        }
        if (i - 1 >= 0 && j + 1 < n) {
            index = (i - 1) * n + (j + 1);
            arr[index] = arr[index] == -1 ? -1 : arr[index] + 1;
        }
        if (i + 1 < n && j - 1 >= 0) {
            index = (i + 1) * n + (j - 1);
            arr[index] = arr[index] == -1 ? -1 : arr[index] + 1;
        }
        if (i + 1 < n && j + 1 < n) {
            index = (i + 1) * n + (j + 1);
            arr[index] = arr[index] == -1 ? -1 : arr[index] + 1;
        }
    }
});