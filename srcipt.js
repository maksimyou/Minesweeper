let fieldStorage2 = JSON.parse(localStorage.getItem('filed'));
let boardStorage2 = JSON.parse(localStorage.getItem('board'));
let arrayRess = null;
let bommbb;
let flaggs;
let themeStorage = true;
if (JSON.parse(localStorage.getItem('result'))) {
    arrayRess = JSON.parse(localStorage.getItem('result'));
} else {
    localStorage.setItem('result', JSON.stringify([]));
    arrayRess = JSON.parse(localStorage.getItem('result'));
}


const modeGames = {
    first: () => startMinesweeper(10, 10, bommbb, flaggs, fieldStorage2, boardStorage2),  //10
    second: () => startMinesweeper(15, 15, bommbb, flaggs, fieldStorage2, boardStorage2), //20
    third: () => startMinesweeper(25, 25, bommbb, flaggs, fieldStorage2, boardStorage2),  //40
}

let diffClick;
let block = false;

if (!JSON.parse(localStorage.getItem('start')) || JSON.parse(localStorage.getItem('start')) === 1) {
    diffClick = '1';
    modeGames.first();
} else if (JSON.parse(localStorage.getItem('start')) === 2) {
    diffClick = '2';
    modeGames.second();
} else if (JSON.parse(localStorage.getItem('start')) === 3) {
    diffClick = '3';
    modeGames.third();
}
let soundOnOff = true;





function startMinesweeper(width, hight, bombs = 10, flags = 10, fieldStorage, boardStorage) {
    let field = document.createElement('div');
    let square = document.createElement('div');
    let resultTimer = document.createElement('div');
    let timer = document.createElement('div');
    let smile = document.createElement('div');
    let span = document.createElement('span');
    let span2 = document.createElement('span');
    let image = document.createElement('img');
    let click = document.createElement('div');
    let clickText = document.createElement('div');
    let popup = document.createElement('div');
    let popupText = document.createElement('div');
    let wrapMinsweep = document.createElement('div');
    let menuDificult = document.createElement('div');
    let nav1 = document.createElement('span');
    let nav2 = document.createElement('span');
    let nav3 = document.createElement('span');
    let soundActive = document.createElement('input');
    let theme = document.createElement('div');
    let result = document.createElement('div');
    let resultList = document.createElement('div');
    let resultPopup = document.createElement('div');
    let ListOl = document.createElement('ol');
    let titleRes = document.createElement('div');
    let counMines = document.createElement('input');
    let wrapCounMines = document.createElement('div');
    soundActive.type = 'checkbox';
    let elems = Array.from({ length: width * hight });
    if (document.querySelector('#app').children.length > 1) {
        Array.from(document.querySelector('#app').children).forEach(el => {
            el.remove();
        })
    };
    if (!themeStorage) {
        themeSwitch();
    }
    function themeSwitch() {
        themeStorage = false;
        document.querySelector('#app').style.backgroundImage = 'url(./mines2.jpg)';
        wrapMinsweep.style.border = '10px solid rgb(20 17 17 / 81%)';
        timer.style.boxShadow = 'inset 0px 0px 3px 1px rgb(4, 4, 4)';
        smile.style.background = 'rgba(156, 150, 175, 0.672)';
        smile.style.boxShadow = 'inset 0px 0px 2px 1px rgb(4, 4, 4)';
        resultTimer.style.background = '#121010c7';
        resultTimer.style.borderTop = '5px solid rgb(96 90 90)';
        resultTimer.style.borderLeft = '5px solid rgb(96 90 90)';
        resultTimer.style.borderBottom = '5px solid rgb(120 113 113)';
        resultTimer.style.borderRight = '5px solid rgb(120 113 113)';
        click.style.background = '#121010c7';
        click.style.borderTop = '5px solid rgb(96 90 90)';
        click.style.borderLeft = '5px solid rgb(96 90 90)';
        click.style.borderBottom = '5px solid rgb(120 113 113)';
        click.style.borderRight = '5px solid rgb(120 113 113)';
        clickText.style.color = 'rgb(255, 255, 255)';
        nav1.style.color = 'rgb(235, 236, 240)';
        nav2.style.color = 'rgb(235, 236, 240)';
        nav3.style.color = 'rgb(235, 236, 240)';
    }
    function themeSwitch2() {
        themeStorage = true;
        document.querySelector('#app').style.backgroundImage = '';
        wrapMinsweep.style.border = '';
        timer.style.boxShadow = '';
        smile.style.background = '';
        smile.style.boxShadow = '';
        resultTimer.style.background = '';
        resultTimer.style.borderTop = '';
        resultTimer.style.borderLeft = '';
        resultTimer.style.borderBottom = '';
        resultTimer.style.borderRight = '';
        click.style.background = '';
        click.style.borderTop = '';
        click.style.borderLeft = '';
        click.style.borderBottom = '';
        click.style.borderRight = '';
        clickText.style.color = '';
        nav1.style.color = '';
        nav2.style.color = '';
        nav3.style.color = '';
    }
    function switchDiff() {
        localStorage.removeItem('board');
        localStorage.removeItem('filed');
        localStorage.removeItem('timer');
        localStorage.removeItem('click');
        boardStorage2 = null;
        fieldStorage2 = null;

        switch (diffClick) {
            case '1': modeGames.first();
                break;
            case '2': modeGames.second();
                break;
            case '3': modeGames.third();
                break;
        }
        block = false;
        switchBoard = true;
    }


    function sound() {
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine'; oscillator.frequency.value = 261.63;
        oscillator.connect(audioContext.destination);
        oscillator.start(); setTimeout(function () { oscillator.stop(); }, 100);
    }
    function soundLoss() {
        const audioContext = new Audio();
        audioContext.src = './rington.mp3'
        audioContext.play();
    }
    function soundWin() {
        const audioContext = new Audio();
        audioContext.src = './tadam.mp3'
        audioContext.play();
    }


    nav1.addEventListener('click', () => {
        localStorage.removeItem('filed');
        localStorage.removeItem('board');
        localStorage.removeItem('timer');
        localStorage.removeItem('click');
        boardStorage2 = null;
        fieldStorage2 = null;
        modeGames.first();
        diffClick = '1';
        JSON.stringify(localStorage.setItem('start', '1'));

    });
    nav2.addEventListener('click', () => {
        localStorage.removeItem('filed');
        localStorage.removeItem('board');
        localStorage.removeItem('timer');
        localStorage.removeItem('click');
        boardStorage2 = null;
        fieldStorage2 = null;
        modeGames.second();
        diffClick = '2';
        JSON.stringify(localStorage.setItem('start', '2'));
    });
    nav3.addEventListener('click', () => {
        localStorage.removeItem('filed');
        localStorage.removeItem('board');
        localStorage.removeItem('timer');
        localStorage.removeItem('click');
        boardStorage2 = null;
        fieldStorage2 = null;
        modeGames.third();
        diffClick = '3';
        JSON.stringify(localStorage.setItem('start', '3'));
    })

    let finish = null;
    let timerSwitch = false;
    let timerId = null;
    let clickCount;
    if (!JSON.parse(localStorage.getItem('click'))) {
        clickCount = 0;
    } else {
        clickCount = JSON.parse(localStorage.getItem('click'));
    }
    let board;
    let switchBoard = true;
    function generateBoard(cellNotBombs) {

        // Определяем размер игрового поля (количество строк и столбцов)
        const rows = width;
        const cols = hight;

        // Определяем количество мин на поле
        const mines = bombs;

        // Создаем двумерный массив для хранения информации о каждой клетке поля
        const board = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({
                id: 0,
                mine: false,
                count: 0,
                revealed: false,
                flagged: false,
            }))
        );
        board.flat().map((el, idd) => {
            let copy = el;
            copy.id = idd;
            return copy;
        });
        // Цикл для расположения мин на поле
        let placedMines = 0;
        while (placedMines < mines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (!board[row][col].mine && cellNotBombs !== board[row][col].id) {
                board[row][col].mine = true;
                placedMines++;
            }
        }

        // Цикл для определения количества мин вокруг каждой клетки поля
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell.mine) {
                    // Клетка содержит мину, не нужно проверять ее соседей
                    return;
                }
                let count = 0;
                // Проверяем каждую соседнюю клетку на наличие мины
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (
                            rowIndex + i >= 0 &&
                            rowIndex + i < rows &&
                            colIndex + j >= 0 &&
                            colIndex + j < cols &&
                            board[rowIndex + i][colIndex + j].mine
                        ) {
                            count++;
                        }
                    }
                }
                cell.count = count;
            });
        });

        return board;

    }
    //Чтобы находить и открывать все пустые ячейки и их соседей рекурсивно, можно добавить несколько функций.

    //Сначала нужно определить функцию для открытия ячеек поля. Она вызывает проверяющую функцию для каждой соседней ячейки и открывает текущую ячейку, если они обе пустые.

    function revealCell(board, row, col) {
        if (row < 0 || col < 0 || row >= board.length || col >= board[row].length) {
            return;
        }
        const cell = board[row][col];
        if (cell.revealed) {
            return;
        }
        field.children[board[row][col].id].classList.add('active');
        if (board[row][col].count == 3) field.children[board[row][col].id].style.color = 'red';
        if (board[row][col].count == 2) field.children[board[row][col].id].style.color = 'green';
        if (board[row][col].count == 1) field.children[board[row][col].id].style.color = 'black';

        if (board[row][col].count) {
            field.children[board[row][col].id].textContent = board[row][col].count;
        };

        cell.revealed = true;
        if (cell.count === 0 && !board[row][col].mine) {
            revealCell(board, row - 1, col);
            revealCell(board, row + 1, col);
            revealCell(board, row, col - 1);
            revealCell(board, row, col + 1);
        }
    }

    //Затем нужно определить функцию, которая будет вызываться при клике на пустую ячейку. Она просто вызывает функцию revealCell для текущей ячейки и ее соседей.

    function revealEmptyCells(id, board, row, col) {
        revealCell(id, board, row, col);
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (!(i === 0 && j === 0) && row + i >= 0 && col + j >= 0 && row + i < board.length && col + j < board[row].length && board[row + i][col + j].count === 0) {
                    revealEmptyCells(board, row + i, col + j);
                }
            }
        }
    }

    //Наконец, нужно вызвать функцию revealEmptyCells вместо обычной функции при клике на пустую ячейку средствами игры.

    // Вызываем revealEmptyCells при клике на пустую ячейку. row и col - это координаты ячейки.
    function handleEmptyCellClick(board, row, col) {
        revealEmptyCells(board, row, col);
    }

    //Теперь, когда игрок кликает на ячейку без мин, будет вызвана функция revealEmptyCells, которая рекурсивно открывает все пустые ячейки и их соседей.


    function startTimer() {
        if (!timerSwitch) {
            timerId = setInterval(() => {
                let num = +span2.textContent + 1;
                span2.textContent = +num;
                JSON.stringify(localStorage.setItem('timer', +num));
            }, 1000)
        }
    }



    resultTimer.style.width = `${width * 25}px`;



    if (!JSON.parse(localStorage.getItem('flags'))) {
        span.textContent = '0' + flags;
    } else {
        flags = JSON.parse(localStorage.getItem('flags'));
        span.textContent = '0' + flags;
    }


    if (!JSON.parse(localStorage.getItem('timer'))) {
        span2.textContent = 0;
    } else {
        span2.textContent = JSON.parse(localStorage.getItem('timer'));
    }
    result.classList.add('result');
    resultList.classList.add('result-list');
    ListOl.classList.add('list-ol');
    titleRes.classList.add('title-res');
    resultPopup.classList.add('result-popup');
    resultPopup.appendChild(resultList);
    resultList.appendChild(titleRes);
    resultList.appendChild(ListOl);
    timer.classList.add('timer-elem');
    smile.classList.add('smile-elem');
    image.classList.add('reaction-elem');
    theme.classList.add('theme');
    nav1.textContent = 'Beginner';
    nav2.textContent = 'Intermediate';
    nav3.textContent = 'Expert';
    menuDificult.appendChild(nav1);
    menuDificult.appendChild(nav2);
    menuDificult.appendChild(nav3);
    menuDificult.classList.add('menu-dificult');
    wrapCounMines.classList.add('wrap-coun-mines');
    counMines.classList.add('coun-mines');
    counMines.type = 'number';
    counMines.value = 10;
    counMines.min = 10;
    counMines.max = 99;
    counMines.addEventListener('input', (e) => {
        bommbb = e.target.value;
        flaggs = e.target.value;
    })

    smile.addEventListener('click', switchDiff)
    clickText.textContent = `Кликнули ${clickCount} раз`;
    document.querySelector('#app').appendChild(result);
    wrapCounMines.appendChild(counMines);
    click.appendChild(wrapCounMines);
    click.appendChild(clickText);
    titleRes.textContent = 'Статистика'
    if (JSON.parse(localStorage.getItem('sound')) || JSON.parse(localStorage.getItem('sound')) === null) {
        soundActive.checked = true;
    } else {
        soundActive.checked = false;
    }

    result.addEventListener('click', () => {
        resultPopup.style.display = 'flex';
        resultPopup.style.visibility = 'visible';
        let elemlist = document.createElement('li');
        ListOl.innerHTML = '';
        arrayRess.forEach(i => {
            let elem = elemlist.cloneNode();
            elem.classList.add('ol-list-item');
            elem.textContent = `${i[0]} кликов за ${i[1]} секунд. ${i[2]}`
            ListOl.appendChild(elem);
        })
    })
    resultPopup.addEventListener('click', () => {
        resultPopup.style.display = 'none';
        resultPopup.style.visibility = 'hidden';
    })
    click.appendChild(soundActive);
    soundActive.addEventListener('change', () => {
        if (soundActive.checked) {
            soundOnOff = true;
            JSON.stringify(localStorage.setItem('sound', true));
        } else {
            soundOnOff = false;
            JSON.stringify(localStorage.setItem('sound', false));
        }

    })
    timer.appendChild(span);
    smile.appendChild(image);
    let timer2 = timer.cloneNode();
    timer2.appendChild(span2);
    resultTimer.appendChild(timer);
    resultTimer.appendChild(smile);
    resultTimer.appendChild(timer2);
    popup.classList.add('popup');
    popupText.classList.add('popup-text');
    clickText.classList.add('click-text')
    resultTimer.classList.add('result-panel');
    soundActive.classList.add('sound-active');
    click.classList.add('click-panel');
    click.style.width = `${width * 25}px`;


    field.classList.add('wrap_minsweep');
    field.style.width = `${width * 25}px`;


    wrapMinsweep.classList.add('wrap_minsweep_field');
    square.classList.add('minsweep_elem');
    popup.appendChild(popupText);
    document.querySelector('#app').appendChild(theme);
    document.querySelector('#app').appendChild(menuDificult);
    document.querySelector('#app').appendChild(wrapMinsweep);
    document.querySelector('#app').appendChild(resultPopup);
    if (fieldStorage === null) {
        elems.map(i => field.appendChild(square.cloneNode()))
    } else {

        field.innerHTML = fieldStorage;

    }
    wrapMinsweep.appendChild(resultTimer);
    wrapMinsweep.appendChild(field);
    wrapMinsweep.appendChild(click);
    document.querySelector('#app').appendChild(popup);
    popup.addEventListener('click', () => {
        popup.style.display = 'none';

    })
    theme.addEventListener('click', () => {
        if (themeStorage) {
            themeSwitch()
        } else {
            themeSwitch2()
        }
    });
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
                localStorage.setItem('filed', JSON.stringify(field.innerHTML));
                localStorage.setItem('flags', JSON.stringify(flags));

                sound()
            }

        })

        el.addEventListener('click', handlerClick => {
            if (soundOnOff) {
                sound();
            }
            if (switchBoard) {
                if (boardStorage === null) {
                    board = generateBoard(id);
                } else {
                    board = boardStorage;
                }
                switchBoard = false;
            }
            if (!el.classList.contains('active')) {
                clickCount++;
                localStorage.setItem('click', JSON.stringify(clickCount));

            }
            clickText.textContent = `Кликнули ${clickCount} раз`;
            finish = 0;
            startTimer();
            timerSwitch = true;
            if (board.flat()[id].mine) {
                el.classList.add('active-3')
                Array.from(field.children).forEach((el2, idx) => {
                    if (board.flat()[idx].mine) {
                        el2.classList.add('active-3')
                        el2.classList.add('active')
                    }
                })
                image.classList.add('loss');
                block = true;
                clearInterval(timerId);
                setTimeout(() => {
                    Array.from(field.children).forEach((elll) => {
                        elll.removeEventListener('click', handlerClick)

                    })
                    if (soundOnOff) {
                        soundLoss();
                    }
                    localStorage.removeItem('filed');
                    localStorage.removeItem('board');
                    localStorage.removeItem('timer');
                    popupText.textContent = "Игра окончена. Попробуйте еще раз"
                    popup.style.display = 'flex';
                    popup.style.visibility = 'visible';
                    if (arrayRess.length >= 10) {
                        arrayRess.shift()
                        arrayRess.push([clickCount, span2.textContent, 'Loss'])

                    } else {
                        arrayRess.push([clickCount, span2.textContent, 'Loss'])
                    }
                    localStorage.setItem('result', JSON.stringify(arrayRess));

                }, 100)
            }

            if (board.flat()[id].count) {
                if (board.flat()[id].count == 3) field.children[id].style.color = 'red';
                if (board.flat()[id].count == 2) field.children[id].style.color = 'green';
                if (board.flat()[id].count == 1) field.children[id].style.color = 'black';
                el.textContent = board.flat()[id].count;
            };
            if (!board.flat()[id].count) {
                handleEmptyCellClick(board, Math.floor(id / width), id % width)
            };
            Array.from(field.children).forEach((el3, id2) => {
                if (el3.classList.contains('active')) finish++;
            })
            el.classList.add('active')
            if (finish === width * hight - bombs - 1) {
                soundWin();
                clearInterval(timerId);
                popupText.textContent = `Ура! Вы нашли все мины за ${span2.textContent} секунд и ${click.textContent.split('').filter(i => !isNaN(i)).join('')} ходов!`
                popup.style.display = 'flex';
                popup.style.visibility = 'visible';
                if (arrayRess.length >= 10) {
                    arrayRess.shift()
                    arrayRess.push([clickCount, span2.textContent, 'Win'])

                } else {
                    arrayRess.push([clickCount, span2.textContent, 'Win'])
                }
                localStorage.setItem('result', JSON.stringify(arrayRess));
            }
            if (el.classList.contains('active-2')) {
                el.classList.remove('active-2');
            }
            localStorage.setItem('board', JSON.stringify(board));
            localStorage.setItem('filed', JSON.stringify(field.innerHTML));
        })

    })

}
