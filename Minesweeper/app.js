document.addEventListener('DOMContentLoaded', () => {
    const n = 20;
    document.addEventListener('contextmenu', event => event.preventDefault());
    var grid = document.getElementsByClassName('grid')[0];
    for (let i = 0; i < n * n; i++) {
        var d = document.createElement("div");
        d.setAttribute("id", i);
        grid.appendChild(d);
    }
    grid.style.width = 600 + "px";
    grid.style.width = 600 + "px";
    var squares = document.querySelectorAll('.grid div');
    var arr = [];
    var flagged = [];
    var mines = {};
    var nom = 0;
    var count = 0;
    squares.forEach(index => {
        index.style.width = 28 + "px";
        index.style.height = 28 + "px";
        arr.push(0);
        index.addEventListener('click', flip);
        index.addEventListener('contextmenu', flag);
    });
    for (let i = 0; i < n * n / 7; i++) {
        const rn = Math.floor(Math.random() * n * n);
        if (arr[rn] != -1) {
            arr[rn] = -1;
            mines[rn] = true;
        } else {
            i -= 1;
        }
    }
    Object.keys(mines).forEach(index => {
        nom += 1;
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
                Object.keys(mines).forEach(index => {
                    squares[index].classList.add('mine');
                });
                setTimeout(() => {
                    alert("Game over\nYou're infected\n#RIP");
                }, 100);
            }, 200);
        } else if (arr[this.id] != 0) {
            showNum(this.id);
        } else {
            getOthers(this.id);
        }
    }

    function flag() {
        if (this.classList.contains('flag')) {
            this.classList.remove('flag');
            this.addEventListener('click', flip);
        } else {
            this.classList.add('flag');
            this.removeEventListener('click', flip);
            flagged.unshift(this.id);
            if (flagged.length === nom) {
                flagged.forEach(index => {
                    if ((index in mines)) {
                        count += 1;
                    }
                });
                setTimeout(() => {
                    if (count != nom) {
                        alert("Noob\nYou're infected\n#RIP");
                    } else {
                        alert("GG WP");
                    }
                }, 100);
            }
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
        squares[index].classList.add('none');
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
                arr[index] = n * n;
                let i = Math.floor(index / n);
                let j = index % n;
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
