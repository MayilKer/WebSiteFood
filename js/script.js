"use strict";
window.addEventListener('DOMContentLoaded', () => {
    
    const tabs = require('./modules/tab'),
          timer = require('./modules/timeMenu'),
          pop = require('./modules/popup'),
          card = require('./modules/card'),
          slider = require('./modules/slider'),
          calculate = require('./modules/calculator');


    tabs();
    timer();
    pop();
    card();
    slider();
    calculate();

    
});
