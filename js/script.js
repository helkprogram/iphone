var deadline = getDayEnd();

// Выгрузка cookie
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}


function lastpack(numpack) {
    var minNumPack = 6; // Минимальное количество упаковок
    var lastClass = $('.lastpack'); // Объект
    var numpackCookie = getCookie("lastpack");

    if (numpackCookie == undefined) {
        document.cookie = numpack;
    } else {
        var numpack = numpackCookie;
    }

    if (numpack > minNumPack) {
        numpack--;

        var numObj = new Array();
        if (numpack < 10) {
            numObj[0] = "0";
            numObj[1] = numpack;
        } else {
            var numObj = numpack + "";
        }

        document.cookie = "lastpack=" + numpack;
        lastClass.html("<li>0</li><li>" + numObj[0] + "</li><li>" + numObj[1] + "</li>");
    } else {
        lastClass.html("<li>0</li><li>0</li><li>" + minNumPack + "</li>");
    }

    setTimeout(lastpack, 45000, numpack);
}

$(document).ready(function () {
    // Бургер-меню
    $('.menu__btn').on('click', function (e) {
        e.preventDefault;
        $(this).toggleClass('menu__btn--active');
        $('.menu__list').slideToggle();
    });
    // Подгрузка цен
    $('[name="country"]').on('change', function () {
        var geoKey = $(this).find('option:selected').val();
        var data = $jsonData.prices[geoKey];
        var price = data.price;
        var currency = data.currency

        $('.price_land_s1').text(price);
        $('.price_land_curr').text(currency);
    });

    // Плавный скролл
    $('a[href*=#]').click(function () {
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
        }
        return false;
    });

    // Инициализация таймера
    initializeClock('timer', deadline);

    // Инициализация функции lastpack
    lastpack(20);

    // Смена цвета
    $('.color-block ul>li').click(function () {
        $('body').find('input.dop_params').val($(this).attr('value'));
        $('body').find('.color-block ul').children('li').removeClass('active');
        $('body').find('.info-block3 .content ul>li').children('div').removeClass('active');
        $('body').find('.info-block3 .preview>img').hide();
        $('body').find('.color-block ul>li.' + $(this).attr('class')).addClass('active');
        $('body').find('.info-block3 .content ul>li[value="' + $(this).attr('value') + '"]>div').addClass('active');
        $('body').find('.info-block3 .preview>img[alt="' + $(this).attr('value') + '"]').fadeIn();
        $(this).parent().children('li').removeClass('active');
        $(this).addClass('active');
    });

    $('.info-block3 .content ul>li>div').click(function () {
        $('body').find('input.dop_params').val($(this).attr('value'));
        $('body').find('.info-block3 .content ul>li').children('div').removeClass('active');
        $(this).parents('.right-side').find('.preview>img').hide();
        $('body').find('.color-block ul').children('li').removeClass('active');
        $('body').find('.info-block3 .content ul>li.' + $(this).parent().attr('class') + '>div').addClass('active');
        $('body').find('.info-block3 .preview>img[alt="' + $(this).parent().attr('value') + '"]').fadeIn();
        $('body').find('.color-block ul>li[value="' + $(this).parent().attr('value') + '"]').addClass('active');
        $(this).parent().children('div').removeClass('active');
        $(this).addClass('active');
    });

    // Валидация
    // $('form').not('.popup-m1-form').submit(function(){
    //     var myCheckbox = $(this).find("input[type=checkbox]").prop("checked");
    //     if (!myCheckbox) {
    //     $(this).find(".errField").slideDown().text("Ознакомьтесь с условиями покупки");
    //         return false;
    //     }
    // });

    // Слайдер отзывов
    $('.reviews__slider').slick({
        infinite: true,
        slidesToShow: 3,
        dots: true,
        dotsClass: 'reviews__dots',
        prevArrow: '<button type="button" class="reviews__slick reviews__slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 443.52 443.52" style="enable-background:new 0 0 443.52 443.52;" xml:space="preserve" width="512px" height="512px" class=""><g><g><g><path d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8    c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712    L143.492,221.863z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#6BF"/></g></g></g></svg></button>',
        nextArrow: '<button type="button" class="reviews__slick reviews__slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 443.52 443.52" style="enable-background:transparent;" xml:space="preserve" width="512px" height="512px"><g><g><g><path d="M336.226,209.591l-204.8-204.8c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.712l192.734,192.734    L107.294,414.391c-6.663,6.664-6.663,17.468,0,24.132c6.665,6.663,17.468,6.663,24.132,0l204.8-204.8    C342.889,227.058,342.889,216.255,336.226,209.591z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#6BF"/></g></g></g></svg></button>',
        responsive: [
            {
                breakpoint: 1169,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    });
});