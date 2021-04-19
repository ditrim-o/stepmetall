


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


document.addEventListener('DOMContentLoaded', () => {
    sliders();

    cartMenuHideShow('.popup-menu', '.popup-menu__close', '.header__popup-menu-open');
    cartMenuHideShow('.cart', '.cart__close', '.header__cart');
});


