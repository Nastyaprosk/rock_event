function slider_init(delay){ // старт слайдера. Принимает интервал смены слайдов в мс (не обязательно)
    $('#slides img:first').show(); // показываем активный слайд
    slider_buttons_init(); // старт кнопок
    
    if(typeof delay !== 'undefined'){ // есть delay задан
        setInterval(function(){ // раз в delay мс...
            slider_change(1); // ...меняем слайдер
        }, delay);
    }
}

function slider_change(num){ // смена слайда
    // получаем индекс активного слайда
    var active_index = $('#slides img.active').index();
    
    if(num == '1'){ // если надо сдвинуть слайдер вперед
        var new_index = active_index + 1; // прибавляем к новому индеку 1
    }
    else{ // если надо сдвинуть слайдер назад
        var new_index = active_index - 1; // вычитаем 1 из нового индекса
    }
    
    if(Number(new_index) == -1){ // если индекс равен -1 (был первый слайд, а теперь надо показать последний)
        var new_index = $('#slides img').last().index(); // записываем индекс последнего слайда
    }
    
    if(new_index == $('#slides img').length){ // если это был последний слайд и сейчас надо показать
                                                                 // первый
        var new_index = $('#slides img').first().index(); // записываем индекс первого слайда
    }
    
    // скрываем все слайды и ставим статус 0
    $('#slides img').animate({
        opacity:'hide' // уменьшаем прозрачность за 200 мс
    }, 200).removeClass('active')
    
    // показываем текуший слайд и ставим статус 1
    $('#slides img:eq('+new_index+')').animate({
        opacity:'show' // увеличиваем прозрачность за 400 мс
    }, 400).delay(2).addClass('active');
}

function slider_buttons_init(){ // старт кнопок
    $("#slider_controls #slider_left").click(function(){ // по нажатию на кнопку назад
        slider_change('0'); // сдвигаем слайдер назад
    });
    
    $("#slider_controls #slider_right").click(function(){ // при нажатии на кнопку вперед
        slider_change('1'); // сдвинаем слайдер вперед
    });
}

function screen_resize(){
    var h = $(window).height(); // высота окна
    var w = $(window).width(); // высота
    
    $('.screen').height(h); // ставим высоту экранов
    
    // HEADER
    if (h > 737) {
        var lead_h = 737;
        $('#lead_container').css('left', ((w - $('#lead').width()) / 2) + 'px');
    }
    else if (h < 500){
        $('#lead_container').css('left', '35px');
        var lead_h = 500; // ставим высоту #lead = 440
    }
    else{
        var lead_h = h; // натуральная высота 
    }
    
    if (h < 550) {
        $('#header #arrow:visible').slideUp(200);
    }
    else{
        $('#header #arrow:hidden').slideDown(200);
        $('#header #arrow').css('top', (lead_h - $('#header #arrow').height() - 70) + 'px');
    }
    
    $('#header #lead').css('top', ((lead_h - $('#lead').height()) / 2) + 'px');
    $('#header #slides').height(lead_h);
}

$(document).ready(function(){
    slider_init(5000); // инициализируем слайдер
    screen_resize();
    
    $('#header #arrow').click(function(){
        $('html, body').animate({scrollTop: $('#header').height()}, 700);    
    });
});
$(window).resize(function(){
    screen_resize(); 
});
