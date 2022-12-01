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

    const getResources = async (url) => {
        let request = await fetch(url);

        if(!request.ok){
            throw new Error(`Could not fetch ${url}, status: ${request.status}`);
        }

           return await request.json();
    };


    // getResources('http://localhost:3000/menu')
    //       .then(data => createCard(data));


    // function createCard(data){
    //     data.forEach(({img, altimg, price, title, descr}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');
    //         price *= 27;
    //         element.innerHTML = `
    //         <img src="${img}" alt="${altimg}">
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }
    
          
    // getResources('http://localhost:3000/menu')
    //       .then(data => {
    //         data.forEach(({img, altimg, price, title, descr}) => {
    //             new MenuCard(img, altimg, price, title, descr, '.menu .container').render();
    //         });
    //       });


    axios.get('http://localhost:3000/menu')
             .then(data => {
                data.data.forEach(({img, altimg, price, title, descr}) => {
                    new MenuCard(img, altimg, price, title, descr, '.menu .container').render();
                });
             });

    // Forms

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


    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(response => console.log(response));



    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;



    let slideIndex = 1;
    let offset = 0;

    function calcInReg(width){
        return width.replace(/\D/g, '');
    }
    
    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }else{
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
          
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if(i == 0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }


    function checkQuan(){
        if(slides.length < 10){
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        }else{
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
    }

    function dotConfig(){
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    }
    


    next.addEventListener('click', () => {
        if(offset == (+calcInReg(width) * (slides.length - 1))){
            offset = 0;
        }else{
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translate(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        }else{
            slideIndex++;
        }

        checkQuan();
        dotConfig();

    });

    prev.addEventListener('click', () => {
        if(offset == 0){
            offset = +calcInReg(width) * (slides.length - 1);
        }else{
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        }else{
            slideIndex--;
        }

        checkQuan();
        dotConfig();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = +calcInReg(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            checkQuan();
            dotConfig();
        });
    });







    // if(slides.length < 10){
    //     total.textContent = `0${slides.length}`;
    // }else{
    //     total.textContent = slides.length;
    // }
    // showSlides(slideIndex);

    // function showSlides(n){
    //     if(n > slides.length){
    //         slideIndex = 1;
    //     }

    //     if(n < 1){
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     if(slides.length < 10){
    //         current.textContent = `0${slideIndex}`;
    //     }else{
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n){
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });



    // Calculator

    const result = document.querySelector('.calculating__result span');
    let sex = 'female', height, weight, age, ratio = 1.375;
    
    function calcFunc(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = '_____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {    
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }   
    }

    calcFunc();

    function getStaticInformation(parentSelector, activeClass){
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');   
                } else {
                    sex = e.target.getAttribute('id');
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
                calcFunc();
            });
        });

    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function dynamicInputCheck(selector){
        let input = document.querySelector(selector);
        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcFunc();
        });
    }
    dynamicInputCheck('#height');
    dynamicInputCheck('#weight');
    dynamicInputCheck('#age');
});