document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal_close');

    // _________________________________________________________________ Функция открытия и закрытия
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // __________________________________________________________Закрытие по крестику-
    modalClose.addEventListener('click', closeModal);

    // ____________________________________________________________ Закрытие при клике вне модального окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ____________________________________________________________Закрытие по клавише Esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // _________________________________________________________Обработчик скролла
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // ______________________________________________Таймер для открытия модального окна через 10 секунд
    setTimeout(openModal, 10000);
});
// _______________________________________________Добавлены два классы в style.css
// .modal.show {
//     display: block;
// }
//
// .modal.hide {
//     display: none;
// }
