function slider_init(delay){ // старт слайдера. Принимает интервал смены слайдов в мс (не обязательно)
    $('#slides img:first').show(); // показываем активный слайд
    // старт кнопок
    
    if(typeof delay !== 'undefined'){ // есть delay задан
        setInterval(function(){ // раз в delay мс...
            slider_change(1); // ...меняем слайдер
        }, delay);
    }
}

function slider_change(num){ // смена слайда
    // получаем индекс активного слайдера
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







