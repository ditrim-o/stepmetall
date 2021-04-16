


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

document.addEventListener('DOMContentLoaded', () => {
    sliders();
});


