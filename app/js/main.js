


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
    if (document.querySelector('#map')) {
        var mymap = L.map('map').setView([59.88459106422066, 30.326728499999998], 17);

        let layer = L.tileLayer.grayscale('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            center: [59.88459106422066, 30.326728499999998],
            maxZoom: 20,

        });
        mymap.addLayer(layer)

        const customIcon = L.divIcon({
            className: 'contacts__map-icon',
            iconSize: 62
        });
        L.marker([59.88459106422066, 30.326728499999998], { icon: customIcon }).addTo(mymap);
    }
}

/*fixed-sidebar*/
function sidebarFix() {
    let goods = document.querySelector('.fix-scroll-js');
    if (goods) {
        let winHeight = window.innerHeight;
        let bar = goods.querySelector('.fixed-js');
        let barClass = "";

        fix();
        window.addEventListener('scroll', function () {
            fix();
        });

        function fix() {
            if (window.innerWidth > 1024) {

                let top = goods.getBoundingClientRect().top;
                let bottom = goods.getBoundingClientRect().bottom;
                let barTop = bar.getBoundingClientRect().top;
                let barBottom = bar.getBoundingClientRect().bottom;

                if (top >= barTop && top >= 0 && barBottom >= winHeight) {
                    if (barClass != "top") {
                        bar.classList.add('top');
                        bar.classList.remove('bottom');
                        bar.classList.remove('fixed');
                        barClass = "top"
                    }
                    else {
                        return;
                    }

                }
                else if (bottom <= winHeight) {
                    if (barClass != 'bottom') {
                        bar.classList.add('bottom');
                        bar.classList.remove('top');
                        bar.classList.remove('fixed');
                        barClass = "bottom"
                    }
                    else return;

                }
                else if (barBottom <= winHeight || barClass == 'bottom') {
                    if (barClass != 'fixed') {
                        bar.classList.add('fixed');
                        bar.classList.remove('top');
                        bar.classList.remove('bottom');
                        barClass = 'fixed';
                    }
                    else return

                }
                // else {
                //     if (barClass != 'fixed') {
                //         bar.classList.add('fixed');
                //         bar.classList.remove('top');
                //         bar.classList.remove('bottom');
                //         barClass = 'fixed';
                //         console.log('fixed');
                //     }
                //     else return
                // }

            }  //console.log(top, bottom);
        }
    }



}
/* goods form open*/
function formOpen() {
    let btn = document.querySelector('.sidebar__open-fields');
    let fields = document.querySelector('.sidebar__fields');
    if (btn && fields) {
        btn.addEventListener('click', () => {
            fields.classList.add('active');
            sidebarFix();
        });
    }
}
/*goods open*/
function goodsOpen() {
    let goods = document.querySelector('.goods__list');
    if (goods) {
        goods.addEventListener('click', (e) => {
            if (e.target.closest(".goods__item-header")) {
                let item = e.target.closest('.goods__item');
                item.classList.toggle('active');
                sidebarFix();
            }
        });
    }
}


/*animate*/

function animate() {
    let animBlocks = document.querySelectorAll('.animate');
    let animOnce = document.querySelectorAll('.animate_once');

    if (animOnce.length > 0) {
        if (getCookie('visit') == 'yes') {
            animOnce.forEach(item => {
                item.style.transition = "transform 0s, opacity .2s";
                item.style.left = "0px";
                item.style.transform = "translate(0 , 0)";
                item.classList.remove('animate_once');

            });

        }
        else {
            animOnce.forEach(item => {
                item.classList.remove('animate_once');

            });
            setCookies('visit', 'yes');
        }

    }


    if (animBlocks.length > 0) {
        animBlocks.forEach(item => {
            item.classList.remove('animate');

        });

    }
}

/*cookie*/
function setCookies(name, value) {
    document.cookie = `${name}=${value}; path=/`;
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


// document.querySelector('.goods__add-btn').onclick = function () {
//     this.classList.toggle('added');
// }

document.addEventListener('DOMContentLoaded', () => {

    sliders();

    cartMenuHideShow('.popup-menu', '.popup-menu__close', '.header__popup-menu-open');
    cartMenuHideShow('.cart', '.cart__close', '.header__cart');

    showQuastions();
    createMap();
    sidebarFix();
    formOpen();
    goodsOpen();
    //goodAddCart();

    setTimeout(() => { animate(); }, 10);




});

window.onload = function () {
    //animate();
}
