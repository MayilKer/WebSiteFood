function pop(){
    
    const openModal = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');




    function openModalWindow(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }

    function closeModalWindow(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

          openModal.forEach(elem => {
            elem.addEventListener('click', openModalWindow);
        });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.style.display === 'block'){
            closeModalWindow();
        }
    });

    const modalTimer = setTimeout(openModalWindow, 5000);

    function modalWhileScroll(){
        if(window.scrollY + window.innerHeight >= document.body.scrollHeight){
            openModalWindow();
            window.removeEventListener('scroll', modalWhileScroll);
        }
    }

    window.addEventListener('scroll', modalWhileScroll);
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(elem => {
        postData(elem);
    });

    const postDataFunc = async (url, data) => {
        let request = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
           });

           return await request.json();
    };

    function postData(form){
        form.addEventListener('submit', (e) => {
           e.preventDefault(); 

           const statusMessage = document.createElement('img');
           statusMessage.src = message.loading;
           statusMessage.style.cssText = `
           display: block;
           margin: 0 auto;
           `;
           statusMessage.textContent = message.loading;
           form.insertAdjacentElement('afterend', statusMessage);
           
                   
           const formData = new FormData(form); 

           const json = JSON.stringify(Object.fromEntries(formData.entries()));

           postDataFunc('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });


        });
    }


    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModalWindow();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>x</div>
            <div class="modal__titler">${message}</div>
        </div>
        `;


        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove(); 
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closeModalWindow();
        },4000);
    }
}

module.exports = pop;