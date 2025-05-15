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
// // const usdInput = document.querySelector('#usd');
// //
// // somInput.oninput = () => {
// //     const request = new XMLHttpRequest();
// //     request.open('GET', '../data/converter.json');
// //     request.setRequestHeader('Content-tape', 'application/json');
// //     request.send();
// //
// //     request.onload = () => {
// //         const data = JSON.parse(request.response)
// //         if (element.id === 'som') {
// //             targetElement.value = (element.value / data.usd).toFixed(2);
// //         }
// //         if (element.id === 'usd') {
// //             targetElement.value = (element.value * data.usd).toFixed(2);
// //         }
// //         if (element.value === '') {
// //             targetElement.value = '';
// //         }
// //
// //     }
// // }
// // converter(somInput, usdInput);
// // converter(usdInput, usdInput);
// Получаем элементы input по ID
const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

// Получаем все input в одном NodeList
const inputs = document.querySelectorAll('input');

// Объект, где будут храниться курсы валют из JSON
let rates = {};

// Загружаем JSON-файл с курсами валют
const getData = () => {
    const request = new XMLHttpRequest(); // создаём запрос
    request.open('GET', '../data/converter.json'); // указываем путь к JSON
    request.setRequestHeader('Content-Type', 'application/json'); // корректный заголовок
    request.send(); // отправляем запрос

    // Срабатывает при получении ответа
    request.onload = () => {
        rates = JSON.parse(request.response); // сохраняем данные в переменную rates
        addEventListeners(); // добавляем обработчики после загрузки
    };
};

// Универсальная функция конвертации между валютами
function convertCurrency(value, from, to) {
    let som;

    // Сначала переводим введённую сумму в сомы
    if (from === 'som') {
        som = parseFloat(value); // если уже сом — просто сохраняем
    } else {
        som = parseFloat(value) * rates[from]; // иначе умножаем на курс (перевод в сомы)
    }

    // Теперь переводим сомы в нужную валюту
    if (to === 'som') {
        return som.toFixed(2);
    } else {
        return (som / rates[to]).toFixed(2); // делим на курс, получаем нужную валюту
    }
}

// Основная функция обработки ввода
function handleInput(event) {
    const id = event.target.id;      // определяем, в каком поле был ввод
    const value = event.target.value; // получаем введённое значение

    // Если пустое — очищаем другие поля
    if (value === '') {
        inputs.forEach(input => {
            if (input.id !== id) input.value = '';
        });
        return;
    }

    //  пересчитываем остальные
    if (id === 'som') {
        usdInput.value = convertCurrency(value, 'som', 'usd');
        eurInput.value = convertCurrency(value, 'som', 'eur');
    } else if (id === 'usd') {
        somInput.value = convertCurrency(value, 'usd', 'som');
        eurInput.value = convertCurrency(somInput.value, 'som', 'eur');
    } else if (id === 'eur') {
        somInput.value = convertCurrency(value, 'eur', 'som');
        usdInput.value = convertCurrency(somInput.value, 'som', 'usd');
    }
}

// Добавляем обработчики событий на каждый input
function addEventListeners() {
    inputs.forEach(input => {
        input.addEventListener('input', handleInput); // при вводе запускаем обработку
    });
}

getData();

