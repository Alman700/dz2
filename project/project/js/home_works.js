// 1,Проверка валидности в gmail блоке
const input = document.getElementById('gmail_input');
const button = document.getElementById('gmail_button');
const result = document.getElementById('gmail_result');

// Регулярное выражение для проверки только Gmail-адресов
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

button.addEventListener('click', () => {
    const email = input.value.trim();

    if (gmailRegex.test(email)) {
        result.textContent = 'Valid Gmail';
        result.style.color = 'green';
    } else {
        result.textContent = 'Invalid Gmail';
        result.style.color = 'red';
    }
});

    const child = document.querySelector('.child_block');
    const parent = document.querySelector('.parent_block');

    let x = 0;
    let y = 0;
    const step = 1;
    const parentWidth = parent.clientWidth;
    const parentHeight = parent.clientHeight;
    const childWidth = child.clientWidth;
    const childHeight = child.clientHeight;

    let direction = 'right';

    function moveSquare() {
    child.style.left = `${x}px`;
    child.style.top = `${y}px`;

    if (direction === 'right') {
    if (x + childWidth < parentWidth) {
    x += step;
} else {
    direction = 'down';
}
}

    if (direction === 'down') {
    if (y + childHeight < parentHeight) {
    y += step;
} else {
    direction = 'left';
}
}

    if (direction === 'left') {
    if (x > 0) {
    x -= step;
} else {
    direction = 'up';
}
}

    if (direction === 'up') {
    if (y > 0) {
    y -= step;
} else {

    direction = 'right';

}
}

    requestAnimationFrame(moveSquare);
}

    moveSquare();

// _________________________________секундамер дз2

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const secondsDisplay = document.getElementById('seconds');

    let isRunning = false; // состояние секундомера
    let time = 0; // начальное время
    let timerInterval; // переменная для хранения интервала

    //________________________- Функция для старта секундомера
    function startTimer() {
    isRunning = true;
    startButton.textContent = 'Pause'; // сменить текст кнопки на "Pause"

    timerInterval = setInterval(() => {
    time++;
    secondsDisplay.textContent = time; // обновить отображаемое время
}, 1000);
}

    // Функция для остановки секундомера
    function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval); // остановить интервал
    startButton.textContent = 'Resume'; // сменить текст кнопки на "Resume"
}

    // Функция для сброса секундомера
    function resetTimer() {
    time = 0;
    secondsDisplay.textContent = time; // обновить отображаемое время
    if (isRunning) {
    clearInterval(timerInterval); // остановить интервал, если он работает
}
    isRunning = false;
    startButton.textContent = 'Start'; // вернуть текст кнопки к исходному состоянию
}

    // Обработчики событий для кнопок
    startButton.addEventListener('click', () => {
    if (isRunning) {
    stopTimer(); // если уже работает, остановить
} else {
    startTimer(); // если не работает, start
}
});

    stopButton.addEventListener('click', () => {
    stopTimer(); // остановить
});

    resetButton.addEventListener('click', () => {
    resetTimer(); // сбросить
});


