// 1. Проверка валидности в gmail блоке
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

// 2. Анимация движения блока по периметру родителя
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

// 3. Секундомер
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const secondsDisplay = document.getElementById('seconds');

let isRunning = false;
let time = 0;
let timerInterval;

function startTimer() {
    isRunning = true;
    startButton.textContent = 'Pause';

    timerInterval = setInterval(() => {
        time++;
        secondsDisplay.textContent = time;
    }, 1000);
}

function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startButton.textContent = 'Resume';
}

function resetTimer() {
    time = 0;
    secondsDisplay.textContent = time;
    if (isRunning) {
        clearInterval(timerInterval);
    }
    isRunning = false;
    startButton.textContent = 'Start';
}

startButton.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

stopButton.addEventListener('click', () => {
    stopTimer();
});

resetButton.addEventListener('click', () => {
    resetTimer();
});

// 4. Загрузка any.json с использованием async/await
async function loadAnyJson() {
    try {
        const response = await fetch('../data/any.json');
        if (!response.ok) {
            throw new Error('Ошибка загрузки any.json');
        }
        const data = await response.json();
        console.log('Данные из any.json:', data);
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

loadAnyJson();

// 5. Загрузка персонажей из characters.json и отображение карточек
async function loadCharacters() {
    try {
        const response = await fetch('../data/characters.json');
        if (!response.ok) {
            throw new Error('Ошибка загрузки characters.json');
        }
        const characters = await response.json();

        const charactersList = document.querySelector('.characters-list');
        characters.forEach(character => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.innerHTML = `
                <div class="character-photo">
                    <img src="${character.photo}" alt="${character.name}">
                </div>
                <h4>${character.name}</h4>
                <p>${character.description}</p>
            `;
            charactersList.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка загрузки персонажей:', error.message);
    }
}

loadCharacters();
