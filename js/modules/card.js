function cardSet(){
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
    
          
    getResources('http://localhost:3000/menu')
          .then(data => {
            data.forEach(({img, altimg, price, title, descr}) => {
                new MenuCard(img, altimg, price, title, descr, '.menu .container').render();
            });
          });


    // axios.get('http://localhost:3000/menu')
    //          .then(data => {
    //             data.data.forEach(({img, altimg, price, title, descr}) => {
    //                 new MenuCard(img, altimg, price, title, descr, '.menu .container').render();
    //             });
    //          });
}

export default cardSet;