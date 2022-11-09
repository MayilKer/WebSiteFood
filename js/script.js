window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(elem => {
            elem.classList.add('hide');
            elem.classList.remove('show', 'fade');
        });

        tabs.forEach(elem => {
            elem.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0 ){
        tabsContent[i].classList.add('show','fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event) => {
        let target = event.target;
        tabs.forEach((elem, i) => {
            if(elem == target){
                hideTabContent();
                showTabContent(i);
            }
        });
    });


    hideTabContent();
    showTabContent();



    const deadLine = '2023-11-02';

    function getTimeRemaining(endtime){

        let days, seconds, minutes, hours;

        const t = Date.parse(deadLine) - Date.parse(new Date());

        if(t <= 0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }else{
            days = Math.floor( (t/(1000*60*60*24)) );
            seconds = Math.floor( (t/1000) % 60 );
            minutes = Math.floor( (t/1000/60) % 60 );
            hours = Math.floor( (t/(1000*60*60) % 24) );
        }
        
        return{
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function getZeroTime(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
            
        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZeroTime(t.days);
            hours.innerHTML = getZeroTime(t.hours);
            minutes.innerHTML = getZeroTime(t.minutes);
            seconds.innerHTML = getZeroTime(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);    
            }
        }
    }

    setClock('.timer',deadLine);


    // Modal Open-Close

    const openModal = document.querySelectorAll('[data-modal]'),
          closeModal = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');




    function openModalWindow(){
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }

    function closeModalWindow(){
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

          openModal.forEach(elem => {
            elem.addEventListener('click', openModalWindow);
        });



    closeModal.addEventListener('click', closeModalWindow);

    modal.addEventListener('click', (e) => {
        if(e.target === modal){
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

    class MenuCard {
        constructor(src, alt, price, title, descr, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.price = price;
            this.title = title;
            this.descr = descr;
            this.parentSelector = document.querySelector(parentSelector);
            this.transfer= 27;
            this.changeToUAH();
            this.classes = classes;
        }

        changeToUAH() {
            return this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else{
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parentSelector.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        9,
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        ".menu .container",
        "menu__item",
        "big"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        14,
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        21,
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        ".menu .container",
        "menu__item"
    ).render();
});