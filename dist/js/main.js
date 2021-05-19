


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

        if (open != "" && e.target.closest(open) && e.target.closest(open).disabled == false) {
            item.classList.add('active');
            scrollHide('hide');

            if (el != '.popup-menu') {
                shadowShow(true);
            }
        }

        else if (e.target.closest(close) || (!e.target.closest(el) && item.classList.contains('active') && !e.target.closest('.cart__delete'))) {
            item.classList.remove('active');
            scrollHide('show');
            if (el != '.popup-menu') {
                shadowShow(false);
            }
        }

    });
}
/*shadow*/
function shadowShow(cond) {
    let shadow = document.querySelector('.shadow');

    if (cond) {
        shadow.classList.add('active');
    }
    else shadow.classList.remove('active');
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

            }
        }
    }



}
/* goods form open*/
function formOpen() {
    let btn = document.querySelector('.sidebar__open-fields');
    let fields = document.querySelector('.sidebar__fields');
    if (btn && fields) {
        btn.addEventListener('click', () => {
            fields.classList.toggle('active');
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
/*question form*/
function questionOpen() {
    let form = document.querySelector('.question__form');
    let close = document.querySelector('.question__close');
    let body = document.querySelector('body');

    body.addEventListener('click', (e) => {
        if (e.target.closest('.menu-l__question-link')) {
            form.classList.add('active');
        }
        else if (e.target.closest('.question__close') || (form.classList.contains('active') && !e.target.closest(".question__form"))) {
            form.classList.remove('active');
        }
    });
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
function footerHide() {
    let pageFull = document.querySelector('.full');
    if (pageFull) {
        let footer = document.querySelector('.footer');
        footer.classList.add('footer_full');
        document.querySelector('body').classList.add('body_full');
    }
}

/*загружаем данные в localstorage*/
function addToLocal() {
    let body = document.querySelector('body');
    let addPopup = document.querySelector('.cart-add');

    body.addEventListener('click', (e) => {

        if (e.target.closest('.goods__add-btn')) {
            let button = e.target.closest('.goods__add-btn');
            let elem = e.target.closest('.goods__sub-item');

            let category = button.getAttribute('data-category');
            let name = button.getAttribute('data-name');
            let id = button.getAttribute('data-id');
            let unit = button.getAttribute('data-unit');
            let count = 1;

            var items = JSON.parse(localStorage.getItem('item'));

            if (!button.classList.contains('added')) {

                if (items == null) {
                    items = {};
                }

                items[id] = {
                    cat: category,
                    name: name,
                    unit: unit,
                    count: count
                }

                localStorage.setItem('item', JSON.stringify(items));
                button.classList.add('added');
                elem.classList.add('active');
                addPopup.classList.add('active');
                setTimeout(() => {
                    addPopup.classList.remove('active');
                }, 2000);
                addToCart();
            }
            else {
                delete items[id];
                button.classList.remove('added');
                elem.classList.remove('active');
                localStorage.setItem('item', JSON.stringify(items));
                addToCart();

            }
        }
    });
}

/*refresh add btn*/
function refreshButtons() {

    let btns = document.querySelectorAll('.goods__add-btn');

    if (btns.length > 0) {
        let loc = JSON.parse(localStorage.getItem('item'));

        if (loc) {
            btns.forEach(item => {
                let id = item.getAttribute('data-id');
                if (loc[id]) {
                    item.classList.add('added');
                    item.parentNode.classList.add('active');
                }
                else {
                    item.classList.remove('added');
                    item.parentNode.classList.remove('active');
                }
            });
        }
        else {
            btns.forEach(item => {
                item.classList.remove('added');
                item.parentNode.classList.remove('active');
            });
        }
    }
}


/*add to cart*/

function addToCart() {
    let cart = JSON.parse(localStorage.getItem('item'));

    if (cart) {
        let giftPromise = document.querySelector('.gift-promise');
        let gift = document.querySelector('.cart_gift');
        let container = document.querySelector('.cart__goods-list');
        let cartBtn = document.querySelector('.header__cart');
        let cartLength = Object.keys(cart).length;
        let cartBlock = document.querySelector('.cart');

        let quantity = 0;
        let el = "";
        for (let key in cart) {
            quantity++;
            let id = key;
            let cat = cart[key].cat;
            let name = cart[key].name;
            let unit = cart[key].unit;
            let count = cart[key].count;

            el += `<li class="cart__goods-item" data-id="${id}"><span class="cart__good-num">${quantity}.</span><span class="cart__good-category">${cat}</span><span class="cart__good-name">${name}</span><div class="cart__quantity"><input data-type="number" disabled class="cart__quantity-input" value="${count}" data-id="${id}"><buttonn class="cart__quantity-more" type="button"></buttonn><buttonn class="cart__quantity-less" type="button"></buttonn><span class="cart__quantity-type">${unit}</span></div><button class="cart__delete" type="button"><span class="close-icon"></span></button></li>`
            if (quantity == 2 && cartLength == 2) {
                el += giftPromise.innerHTML;

            }
            else if (quantity == cartLength && cartLength >= 3) {
                el += `<li class="cart__goods-item"><span class="cart__good-num">${quantity + 1}.</span>${gift.innerHTML}</li>`;

            }

        }
        if (cartLength > 0) {

            cartBtn.disabled = false;
        }
        else {
            cartBtn.disabled = true;
            setTimeout(() => {
                cartBlock.classList.remove('active');
                shadowShow(false);
                scrollHide('show');

            }, 300);

        }

        container.innerHTML = el;

    }
}



/*cart Delete*/

function cartDelIncrease() {
    let cart = document.querySelector('.cart');



    cart.addEventListener('click', e => {

        let items = JSON.parse(localStorage.getItem('item'));

        if (e.target.closest('.cart__delete')) {
            let id = e.target.closest('.cart__goods-item').getAttribute('data-id');

            delete items[id];
            localStorage.setItem('item', JSON.stringify(items));
            addToCart();
            refreshButtons();
        }
        else if (e.target.closest('.cart__quantity-more')) {
            let item = e.target.closest('.cart__goods-item');
            let id = item.getAttribute('data-id');
            let inp = item.querySelector('.cart__quantity-input');
            val = +inp.value;

            inp.value = val + 1;

            items[id].count = +inp.value;
            localStorage.setItem('item', JSON.stringify(items));
        }
        else if (e.target.closest('.cart__quantity-less')) {
            let item = e.target.closest('.cart__goods-item');
            let id = item.getAttribute('data-id');
            let inp = item.querySelector('.cart__quantity-input');
            val = +inp.value;

            if (val > 1) {

                inp.value = val - 1;
                items[id].count = +inp.value;
                localStorage.setItem('item', JSON.stringify(items));
            }

        }
        else if (e.target.closest('.cart__clear')) {
            for (let key in items) {
                delete items[key];
            }
            localStorage.setItem('item', JSON.stringify(items));

            refreshButtons();
            addToCart();
        }
    });
}

function cartWork() {
    addToLocal();
    refreshButtons();
    addToCart();
    cartDelIncrease();
}



document.addEventListener('DOMContentLoaded', () => {

    sliders();

    cartMenuHideShow('.popup-menu', '.popup-menu__close', '.header__popup-menu-open');
    cartMenuHideShow('.cart', '.cart__close', '.header__cart');
    cartMenuHideShow('.callback-form', '.callback-form__close', '.open-popup');
    cartMenuHideShow('.subscribe', '.success__close', '');
    cartMenuHideShow('.success_order', '.success__close', '');
    cartMenuHideShow('.error-message', '.success__close', '');
    questionOpen();
    showQuastions();
    createMap();
    sidebarFix();
    formOpen();
    goodsOpen();
    cartWork();
    footerHide();


    setTimeout(() => { animate(); }, 10);
    inputmask();


});

window.onload = function () {
    //animate();
}









function setCaretPosition(e, t) {
    if (e.setSelectionRange) e.focus(), e.setSelectionRange(t, t);
    else if (e.createTextRange) {
        var i = e.createTextRange();
        i.collapse(!0), i.moveEnd("character", t), i.moveStart("character", t), i.select()
    }
}

function getCursorPosition(e) {
    var t = 0;
    if (document.selection) {
        e.focus();
        var i = document.selection.createRange();
        i.moveStart("character", -e.value.length), t = i.text.length
    } else (e.selectionStart || "0" == e.selectionStart) && (t = e.selectionStart);
    return t
}

function inputmask() {

    $('input[type="tel"]').focus(function () {
        if ($(this).val() == "") {
            $(this).val('+7 (');
        }

        setCaretPosition(this, 4);
    });

    $('input[type="tel"]').focusout(function () {
        $(this).mask("+7 (000) 000-00-00", {
            clearIfNotMatch: true
        });
    });

    $('input[type="tel"]').bind("change keyup input click", function () {

        if (getCursorPosition(this) < 4) {
            setCaretPosition(this, 4);
        }

        var num = $(this).val().replace(/\D+/g, "");

        if (num.indexOf("789") === 0 || num.indexOf("77") === 0 || num.indexOf("89") === 0 || num === "" || num === "7") {

            if (num.indexOf("789") === 0 || num.indexOf("77") === 0) {
                num = num.substr(2 - num.length, num.length - 2);
            }

            if (num.indexOf("89") === 0) {
                num = num.substr(1 - num.length, num.length - 1);
            }

            if (num === "7") {
                num = "";
            }

            num = "+7 (" + num;
            $(this).val(num);
            $(this).mask("+7 (000) 000-00-00", {
                clearIfNotMatch: true
            });
            var b = $(this).val();
            $(this).val(b);
        }


    });

    $('input[type="tel"]').mask("+7 (000) 000-00-00", {
        clearIfNotMatch: true
    });

}