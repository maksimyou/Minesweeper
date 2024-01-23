const modeGames = {
    first: () => startMinesweeper(10, 10, 10, 10),
    second: () => startMinesweeper(15, 15, 40, 40),
    third: () => startMinesweeper(25, 25, 80, 80),
}
let block = false;
modeGames.first();
function startMinesweeper(width, hight, bombs, flags) {
    let field = document.createElement('div');
    let square = document.createElement('div');
    let resultTimer = document.createElement('div');
    let timer = document.createElement('div');
    let smile = document.createElement('div');
    let span = document.createElement('span');
    let span2 = document.createElement('span');
    let image = document.createElement('img');
    let elems = Array.from({ length: width * hight });
    if (document.querySelector('#app').children.length > 1) {
        Array.from(document.querySelector('#app').children).forEach(el => {
            el.remove();
        })
    };
    let finish = null;
    let timerSwitch = false;
    let timerId = null;
    let clickCount = 0;






    function open(index) {
        //console.log(index)

        let row = Math.floor(index / width)
        let column = index % width;
        //console.log(board[row][column])
        for (let i = -1; i < 1; i++) {
            for (let j = -1; j < 1; j++) {
                console.log()
                if (validElem(row + i, column + j, index)) {
                    console.log([row + i, column + j], board[row + i], board[row + i][column + j].id);
                    if (!board[row + i][column + j].count) {
                        field.children[index].classList.add('active');
                        open(board[row + i][column + j].id);
                    }
                }
                //console.log(board[row + i][column + j]);
            }
        }
    }

    function validElem(row, column, index) {
        if (!field.children[index].classList.contains('active')) {
            return row >= 0
                && row < hight
                && column >= 0
                && column < width;
        }

    }












    function startTimer() {
        if (!timerSwitch) {
            timerId = setInterval(() => {
                let num = +span2.textContent + 1;
                span2.textContent = +num;
            }, 1000)
        }
    }



    resultTimer.style.width = `${width * 25}px`;
    span.textContent = '0' + flags;
    span2.textContent = 0;
    timer.classList.add('timer-elem');
    smile.classList.add('smile-elem');
    image.classList.add('reaction-elem');

    smile.addEventListener('click', () => {
        block = false;
        modeGames.first();
    })
    timer.appendChild(span);
    smile.appendChild(image);
    let timer2 = timer.cloneNode();
    timer2.appendChild(span2);
    resultTimer.appendChild(timer);
    resultTimer.appendChild(smile);
    resultTimer.appendChild(timer2);
    resultTimer.classList.add('result-panel');
    document.querySelector('#app').appendChild(resultTimer);
    field.classList.add('wrap_minsweep');
    field.style.width = `${width * 25}px`;
    square.classList.add('minsweep_elem');
    console.log(square)
    elems.map(i => field.appendChild(square.cloneNode()))
    document.querySelector('#app').appendChild(field);
    Array.from(field.children).forEach((el, id) => {

        el.addEventListener('contextmenu', (e) => {
            if (!el.classList.contains('active')) {
                if (el.classList.contains('active-2')) {
                    flags++;
                } else {
                    if (flags === 0) { flags = 0 } else { flags-- }

                }
                if (flags === 0) {
                    flag = 0
                    span.textContent = '0' + flags;
                } else {
                    span.textContent = '0' + flags;
                    el.classList.toggle('active-2')
                }

            }
        })

        el.addEventListener('click', function handlerClick() {



            clickCount++;
            finish = 0;
            startTimer();
            timerSwitch = true;
            if (board.flat()[id].mine) {
                el.classList.add('active-3')
                Array.from(field.children).forEach((el2, idx) => {
                    if (board.flat()[idx].mine) {
                        el2.classList.add('active-3')
                    }
                })
                image.classList.add('loss');
                block = true;
                console.log(timerId)
                clearInterval(timerId);
                console.log(clickCount + ' Кликов');
                setTimeout(() => {
                    alert("Игра окончена. Попробуйте еще раз")
                }, 100)
            }

            if (board.flat()[id].count) {
                el.textContent = board.flat()[id].count;
            };
            if (!board.flat()[id].count) {
                //ВЫЗЫВАТЬ ЗДЕСЬ ФУНКЦИЮ
            };
            Array.from(field.children).forEach((el3, id2) => {
                if (el3.classList.contains('active')) finish++;
            })
            el.classList.add('active')
            if (finish === width * hight - bombs) {
                clearInterval(timerId);
                alert("Ура! Вы нашли все мины за ## секунд и N ходов!")
            }
            if (el.classList.contains('active-2')) {
                el.classList.remove('active-2');
            }

        })

    })

}



















var addBinary = function (a, b) {
    let res = [];
    let memo = 0;
    let nmbs = [a, b].sort((a, b) => b - a).map(i => { return i.split('').reverse().join('') });
    for (let i = 0; i <= nmbs[0].length; i++) {
        let dj = +nmbs[0][i] + +nmbs[1][i];
        if (dj < 2 && memo) { dj++; memo--; }
        if (dj < 2 && !isNaN(dj)) {
            res.push(dj);
        } else {
            if (isNaN(dj)) {
                if (memo) {
                    if (+nmbs[0][i] + 1 == 2) {
                        res.push(0);
                        memo++;
                    } else {
                        res.push(1);
                        memo--;
                    }
                } else {
                    res.push(nmbs[0][i]);
                }
            } else {
                memo++;
                if (memo) {
                    res.push(0);
                } else {
                    res.push(1);
                    memo--;
                }
            }

        }
    }

    console.log(res);
    return res.reverse().join('');
    //  return (parseInt(a, 2)+parseInt(b, 2)).toString(2);
};