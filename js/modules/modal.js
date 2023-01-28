function openModalWindow(modalSelector, modalTimer){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimer);

    if(modalTimer) {
        clearInterval(modalTimer);
    }
}

function closeModalWindow(modalSelector, modalTimer){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    console.log(modalTimer);
    if(modalTimer) {
        clearInterval(modalTimer);
    }
}
function modal(triggerSelector, modalSelector, modalTimer){
    
    const openModal = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

          openModal.forEach(elem => {
            elem.addEventListener('click', () => openModalWindow(modalSelector, modalTimer));
        });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModalWindow(modalSelector, modalTimer);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.style.display === 'block'){
            closeModalWindow(modalSelector, modalTimer);
        }
    });

    function modalWhileScroll(){
        if(window.scrollY + window.innerHeight >= document.body.scrollHeight){
            openModalWindow(modalSelector, openModalWindow);
            window.removeEventListener('scroll', modalWhileScroll);
        }
    }

    window.addEventListener('scroll', modalWhileScroll);
    
}

export default modal;
export {closeModalWindow};
export {openModalWindow};