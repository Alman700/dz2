// // tab slider
// const tabContentBlocks = document.querySelectorAll('.tab_content_block');
//
// const tabs = document.querySelectorAll('.tab_content_item');
//
// const hideTabContet = () => {
//     tabContentBlocks.forEach( (item) => {
//         item.style.display = 'none';
//     })
//     tabs.forEach( tab => {
//         tab.classList.remove('tab_content_item_active');
//     })
// }
//
// const showTabContet = (index) => {
//     tabContentBlocks[index].style.display = 'block'
//     tabs[index].classList.add('tab_content_item_active');
// }
//
// hideTabContet()
// showTabContet(0)
//
// document.querySelector('.tab_content_items').addEventListener('click', (e) => {
//     if (event.target.classList.contains('tab_content_item')) {
//         tabs.forEach((tab, i) => {
//             if (e.target === tab) {
//                 hideTabContet();
//                 showTabContet(i);
//             }
//         });
//     }
// });
// tab slider
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
let currentTab = 0;

const hideTabContet = () => {
    tabContentBlocks.forEach(item => item.style.display = 'none');
    tabs.forEach(tab => tab.classList.remove('tab_content_item_active'));
}

const showTabContet = (index) => {
    tabContentBlocks[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active');
}

hideTabContet();
showTabContet(currentTab);

// _________________________________________________Автоматический слайдер
setInterval(() => {
    currentTab = (currentTab + 1) % tabs.length;
    hideTabContet();
    showTabContet(currentTab);
}, 3000);

// __________________________________________________Делегирование кликов
document.querySelector('.tab_content_items').addEventListener('click', (e) => {
    if (e.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, i) => {
            if (e.target === tab) {
                currentTab = i; // обновляем текущий индекс
                hideTabContet();
                showTabContet(i);
            }
        });
    }
});

// __________________________________________конвертор валют
// const somInput = document.querySelector('#som');
// const usdInput = document.querySelector('#usd');
// const eurInput = document.querySelector('#eur');
//
// // Получаем все input в одном NodeList
// const inputs = document.querySelectorAll('input');
//
// // Объект, где будут храниться курсы валют из JSON
// let rates = {};
//
// // Загружаем JSON-файл с курсами валют
// const getData = () => {
//     const request = new XMLHttpRequest(); // создаём запрос
//     request.open('GET', '../data/converter.json'); // указываем путь к JSON
//     request.setRequestHeader('Content-Type', 'application/json'); // корректный заголовок
//     request.send(); // отправляем запрос
//
//     // Срабатывает при получении ответа
//     request.onload = () => {
//         rates = JSON.parse(request.response); // сохраняем данные в переменную rates
//         addEventListeners(); // добавляем обработчики после загрузки
//     };
// };
//
// // Универсальная функция конвертации между валютами
// function convertCurrency(value, from, to) {
//     let som;
//
//     // Сначала переводим введённую сумму в сомы
//     if (from === 'som') {
//         som = parseFloat(value); // если уже сом — просто сохраняем
//     } else {
//         som = parseFloat(value) * rates[from]; // иначе умножаем на курс (перевод в сомы)
//     }
//
//     // Теперь переводим сомы в нужную валюту
//     if (to === 'som') {
//         return som.toFixed(2);
//     } else {
//         return (som / rates[to]).toFixed(2); // делим на курс, получаем нужную валюту
//     }
// }
//
// // Основная функция обработки ввода
// function handleInput(event) {
//     const id = event.target.id;      // определяем, в каком поле был ввод
//     const value = event.target.value; // получаем введённое значение
//
//     // Если пустое — очищаем другие поля
//     if (value === '') {
//         inputs.forEach(input => {
//             if (input.id !== id) input.value = '';
//         });
//         return;
//     }
//
//     //  пересчитываем остальные
//     if (id === 'som') {
//         usdInput.value = convertCurrency(value, 'som', 'usd');
//         eurInput.value = convertCurrency(value, 'som', 'eur');
//     } else if (id === 'usd') {
//         somInput.value = convertCurrency(value, 'usd', 'som');
//         eurInput.value = convertCurrency(somInput.value, 'som', 'eur');
//     } else if (id === 'eur') {
//         somInput.value = convertCurrency(value, 'eur', 'som');
//         usdInput.value = convertCurrency(somInput.value, 'som', 'usd');
//     }
// }
//
// // Добавляем обработчики событий на каждый input
// function addEventListeners() {
//     inputs.forEach(input => {
//         input.addEventListener('input', handleInput); // при вводе запускаем обработку
//     });
// }
//
// getData();
const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');
const inputs = document.querySelectorAll('input');

const rateUsd = document.querySelector('#rate-usd');
const rateEur = document.querySelector('#rate-eur');
const refreshBtn = document.querySelector('#refresh-btn');
const updateTime = document.querySelector('#update-time');

let rates = {};
let autoUpdateTimeout;

function getData() {
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
            const kgs = data.rates.KGS;
            const eur = data.rates.EUR;

            rates = {
                usd: 1,
                eur: eur,
                som: kgs
            };

            rateUsd.textContent = `1 USD = ${kgs.toFixed(2)} KGS`;
            rateEur.textContent = `1 EUR = ${(kgs / eur).toFixed(2)} KGS`;

            // Обновляем время последнего обновления
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            updateTime.textContent = `Последнее обновление: ${timeString}`;

            addEventListeners();

            // Сбрасываем таймер автообновления
            if (autoUpdateTimeout) clearTimeout(autoUpdateTimeout);
            autoUpdateTimeout = setTimeout(getData, 18000000); // 5 часов
        })
        .catch(() => alert('Ошибка при загрузке курсов'));
}

function convertCurrency(value, from, to) {
    let usd;

    if (from === 'usd') {
        usd = parseFloat(value);
    } else if (from === 'eur') {
        usd = parseFloat(value) / rates.eur;
    } else if (from === 'som') {
        usd = parseFloat(value) / rates.som;
    }

    if (to === 'usd') return usd.toFixed(2);
    if (to === 'eur') return (usd * rates.eur).toFixed(2);
    if (to === 'som') return (usd * rates.som).toFixed(2);
}

function handleInput(event) {
    const id = event.target.id;
    const value = event.target.value;

    if (value === '') {
        inputs.forEach(input => {
            if (input.id !== id) input.value = '';
        });
        return;
    }

    if (id === 'som') {
        usdInput.value = convertCurrency(value, 'som', 'usd');
        eurInput.value = convertCurrency(value, 'som', 'eur');
    } else if (id === 'usd') {
        somInput.value = convertCurrency(value, 'usd', 'som');
        eurInput.value = convertCurrency(value, 'usd', 'eur');
    } else if (id === 'eur') {
        somInput.value = convertCurrency(value, 'eur', 'som');
        usdInput.value = convertCurrency(value, 'eur', 'usd');
    }
}

function addEventListeners() {
    inputs.forEach(input => {
        input.addEventListener('input', handleInput);
    });
}
const sourceBtn = document.querySelector('#source-btn');

sourceBtn.addEventListener('click', () => {
    window.open('https://www.exchangerate-api.com/', '_blank');
});

// Обработчик кнопки обновления курса
refreshBtn.addEventListener('click', () => {
    getData();
});

getData();


// CARD SWITCHER первое задание
const cardBlock = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
let cardId = 1;
const maxId = 200;

function loadCard(id) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => res.json())
        .then(({ id, title, completed }) => {
            cardBlock.innerHTML = `
                <p>${title}</p>
                <p style="color: ${completed ? 'green' : 'red'}">${completed}</p>
                <span>${id}</span>
            `;
        })
        .catch(() => {
            cardBlock.innerHTML = `<p style="color: red;">Ошибка загрузки карточки</p>`;
        });
}

// Обработчики событий
btnNext.onclick = () => {
    cardId = cardId >= maxId ? 1 : cardId + 1;
    loadCard(cardId);
};

btnPrev.onclick = () => {
    cardId = cardId <= 1 ? maxId : cardId - 1;
    loadCard(cardId);
};

// Загрузка первой карточки при запуске
loadCard(cardId);

// ___________________________второе задание fetch-запрос для /posts
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => {
        console.log('Список постов:', posts);
    })
    .catch(error => {
        console.error('Ошибка при загрузке постов:', error);
    });

