import tabs from './modules/tab.js';
import timer from './modules/timeMenu.js';
import modal from './modules/modal.js';
import card from './modules/card.js'; 
import slider from './modules/slider.js';
import form from './modules/form.js';
import calculate from './modules/calculator.js';
import { openModalWindow } from './modules/modal.js';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimer = setTimeout(() => openModalWindow(".modal", modalTimer), 5000);

    tabs();
    timer();
    modal('[data-modal]','.modal',modalTimer);
    form('form' ,modalTimer);
    card();
    slider();
    calculate();

    
});