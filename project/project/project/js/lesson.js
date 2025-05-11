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
