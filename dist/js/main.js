


function sliders() {

    let initM = false;
    let menu = $(".menu_js");
    let menuSettings = {
        margin: 47,
        autoWidth: true,
    }
    if (window.innerWidth <= 480) {
        menu.owlCarousel(menuSettings);
        initM = true;
    }
    sliderShowHide(480, 0, menu, menuSettings, initM);


    let initCar = false;
    let mainCarousel = $('.carousel-main_js');
    let mainCarouselSettings = {
        margin: 29,
        autoWidth: true,
    }


    if (window.innerWidth <= 900 && window.innerWidth > 375) {
        mainCarousel.owlCarousel(mainCarouselSettings);
        initCar = true;
    }


    sliderShowHide(900, 375, mainCarousel, mainCarouselSettings, initCar);
}
/*удаляем или добавляем слайдер в зависимости от разрешения*/
function sliderShowHide(sizeMax, sizeMin, slider, settings, init) {

    window.addEventListener('resize', () => {
        let w = window.innerWidth;
        if ((w <= sizeMax && w > sizeMin && init == true) || (w > sizeMax && w >= sizeMin && init == false)) {
            return;
        }

        else {
            if (w <= sizeMax && w > sizeMin) {
                slider.owlCarousel(settings);
                init = true;
            }

            else {
                slider.trigger('destroy.owl.carousel');
                init = false;
            }

        }
    });

}


/*popup-menu-cart hide/show*/

function cartMenuHideShow(el, close, open) {
    let body = document.querySelector('body');
    let item = document.querySelector(el);
    body.addEventListener('click', (e) => {

        if (e.target.closest(open)) {
            item.classList.add('active');
            scrollHide('hide')
        }

        else if (e.target.closest(close) || (!e.target.closest(el) && item.classList.contains('active'))) {
            item.classList.remove('active');
            scrollHide('show');
        }

    });
}
/*hide page scroll*/
function scrollHide(inf) {
    var html = document.getElementsByTagName('html')[0];
    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (inf == 'hide') {
        html.classList.add('noscroll');
        html.style.paddingRight = scrollbarWidth + "px";
    }
    else if (inf == 'show') {
        html.classList.remove('noscroll');
        html.style.paddingRight = 0;
    }
    else {
        html.classList.remove('noscroll');
        html.style.paddingRight = 0;
    }
}

function showQuastions() {
    let body = document.querySelector('body');
    let items = document.querySelectorAll('.questions__item');
    let form = document.querySelector('.questions__form-fields');

    body.addEventListener('click', (e) => {
        if (e.target.closest('.questions__item-header')) {
            question = e.target.closest('.questions__item');
            items.forEach(item => {
                if (item == question) {
                    item.classList.toggle('active');
                }
                else item.classList.remove('active');

            });
        }


    });

}
function createMap() {

    var mymap = L.map('map').setView([59.88459106422066, 30.326728499999998], 14);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        center: [59.88459106422066, 30.326728499999998],
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoib3Bhc255aSIsImEiOiJja25xMzFiNXcwOHd4MnBwZnd5bGcyZzcyIn0.AiEs2-wubAmpJzeGQvqIaQ',

    }).addTo(mymap);
    L.marker([59.88459106422066, 30.326728499999998]).addTo(mymap);


}
document.addEventListener('DOMContentLoaded', () => {
    sliders();
    cartMenuHideShow('.popup-menu', '.popup-menu__close', '.header__popup-menu-open');
    cartMenuHideShow('.cart', '.cart__close', '.header__cart');
    showQuastions();
    createMap();
});


