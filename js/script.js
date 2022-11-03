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
        openModal.forEach(elem => {
            elem.addEventListener('click', () => {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    }

    function closeModalWindow(){
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

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

    openModalWindow();

    console.log(document.body.scrollTop);

});