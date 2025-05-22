// Табы и автоматический слайдер
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
let currentTab = 0;

const hideTabContent = () => {
    tabContentBlocks.forEach(item => item.style.display = 'none');
    tabs.forEach(tab => tab.classList.remove('tab_content_item_active'));
}

const showTabContent = (index) => {
    tabContentBlocks[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active');
}

hideTabContent();
showTabContent(currentTab);

setInterval(() => {
    currentTab = (currentTab + 1) % tabs.length;
    hideTabContent();
    showTabContent(currentTab);
}, 3000);

document.querySelector('.tab_content_items').addEventListener('click', (e) => {
    if (e.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, i) => {
            if (e.target === tab) {
                currentTab = i;
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});

// Конвертер валют
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

async function getData() {
    try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();

        const kgs = data.rates.KGS;
        const eur = data.rates.EUR;

        rates = {
            usd: 1,
            eur: eur,
            som: kgs
        };

        rateUsd.textContent = `1 USD = ${kgs.toFixed(2)} KGS`;
        rateEur.textContent = `1 EUR = ${(kgs / eur).toFixed(2)} KGS`;

        const now = new Date();
        updateTime.textContent = `Последнее обновление: ${now.toLocaleTimeString()}`;

        addEventListeners();

        if (autoUpdateTimeout) clearTimeout(autoUpdateTimeout);
        autoUpdateTimeout = setTimeout(getData, 18000000);
    } catch (error) {
        alert('Ошибка при загрузке курсов');
    }
}

function convertCurrency(value, from, to) {
    let usd;

    if (from === 'usd') usd = parseFloat(value);
    else if (from === 'eur') usd = parseFloat(value) / rates.eur;
    else if (from === 'som') usd = parseFloat(value) / rates.som;

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

document.querySelector('#source-btn').addEventListener('click', () => {
    window.open('https://www.exchangerate-api.com/', '_blank');
});

refreshBtn.addEventListener('click', getData);

getData();


// Card Switcher
const cardBlock = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
let cardId = 1;
const maxId = 200;

async function loadCard(id) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const { id: cardId, title, completed } = await res.json();
        cardBlock.innerHTML = `
            <p>${title}</p>
            <p style="color: ${completed ? 'green' : 'red'}">${completed}</p>
            <span>${cardId}</span>
        `;
    } catch {
        cardBlock.innerHTML = `<p style="color: red;">Ошибка загрузки карточки</p>`;
    }
}

btnNext.onclick = () => {
    cardId = cardId >= maxId ? 1 : cardId + 1;
    loadCard(cardId);
};

btnPrev.onclick = () => {
    cardId = cardId <= 1 ? maxId : cardId - 1;
    loadCard(cardId);
};

loadCard(cardId);


// Fetch posts
async function loadPosts() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await res.json();
        console.log('Список постов:', posts);
    } catch (error) {
        console.error('Ошибка при загрузке постов:', error);
    }
}
loadPosts();


// Weather
const searchInput = document.querySelector('.cityName');
const searchButton = document.querySelector('.search');
const cityOutput = document.querySelector('.city');
const tempOutput = document.querySelector('.temp');

const API_KEY = 'e417df62e04d3b1b111abeab19cea714';

searchButton.onclick = async () => {
    const city = searchInput.value.trim();
    if (!city) return;

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await res.json();

        cityOutput.textContent = `Город: ${data.name}`;
        tempOutput.textContent = `Температура: ${data.main.temp}°C`;
    } catch (error) {
        alert('Ошибка загрузки погоды. Проверьте название города.');
    }
};
